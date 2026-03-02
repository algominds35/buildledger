import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const realmId = searchParams.get('realmId')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (!code || !state || !realmId) {
    return NextResponse.redirect(`${appUrl}/dashboard?error=missing_params`)
  }

  let userId: string
  try {
    userId = Buffer.from(state, 'base64').toString('utf-8')
  } catch {
    return NextResponse.redirect(`${appUrl}/dashboard?error=invalid_state`)
  }

  // Exchange authorization code for tokens
  const credentials = Buffer.from(
    `${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`
  ).toString('base64')

  const tokenRes = await fetch(
    'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.QBO_REDIRECT_URI!,
      }),
    }
  )

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    console.error('QBO token exchange failed:', tokens)
    return NextResponse.redirect(`${appUrl}/dashboard?error=token_failed`)
  }

  // Fetch company name from QBO
  let companyName = 'QuickBooks Company'
  try {
    const baseUrl = process.env.QBO_ENVIRONMENT === 'production'
      ? 'https://quickbooks.api.intuit.com'
      : 'https://sandbox-quickbooks.api.intuit.com'

    const infoRes = await fetch(
      `${baseUrl}/v3/company/${realmId}/companyinfo/${realmId}?minorversion=65`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: 'application/json',
        },
      }
    )
    const infoData = await infoRes.json()
    companyName = infoData?.CompanyInfo?.CompanyName ?? companyName
  } catch (e) {
    console.error('Could not fetch company name:', e)
  }

  // Store tokens in Supabase using service role key (bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  const { error } = await supabase.from('qbo_connections').upsert(
    {
      user_id: userId,
      realm_id: realmId,
      company_name: companyName,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,realm_id' }
  )

  if (error) {
    console.error('Supabase upsert error:', error)
    return NextResponse.redirect(`${appUrl}/dashboard?error=db_failed`)
  }

  return NextResponse.redirect(`${appUrl}/dashboard?connected=1`)
}
