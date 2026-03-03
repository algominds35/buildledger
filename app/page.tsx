'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">ReconcileBook</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
              Built for construction bookkeepers
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Construction bookkeeping,{' '}
              <span className="text-amber-400">built for the pros.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
              Manage job costing, WIP reports, and multi-client dashboards for all your construction contractor clients — directly from QuickBooks Online data.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-lg shadow-amber-400/20">
                Start free trial →
              </Link>
              <a href="#how-it-works" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-base rounded-xl transition-colors">
                See how it works
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto px-6 mt-20 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {[
              { value: '100%', label: 'QuickBooks native' },
              { value: 'Real-time', label: 'Job cost tracking' },
              { value: 'Instant', label: 'WIP schedule' },
              { value: 'PDF', label: 'One-click export' },
            ].map(s => (
              <div key={s.label} className="bg-slate-800/60 px-6 py-5">
                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">The full toolkit for construction bookkeepers</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Stop building reports in spreadsheets. ReconcileBook pulls live data from QuickBooks and turns it into professional reports in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Job Costing Reports',
                desc: 'See total costs broken down by materials, labor, and subcontractors for every project. Budget vs. actual with variance highlighted.',
                bullets: ['Materials, labor, subs breakdown', 'Budget vs. actual variance', 'Over-budget alerts', 'Per-project detail cards'],
              },
              {
                title: 'WIP Schedules',
                desc: 'The #1 report your contractor clients need for bonding and financing — automatically calculated using the cost-to-cost method.',
                bullets: ['% complete (cost-to-cost)', 'Over/under billings', 'Retainage tracking', 'Revenue earned vs. billed'],
              },
              {
                title: 'Multi-Client Dashboard',
                desc: 'Manage every contractor client from one screen. See key financial metrics across your entire portfolio at a glance.',
                bullets: ['Portfolio overview', 'Per-client financial summary', 'Open invoices & bills', 'Connect unlimited clients'],
              },
            ].map(f => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2">
                  {f.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional feature row */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-900 rounded-2xl p-7 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">One-click PDF Export</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Download any report as a professionally formatted PDF — branded with the company name and date. Send directly to clients or lenders.</p>
            </div>
            <div className="bg-amber-400 rounded-2xl p-7">
              <div className="w-10 h-10 bg-slate-900/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Native QuickBooks Integration</h3>
              <p className="text-slate-800/70 text-sm leading-relaxed">Connect any contractor's QBO account in under a minute using secure OAuth. No manual data entry. Reports always reflect live data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Simple setup</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Up and running in minutes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up with your email. No credit card required to start.' },
              { step: '02', title: "Connect a client's QBO", desc: 'Click "Connect Client" and authorize their QuickBooks account via OAuth in one click.' },
              { step: '03', title: 'Pull live data', desc: 'ReconcileBook instantly fetches jobs, invoices, bills, and expenses from QuickBooks.' },
              { step: '04', title: 'Generate reports', desc: 'Open job costing or WIP reports. Download as PDF and share with your client.' },
            ].map(s => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-extrabold text-slate-200 mb-3 leading-none">{s.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                {s.step !== '04' && (
                  <div className="hidden md:block absolute top-6 -right-3 text-slate-300 text-2xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Simple pricing</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">One plan. Everything included.</h2>
            <p className="text-slate-500 mt-4 text-lg">No per-client fees. No report limits. Just one flat monthly rate.</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-12 translate-x-12" />
              <div className="relative">
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold">$99</span>
                  <span className="text-slate-400 mb-2">/month</span>
                </div>
                <p className="text-slate-400 text-sm mb-8">Everything included. Cancel anytime.</p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited contractor clients',
                    'Job Costing reports — live from QBO',
                    'WIP Schedule — cost-to-cost method',
                    'Multi-client dashboard',
                    'One-click PDF export',
                    'QuickBooks Online integration',
                    'Automatic token refresh',
                    'Priority support',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/login" className="block w-full text-center py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-base">
                  Start free trial →
                </Link>
                <p className="text-center text-slate-500 text-xs mt-3">14-day free trial · No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-20 bg-amber-400">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Ready to run construction books like a pro?
          </h2>
          <p className="text-slate-800/70 text-lg mb-8">
            Join bookkeepers who have replaced spreadsheets with ReconcileBook.
          </p>
          <Link href="/login" className="inline-block px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-bold text-base rounded-xl transition-colors shadow-xl">
            Get started free →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <span className="text-white font-bold">ReconcileBook</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
            </div>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} ReconcileBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
