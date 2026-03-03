'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UpgradeClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, email: session.user.email }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">ReconcileBook</span>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full -translate-y-10 translate-x-10" />
          <div className="relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                Your 14-day trial has ended
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2">Subscribe to keep access</h1>
              <p className="text-slate-400 text-sm">Your reports, clients, and data are all saved. Subscribe to continue.</p>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-end justify-center gap-1">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-slate-400 mb-2">/month</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">Cancel anytime. No contracts.</p>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
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

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-900 font-bold text-base rounded-xl transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Redirecting to checkout…
                </span>
              ) : (
                'Subscribe now — $99/month'
              )}
            </button>

            <p className="text-center text-slate-500 text-xs mt-3">
              Secured by Stripe · Cancel anytime from your billing portal
            </p>

            <div className="mt-4 text-center">
              <Link href="/dashboard" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                ← Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
