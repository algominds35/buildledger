import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

async function getAuth(realmId: string, userId: string, supabase: any) {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const realmId = searchParams.get('realmId')
  const userId = searchParams.get('userId')
  if (!realmId || !userId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const auth = await getAuth(realmId, userId, supabase)
  if (!auth) return NextResponse.json({ error: 'Auth failed' }, { status: 401 })
  const { token, baseUrl, company } = auth

  const [customersData, invoicesData, billsData, estimatesData] = await Promise.all([
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Customer MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Invoice MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Bill MAXRESULTS 200'),
    qboQuery(baseUrl, realmId, token, 'SELECT * FROM Estimate MAXRESULTS 200'),
  ])

  const customers: any[] = customersData?.QueryResponse?.Customer ?? []
  const invoices: any[] = invoicesData?.QueryResponse?.Invoice ?? []
  const bills: any[] = billsData?.QueryResponse?.Bill ?? []
  const estimates: any[] = estimatesData?.QueryResponse?.Estimate ?? []

  const jobs = customers.filter(c => c.Job === true || c.ParentRef)
  const activeJobs = jobs.length > 0 ? jobs : customers.filter(c => !c.ParentRef)

  const totalBilled = invoices.reduce((s, inv) => s + Number(inv.TotalAmt ?? 0), 0)
  const totalCosts = bills.reduce((s, b) => s + Number(b.TotalAmt ?? 0), 0)
  const totalContract = estimates.reduce((s, e) => s + Number(e.TotalAmt ?? 0), 0) || totalBilled * 1.25

  const openInvoices = invoices.filter(inv => Number(inv.Balance ?? 0) > 0)
  const totalAR = openInvoices.reduce((s, inv) => s + Number(inv.Balance ?? 0), 0)
  const openBills = bills.filter(b => Number(b.Balance ?? 0) > 0)
  const totalAP = openBills.reduce((s, b) => s + Number(b.Balance ?? 0), 0)

  // Simplified over/under billings
  const estimatedCosts = totalContract * 0.75
  const pctComplete = estimatedCosts > 0 ? Math.min(totalCosts / estimatedCosts, 1) : 0
  const earnedRevenue = totalContract * pctComplete
  const overBillings = Math.max(0, totalBilled - earnedRevenue)
  const underBillings = Math.max(0, earnedRevenue - totalBilled)

  return NextResponse.json({
    company,
    realmId,
    activeJobs: activeJobs.length,
    totalContract,
    totalBilled,
    totalCosts,
    totalAR,
    totalAP,
    overBillings,
    underBillings,
    openInvoices: openInvoices.length,
    openBills: openBills.length,
  })
}
