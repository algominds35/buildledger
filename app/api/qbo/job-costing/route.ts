import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

async function getAccessToken(realmId: string, userId: string, supabase: any): Promise<{ token: string; baseUrl: string } | null> {
  const { data: conn } = await supabase
    .from('qbo_connections')
    .select('*')
    .eq('realm_id', realmId)
    .eq('user_id', userId)
    .single()

  if (!conn) return null

  let token = conn.access_token
  if (new Date(conn.token_expires_at) <= new Date()) {
    const creds = Buffer.from(`${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`).toString('base64')
    const res = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${creds}`, Accept: 'application/json' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: conn.refresh_token }),
    })
    const tokens = await res.json()
    if (!res.ok) return null
    token = tokens.access_token
    await supabase.from('qbo_connections').update({
      access_token: token, refresh_token: tokens.refresh_token,
      token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    }).eq('id', conn.id)
  }

  const baseUrl = process.env.QBO_ENVIRONMENT === 'production'
    ? 'https://quickbooks.api.intuit.com'
    : 'https://sandbox-quickbooks.api.intuit.com'

  return { token, baseUrl }
}

async function qboQuery(baseUrl: string, realmId: string, token: string, query: string) {
  const res = await fetch(
    `${baseUrl}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}&minorversion=65`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
  )
  return res.json()
}

function categorizeAccount(accountName: string): 'labor' | 'materials' | 'subcontractors' | 'other' {
  const name = (accountName ?? '').toLowerCase()
  if (name.includes('labor') || name.includes('wage') || name.includes('payroll') || name.includes('salary')) return 'labor'
  if (name.includes('sub') || name.includes('contract')) return 'subcontractors'
  if (name.includes('material') || name.includes('supply') || name.includes('supplies') || name.includes('equipment') || name.includes('lumber') || name.includes('hardware')) return 'materials'
  return 'other'
}

function sumLineItems(lines: any[], targetCustomerId: string | null, fallbackCustomerId: string | null): Record<string, number> {
  const result = { labor: 0, materials: 0, subcontractors: 0, other: 0 }
  if (!lines) return result
  for (const line of lines) {
    const detail = line.AccountBasedExpenseLineDetail ?? line.ItemBasedExpenseLineDetail ?? {}
    const lineCustomer = detail?.CustomerRef?.value ?? null
    const matchesJob = !targetCustomerId || lineCustomer === targetCustomerId || lineCustomer === fallbackCustomerId
    if (!matchesJob) continue
    const amount = Number(line.Amount ?? 0)
    const acctName = detail?.AccountRef?.name ?? detail?.ItemRef?.name ?? ''
    const category = categorizeAccount(acctName)
    result[category] += amount
  }
  return result
}

export interface JobCostData {
  id: string
  name: string
  contractAmount: number
  budgetTotal: number
  costs: { labor: number; materials: number; subcontractors: number; other: number; total: number }
  billed: number
  variance: number
  variancePct: number
  status: 'on-track' | 'over-budget' | 'under-budget'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const realmId = searchParams.get('realmId')
  const userId = searchParams.get('userId')
  if (!realmId || !userId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const auth = await getAccessToken(realmId, userId, supabase)
  if (!auth) return NextResponse.json({ error: 'Auth failed' }, { status: 401 })
  const { token, baseUrl } = auth

  const [customersData, invoicesData, estimatesData, billsData, purchasesData] = await Promise.all([
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Customer MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Invoice MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Estimate MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Bill MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Purchase MAXRESULTS 200'),
  ])

  const customers: any[] = customersData?.QueryResponse?.Customer ?? []
  const invoices: any[] = invoicesData?.QueryResponse?.Invoice ?? []
  const estimates: any[] = estimatesData?.QueryResponse?.Estimate ?? []
  const bills: any[] = billsData?.QueryResponse?.Bill ?? []
  const purchases: any[] = purchasesData?.QueryResponse?.Purchase ?? []

  // Only include jobs (sub-customers or customers with job flag)
  const jobs = customers.filter(c => c.Job === true || c.ParentRef)
  const allCustomers = jobs.length > 0 ? jobs : customers.filter(c => !c.ParentRef).slice(0, 20)

  const jobCosts: JobCostData[] = allCustomers.map((job) => {
    const jobId = job.Id
    const parentId = job.ParentRef?.value ?? null

    // Contract amount from invoices for this job
    const contractAmount = invoices
      .filter(inv => inv.CustomerRef?.value === jobId || inv.CustomerRef?.value === parentId)
      .reduce((sum, inv) => sum + Number(inv.TotalAmt ?? 0), 0)

    // Budget from estimates
    const budgetTotal = estimates
      .filter(est => est.CustomerRef?.value === jobId || est.CustomerRef?.value === parentId)
      .reduce((sum, est) => sum + Number(est.TotalAmt ?? 0), 0)

    // Costs from bills (subcontractors primarily)
    const billCosts = { labor: 0, materials: 0, subcontractors: 0, other: 0 }
    for (const bill of bills) {
      const topCustomer = bill.CustomerRef?.value ?? null
      if (topCustomer === jobId || (parentId !== null && topCustomer === parentId)) {
        const lines = sumLineItems(bill.Line, jobId, parentId)
        if (lines.labor + lines.materials + lines.subcontractors + lines.other === 0) {
          // Top-level match, categorize as subcontractor
          billCosts.subcontractors += Number(bill.TotalAmt ?? 0)
        } else {
          billCosts.labor += lines.labor
          billCosts.materials += lines.materials
          billCosts.subcontractors += lines.subcontractors
          billCosts.other += lines.other
        }
      } else {
        const lines = sumLineItems(bill.Line, jobId, parentId)
        billCosts.labor += lines.labor
        billCosts.materials += lines.materials
        billCosts.subcontractors += lines.subcontractors
        billCosts.other += lines.other
      }
    }

    // Costs from purchases (materials / expenses)
    const purchaseCosts = { labor: 0, materials: 0, subcontractors: 0, other: 0 }
    for (const p of purchases) {
      const lines = sumLineItems(p.Line, jobId, parentId)
      purchaseCosts.labor += lines.labor
      purchaseCosts.materials += lines.materials
      purchaseCosts.subcontractors += lines.subcontractors
      purchaseCosts.other += lines.other
    }

    const costs = {
      labor: billCosts.labor + purchaseCosts.labor,
      materials: billCosts.materials + purchaseCosts.materials,
      subcontractors: billCosts.subcontractors + purchaseCosts.subcontractors,
      other: billCosts.other + purchaseCosts.other,
      total: 0,
    }
    costs.total = costs.labor + costs.materials + costs.subcontractors + costs.other

    const billed = invoices
      .filter(inv => inv.CustomerRef?.value === jobId)
      .reduce((sum, inv) => sum + (Number(inv.TotalAmt ?? 0) - Number(inv.Balance ?? 0)), 0)

    const budget = budgetTotal > 0 ? budgetTotal : contractAmount * 0.8
    const variance = budget - costs.total
    const variancePct = budget > 0 ? (variance / budget) * 100 : 0
    const status: JobCostData['status'] = variance < -0.01 ? 'over-budget' : variance > budget * 0.1 ? 'under-budget' : 'on-track'

    return {
      id: jobId,
      name: job.DisplayName ?? job.Name,
      contractAmount,
      budgetTotal: budget,
      costs,
      billed,
      variance,
      variancePct,
      status,
    }
  })

  return NextResponse.json({ jobs: jobCosts, company: (await supabase.from('qbo_connections').select('company_name').eq('realm_id', realmId).single()).data?.company_name })
}
