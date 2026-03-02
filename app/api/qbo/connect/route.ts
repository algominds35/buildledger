import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  const state = Buffer.from(userId).toString('base64')

  const params = new URLSearchParams({
    client_id: process.env.QBO_CLIENT_ID!,
    scope: 'com.intuit.quickbooks.accounting',
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/qbo/callback`,
    response_type: 'code',
    access_type: 'offline',
    state,
  })

  const authUrl = `https://appcenter.intuit.com/connect/oauth2?${params}`
  return NextResponse.redirect(authUrl)
}
