import { NextRequest, NextResponse } from 'next/server'

const PAYMENT_LINKS: Record<string, string> = {
  starter: 'https://buy.stripe.com/dRm4gBgeqerBbnbaee0Fi0k',  // $49/mo
  pro:     'https://buy.stripe.com/8x214p1jwdnx3UJgCC0Fi0l',  // $99/mo
}

export async function POST(request: NextRequest) {
  const { userId, plan } = await request.json()
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  const link = PAYMENT_LINKS[plan] ?? PAYMENT_LINKS.pro
  const url = `${link}?client_reference_id=${userId}`
  return NextResponse.json({ url })
}
