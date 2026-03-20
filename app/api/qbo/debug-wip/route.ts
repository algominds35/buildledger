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
  return { token, baseUrl }
}

async function qboQuery(baseUrl: string, realmId: string, token: string, query: string) {
  const res = await fetch(
    `${baseUrl}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}&minorversion=65`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
  )
  return res.json()
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

  const jobs = customers.filter(c => c.Job === true || c.ParentRef)
  const allJobs = jobs.length > 0 ? jobs : customers.filter(c => !c.ParentRef).slice(0, 20)

  const jobDebug = allJobs.map((job) => {
    const jobId = job.Id
    const parentId = job.ParentRef?.value ?? null

    // --- Invoices ---
    const matchedInvoices = invoices
      .filter(inv => inv.CustomerRef?.value === jobId || inv.CustomerRef?.value === parentId)
      .map(inv => ({
        id: inv.Id,
        docNumber: inv.DocNumber,
        totalAmt: inv.TotalAmt,
        customerRef: inv.CustomerRef,
      }))

    // --- Estimates ---
    const matchedEstimates = estimates
      .filter(est => est.CustomerRef?.value === jobId || est.CustomerRef?.value === parentId)
      .map(est => ({
        id: est.Id,
        docNumber: est.DocNumber,
        totalAmt: est.TotalAmt,
        customerRef: est.CustomerRef,
      }))

    // --- Bills ---
    const billAnalysis = bills.map(bill => {
      const topCustomer = bill.CustomerRef?.value ?? null
      const topMatch = topCustomer === jobId || topCustomer === parentId

      const lineMatches = (bill.Line ?? []).map((line: any) => {
        const detail = line.AccountBasedExpenseLineDetail ?? line.ItemBasedExpenseLineDetail ?? {}
        const lineCustomer = detail?.CustomerRef?.value ?? null
        const matches = lineCustomer === jobId || lineCustomer === parentId
        return {
          lineId: line.Id,
          amount: line.Amount,
          lineCustomerRef: lineCustomer,
          accountRef: detail?.AccountRef,
          itemRef: detail?.ItemRef,
          matchesJob: matches,
          reason: !matches
            ? (lineCustomer ? `CustomerRef ${lineCustomer} ≠ jobId ${jobId}` : 'No CustomerRef on line')
            : 'included',
        }
      })

      const includedAmount = topMatch
        ? Number(bill.TotalAmt ?? 0)
        : lineMatches.filter((l: any) => l.matchesJob).reduce((s: number, l: any) => s + Number(l.amount ?? 0), 0)

      return {
        billId: bill.Id,
        docNumber: bill.DocNumber,
        totalAmt: bill.TotalAmt,
        headerCustomerRef: bill.CustomerRef,
        headerMatch: topMatch,
        includedInCosts: includedAmount,
        lines: lineMatches,
      }
    }).filter((b: any) => b.headerMatch || b.lines.some((l: any) => l.matchesJob))

    // --- Purchases ---
    const purchaseAnalysis = purchases.map(p => {
      const lines = (p.Line ?? []).map((line: any) => {
        const detail = line.AccountBasedExpenseLineDetail ?? line.ItemBasedExpenseLineDetail ?? {}
        const lineCustomer = detail?.CustomerRef?.value ?? null
        const matches = lineCustomer === jobId || lineCustomer === parentId
        return {
          lineId: line.Id,
          amount: line.Amount,
          lineCustomerRef: lineCustomer,
          accountRef: detail?.AccountRef,
          matchesJob: matches,
          reason: !matches
            ? (lineCustomer ? `CustomerRef ${lineCustomer} ≠ jobId ${jobId}` : 'No CustomerRef on line — expenses must be assigned to customer/job to appear in WIP')
            : 'included',
        }
      })
      const includedAmount = lines.filter((l: any) => l.matchesJob).reduce((s: number, l: any) => s + Number(l.amount ?? 0), 0)
      return { purchaseId: p.Id, paymentType: p.PaymentType, totalAmt: p.TotalAmt, includedInCosts: includedAmount, lines }
    }).filter((p: any) => p.lines.some((l: any) => l.matchesJob || l.lineCustomerRef))

    const costsFromBills = billAnalysis.reduce((s: number, b: any) => s + b.includedInCosts, 0)
    const costsFromPurchases = purchaseAnalysis.reduce((s: number, p: any) => s + p.includedInCosts, 0)
    const totalCostsToDate = costsFromBills + costsFromPurchases

    return {
      job: { id: jobId, name: job.DisplayName, parentId },
      summary: {
        matchedInvoices: matchedInvoices.length,
        totalBilled: matchedInvoices.reduce((s, i) => s + Number(i.totalAmt ?? 0), 0),
        matchedEstimates: matchedEstimates.length,
        totalEstimated: matchedEstimates.reduce((s, e) => s + Number(e.totalAmt ?? 0), 0),
        costsFromBills,
        costsFromPurchases,
        totalCostsToDate,
        diagnosis: totalCostsToDate === 0
          ? 'ZERO COSTS: Either no bills/expenses are assigned to this job in QBO, or they exist but have no CustomerRef on the line items. Open QBO → find the bill/expense → edit each line → set Customer to this job.'
          : `Costs found: $${totalCostsToDate}`,
      },
      invoices: matchedInvoices,
      estimates: matchedEstimates,
      bills: billAnalysis,
      purchases: purchaseAnalysis,
    }
  })

  return NextResponse.json({
    totals: {
      customers: customers.length,
      jobs: allJobs.length,
      invoices: invoices.length,
      estimates: estimates.length,
      bills: bills.length,
      purchases: purchases.length,
    },
    jobs: jobDebug,
  })
}
