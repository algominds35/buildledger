'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function Check() {
  return (
    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function Dash() {
  return <span className="text-slate-300 mt-0.5 flex-shrink-0">—</span>
}

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleSubscribe(plan: 'pro' | 'team') {
    setLoading(plan)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = `/login?next=${plan === 'team' ? 'team' : 'pricing'}`
        return
      }
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, plan }),
      })
      const { url } = await res.json()
      window.location.href = url
    } finally {
      setLoading(null)
    }
  }

  const proFeatures = [
    'Works with QuickBooks Online',
    'Automatically generate WIP schedules',
    'Instant job costing and over/under billing',
    'Multi-client dashboard',
    'Retainage tracking',
    'Export reports in seconds',
    'Priority support',
  ]

  const teamFeatures = [
    'Everything in Pro',
    'Multiple companies / entities',
    'Team access (multi-user)',
    'Faster / bulk report generation',
    'Priority support',
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">ReconcileBook</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/#features" className="hover:text-slate-900 transition-colors">Features</Link>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign in</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Start free for 14 days — no credit card required. Pick your plan when your trial ends.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            14-day free trial · No credit card required · Cancel anytime
          </div>
        </div>

        {/* 3 pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">

          {/* Pro — $99 */}
          <div className="bg-slate-900 rounded-3xl border-2 border-amber-400 p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-amber-400 text-slate-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">Most Popular</span>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pro</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-slate-400 mb-2 text-base">/month</span>
              </div>
              <p className="text-slate-400 text-sm">For bookkeepers, ProAdvisors, and Financial Controllers managing construction companies — generate WIP and job costing automatically from QuickBooks.</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-slate-200">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('pro')}
              disabled={loading === 'pro'}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors text-sm"
            >
              {loading === 'pro' ? 'Redirecting…' : 'Start free 14-day trial →'}
            </button>
          </div>

          {/* Team — $199 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col">
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Team</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-slate-900">$199</span>
                <span className="text-slate-400 mb-2 text-base">/month</span>
              </div>
              <p className="text-slate-500 text-sm">For firms managing multiple companies, clients, or higher usage.</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {teamFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('team')}
              disabled={loading === 'team'}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-sm"
            >
              {loading === 'team' ? 'Redirecting…' : 'Choose Team →'}
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col">
            <div className="mb-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Enterprise</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
              </div>
              <p className="text-slate-500 text-sm">For finance teams and large firms needing custom setup and dedicated support.</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                'Everything in Team',
                'Custom onboarding & training',
                'White-label option',
                'Dedicated account manager',
                'Custom reporting',
                'SLA & priority uptime',
                'Invoice billing available',
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:alex@reconcilebookapp.com?subject=Enterprise inquiry"
              className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors text-sm text-center block"
            >
              Contact us →
            </a>
            <p className="text-center text-slate-400 text-xs mt-2">We&apos;ll respond within 1 business day</p>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Compare plans</h2>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-900 text-white text-sm font-bold">
              <div className="px-6 py-4 text-slate-400">Feature</div>
              <div className="px-6 py-4 text-center text-amber-400">Pro</div>
              <div className="px-6 py-4 text-center">Team</div>
              <div className="px-6 py-4 text-center">Enterprise</div>
            </div>
            {[
              { feature: 'QBO companies', pro: 'Unlimited', team: 'Unlimited', ent: 'Unlimited' },
              { feature: 'WIP Schedule', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'Job Costing reports', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'PDF export', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'QuickBooks Online', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'Over/under billing', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'Multi-client dashboard', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'Retainage tracking', pro: '✓', team: '✓', ent: '✓' },
              { feature: 'Team seats (multi-user)', pro: '—', team: '✓', ent: '✓' },
              { feature: 'Bulk report generation', pro: '—', team: '✓', ent: '✓' },
              { feature: 'White-label', pro: '—', team: '—', ent: '✓' },
              { feature: 'Dedicated support', pro: 'Priority', team: 'Priority', ent: 'Dedicated' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 text-sm border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-6 py-3.5 text-slate-700 font-medium">{row.feature}</div>
                <div className="px-6 py-3.5 text-center font-semibold text-slate-900">{row.pro}</div>
                <div className="px-6 py-3.5 text-center text-slate-500">{row.team}</div>
                <div className="px-6 py-3.5 text-center text-slate-500">{row.ent}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need a credit card to start?', a: 'No. Your 14-day free trial starts the moment you sign up — no credit card required. You only enter payment details when your trial ends.' },
              { q: 'How many QBO companies can I connect?', a: 'On the Pro plan you can connect unlimited QuickBooks Online companies. Each connected QBO account is one company.' },
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from your billing portal with no fees or penalties. You keep access until the end of your billing period.' },
              { q: 'Does it work with QuickBooks Desktop?', a: 'ReconcileBook connects to QuickBooks Online only. All QBO plans are supported — Simple Start, Essentials, Plus, and Advanced.' },
              { q: 'What happens to my data if I cancel?', a: 'Your data stays in QuickBooks — ReconcileBook only reads from QBO and never stores your financial data permanently.' },
            ].map(faq => (
              <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} ReconcileBook. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
