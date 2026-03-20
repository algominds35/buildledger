import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

async function getAccessToken(realmId: string, userId: string, supabase: any) {
  const { data: conn } = await supabase
    .from('qbo_connections').select('*').eq('realm_id', realmId).eq('user_id', userId).single()
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
    ? 'https://quickbooks.api.intuit.com' : 'https://sandbox-quickbooks.api.intuit.com'
  return { token, baseUrl, company: conn.company_name }
}

async function qboQuery(baseUrl: string, realmId: string, token: string, query: string) {
  const res = await fetch(
    `${baseUrl}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}&minorversion=65`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
  )
  return res.json()
}

export interface WipRow {
  id: string
  name: string
  contractAmount: number
  estimatedCosts: number
  costsToDate: number
  pctComplete: number
  earnedRevenue: number
  billedToDate: number
  overBilling: number
  underBilling: number
  costToComplete: number
  retainage: number
  grossProfit: number
  grossMarginPct: number
  status: 'active' | 'complete' | 'not-started'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const realmId = searchParams.get('realmId')
  const userId = searchParams.get('userId')
  if (!realmId || !userId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const auth = await getAccessToken(realmId, userId, supabase)
  if (!auth) return NextResponse.json({ error: 'Auth failed' }, { status: 401 })
  const { token, baseUrl, company } = auth

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

  const jobs = customers.filter(c => c.Job === true || c.ParentRef)
  const allJobs = jobs.length > 0 ? jobs : customers.filter(c => !c.ParentRef).slice(0, 20)

  const wipRows: WipRow[] = allJobs.map((job) => {
    const jobId = job.Id
    const parentId = job.ParentRef?.value ?? null

    const jobInvoices = invoices.filter(inv =>
      inv.CustomerRef?.value === jobId || inv.CustomerRef?.value === parentId
    )
    /** Progress billings — sum of invoice amounts (never use this as contract value) */
    const billedToDate = jobInvoices.reduce((s, inv) => s + Number(inv.TotalAmt ?? 0), 0)

    // Estimates (job contract / price + cost baseline in QBO)
    const jobEstimates = estimates.filter(est =>
      est.CustomerRef?.value === jobId || est.CustomerRef?.value === parentId
    )
    const estimateTotalAmt = jobEstimates.reduce((s, est) => s + Number(est.TotalAmt ?? 0), 0)

    /**
     * Contract value (revenue basis) for % complete and "revenue earned."
     * Prefer Estimate total (job price), not invoice sum — otherwise billed === contract
     * and WIP never shows real over/under billing vs progress.
     */
    const contractAmount =
      estimateTotalAmt > 0 ? estimateTotalAmt : billedToDate

    // Retainage: sum of retainage line items or estimate 10%
    const retainage = jobInvoices.reduce((s, inv) => {
      const retLines = (inv.Line ?? []).filter((l: any) =>
        (l.Description ?? '').toLowerCase().includes('retainage') ||
        (l.Description ?? '').toLowerCase().includes('retention')
      )
      return s + retLines.reduce((rs: number, l: any) => rs + Math.abs(Number(l.Amount ?? 0)), 0)
    }, 0) || billedToDate * 0.1

    /**
     * Denominator for cost-to-cost % complete = estimated total job cost.
     * When QBO only has a sell-price estimate, we approximate total cost as 75% of contract
     * (adjust if you later add a dedicated cost budget field).
     */
    const estimatedCosts =
      estimateTotalAmt > 0 ? estimateTotalAmt * 0.75 : contractAmount * 0.75

    // Costs to date from bills + purchases assigned to this job
    const costsToDate =
      bills.filter(b => b.CustomerRef?.value === jobId || b.CustomerRef?.value === parentId)
        .reduce((s, b) => s + Number(b.TotalAmt ?? 0), 0) +
      purchases
        .flatMap((p: any) => p.Line ?? [])
        .filter((l: any) => l.AccountBasedExpenseLineDetail?.CustomerRef?.value === jobId ||
          l.ItemBasedExpenseLineDetail?.CustomerRef?.value === jobId)
        .reduce((s: number, l: any) => s + Number(l.Amount ?? 0), 0)

    // % Complete (cost-to-cost method)
    const pctComplete = estimatedCosts > 0
      ? Math.min(costsToDate / estimatedCosts, 1)
      : contractAmount > 0 ? (billedToDate / contractAmount) : 0

    // Earned revenue = contract × % complete
    const earnedRevenue = contractAmount * pctComplete

    // Over/under billings
    const overBilling = Math.max(0, billedToDate - earnedRevenue)
    const underBilling = Math.max(0, earnedRevenue - billedToDate)

    // Cost to complete
    const costToComplete = Math.max(0, estimatedCosts - costsToDate)

    // Gross profit = earned revenue - costs to date
    const grossProfit = earnedRevenue - costsToDate
    const grossMarginPct = earnedRevenue > 0 ? (grossProfit / earnedRevenue) * 100 : 0

    // Status
    const status: WipRow['status'] =
      pctComplete >= 0.99 ? 'complete' :
      costsToDate > 0 || billedToDate > 0 ? 'active' : 'not-started'

    return {
      id: jobId,
      name: job.DisplayName ?? job.Name,
      contractAmount,
      estimatedCosts,
      costsToDate,
      pctComplete: pctComplete * 100,
      earnedRevenue,
      billedToDate,
      overBilling,
      underBilling,
      costToComplete,
      retainage,
      grossProfit,
      grossMarginPct,
      status,
    }
  })

  return NextResponse.json({ wip: wipRows, company })
}
