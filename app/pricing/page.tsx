'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // Not logged in — send to signup with a redirect back to checkout
        window.location.href = '/login?next=checkout'
        return
      }
      // Already logged in — go straight to Stripe
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      })
      const { url } = await res.json()
      window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {/* Nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">ReconcileBook</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign in</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Simple pricing</p>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">One plan. Everything included.</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">No per-client fees. No report limits. One flat monthly rate for everything.</p>
        </div>

        <div className="max-w-lg mx-auto mb-16">
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full -translate-y-12 translate-x-12" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/30 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Instant access — start using it today
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-6xl font-extrabold text-white">$99</span>
                <span className="text-slate-400 mb-3 text-lg">/month</span>
              </div>
              <p className="text-slate-400 text-sm mb-8">Cancel anytime. No contracts. No setup fees.</p>

              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited contractor clients',
                  'Job Costing reports — live from QBO',
                  'WIP Schedule — cost-to-cost method',
                  'Multi-client dashboard',
                  'One-click PDF export',
                  'Retainage & over/under billing tracking',
                  'QuickBooks Online integration',
                  'Priority support',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* What happens after you pay */}
              <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What happens after you subscribe</p>
                <div className="space-y-2.5">
                  {[
                    { step: '1', text: 'You\'re charged $99 and get instant full access' },
                    { step: '2', text: 'Connect your clients\' QuickBooks accounts in seconds' },
                    { step: '3', text: 'Job costing & WIP reports are ready immediately' },
                    { step: '4', text: 'Cancel anytime from your billing portal — no penalty' },
                  ].map(s => (
                    <div key={s.step} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-slate-900 text-xs font-bold">{s.step}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="block w-full text-center py-4 bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors text-base cursor-pointer"
              >
                {loading ? 'Redirecting to payment…' : 'Subscribe now — $99/month →'}
              </button>
              <p className="text-center text-slate-500 text-xs mt-3">Billed monthly · Cancel anytime from your billing portal</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: 'When am I charged?', a: 'You are charged $99 immediately when you subscribe. You get instant full access to all features right away.' },
              { q: 'How many QuickBooks clients can I connect?', a: 'Unlimited. There are no per-client fees — connect as many contractor clients as you manage.' },
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from your billing portal with no fees or penalties. You keep access until the end of your billing period.' },
              { q: 'Does it work with QuickBooks Desktop?', a: 'ReconcileBook connects to QuickBooks Online only. QuickBooks Desktop is not currently supported.' },
              { q: 'What happens to my data if I cancel?', a: 'Your data stays in your QuickBooks account — ReconcileBook only reads from QBO, it never stores your financial data permanently.' },
            ].map(faq => (
              <div key={faq.q} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-white text-sm mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
