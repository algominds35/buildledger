import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshToken(connection: Record<string, string>, supabase: any) {
  const credentials = Buffer.from(
    `${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: connection.refresh_token,
    }),
  })

  const tokens = await res.json()
  if (!res.ok) throw new Error('Refresh failed')

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()
  await supabase.from('qbo_connections').update({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  }).eq('id', connection.id)

  return tokens.access_token as string
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

  if (!realmId || !userId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: connection, error } = await supabase
    .from('qbo_connections')
    .select('*')
    .eq('realm_id', realmId)
    .eq('user_id', userId)
    .single()

  if (error || !connection) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
  }

  let accessToken: string = connection.access_token
  if (new Date(connection.token_expires_at) <= new Date()) {
    try {
      accessToken = await refreshToken(connection, supabase)
    } catch {
      return NextResponse.json({ error: 'Token expired — please reconnect QuickBooks' }, { status: 401 })
    }
  }

  const baseUrl = process.env.QBO_ENVIRONMENT === 'production'
    ? 'https://quickbooks.api.intuit.com'
    : 'https://sandbox-quickbooks.api.intuit.com'

  const [customers, invoices, bills, expenses, accounts] = await Promise.all([
    qboQuery(baseUrl, realmId, accessToken, 'SELECT * FROM Customer MAXRESULTS 100'),
    qboQuery(baseUrl, realmId, accessToken, 'SELECT * FROM Invoice MAXRESULTS 100'),
    qboQuery(baseUrl, realmId, accessToken, 'SELECT * FROM Bill MAXRESULTS 100'),
    qboQuery(baseUrl, realmId, accessToken, 'SELECT * FROM Purchase MAXRESULTS 100'),
    qboQuery(baseUrl, realmId, accessToken, 'SELECT * FROM Account MAXRESULTS 100'),
  ])

  return NextResponse.json({
    company: connection.company_name,
    realmId,
    customers: customers?.QueryResponse?.Customer ?? [],
    invoices: invoices?.QueryResponse?.Invoice ?? [],
    bills: bills?.QueryResponse?.Bill ?? [],
    expenses: expenses?.QueryResponse?.Purchase ?? [],
    accounts: accounts?.QueryResponse?.Account ?? [],
  })
}
