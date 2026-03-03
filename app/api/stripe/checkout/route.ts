import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(request: NextRequest) {
  const { userId, email } = await request.json()
  if (!userId || !email) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Get or create Stripe customer
  const { data: sub } = await supabase.from('subscriptions').select('stripe_customer_id').eq('user_id', userId).single()
  let customerId = sub?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } })
    customerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade`,
    subscription_data: {
      trial_period_days: 14,
      metadata: { supabase_user_id: userId },
    },
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
