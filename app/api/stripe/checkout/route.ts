import { NextRequest, NextResponse } from 'next/server'

const PAYMENT_LINK = 'https://buy.stripe.com/test_28E4gBd2eerBdvjaee0Fi0c'

export async function POST(request: NextRequest) {
  const { userId } = await request.json()
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  // Attach user ID so the webhook can match the payment to the Supabase user
  const url = `${PAYMENT_LINK}?client_reference_id=${userId}`
  return NextResponse.json({ url })
}
