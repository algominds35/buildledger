'use client'

import Link from 'next/link'

function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
      {/* Browser chrome */}
      <div className="bg-slate-700 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex-1 bg-slate-600 rounded-md px-3 py-1 text-slate-400 text-xs font-mono">
          reconcilebook.com/dashboard
        </div>
      </div>
      {children}
    </div>
  )
}

function DashboardMockup() {
  const clients = [
    { name: 'Apex Builders LLC', jobs: 8, contract: '$1,240,000', billed: '$892,000', costs: '$710,000', ar: '$148,000', over: '$24,500', under: '—', status: 'over' },
    { name: 'Summit Contracting', jobs: 5, contract: '$780,000', billed: '$430,000', costs: '$380,000', ar: '$95,000', over: '—', under: '$61,200', status: 'under' },
    { name: 'Peak Construction Co.', jobs: 11, contract: '$2,100,000', billed: '$1,560,000', costs: '$1,290,000', ar: '$210,000', over: '$88,000', under: '—', status: 'over' },
  ]
  return (
    <div className="bg-slate-50 text-slate-800 text-xs font-sans">
      {/* Top nav */}
      <div className="bg-white border-b border-slate-200 px-5 h-11 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-amber-400 rounded flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-sm" />
          </div>
          <span className="font-bold text-slate-900 text-xs">ReconcileBook</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">sarah@bookpro.com</span>
          <div className="w-6 h-6 bg-slate-800 rounded-full text-white flex items-center justify-center text-[9px] font-bold">SB</div>
        </div>
      </div>
      <div className="p-4">
        {/* Page header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-bold text-slate-900 text-sm">Client Dashboard</div>
            <div className="text-slate-400 text-[10px]">3 clients connected · 24 active jobs</div>
          </div>
          <div className="px-3 py-1.5 bg-amber-400 text-slate-900 font-bold rounded-lg text-[10px]">+ Connect Client</div>
        </div>
        {/* Portfolio bar */}
        <div className="bg-slate-900 rounded-xl p-3 mb-3">
          <div className="text-slate-400 text-[9px] font-semibold uppercase tracking-widest mb-2">Portfolio Overview</div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: 'Total Clients', value: '3' },
              { label: 'Contract Value', value: '$4,120,000' },
              { label: 'Billed to Date', value: '$2,882,000' },
              { label: 'Accounts Rec.', value: '$453,000' },
              { label: 'Net Position', value: '+$48,700' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-white font-bold text-xs">{s.value}</div>
                <div className="text-slate-500 text-[9px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Client cards */}
        <div className="space-y-2">
          {clients.map(c => (
            <div key={c.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center text-[10px]">🏢</div>
                  <div>
                    <div className="font-bold text-slate-900 text-[11px]">{c.name}</div>
                    <div className="text-emerald-600 text-[9px] font-medium">Connected · {c.jobs} jobs</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="px-2 py-1 bg-amber-400 text-slate-900 font-bold rounded text-[9px]">Job Costing</div>
                  <div className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[9px]">WIP</div>
                </div>
              </div>
              <div className="p-2.5">
                <div className="grid grid-cols-6 gap-1.5">
                  {[
                    { label: 'Contract Value', value: c.contract, color: 'bg-slate-50 text-slate-700' },
                    { label: 'Billed to Date', value: c.billed, color: 'bg-blue-50 text-blue-800' },
                    { label: 'Costs to Date', value: c.costs, color: 'bg-purple-50 text-purple-800' },
                    { label: 'Accounts Rec.', value: c.ar, color: 'bg-emerald-50 text-emerald-800' },
                    { label: 'Over Billings', value: c.over, color: c.over !== '—' ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-300' },
                    { label: 'Under Billings', value: c.under, color: c.under !== '—' ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-300' },
                  ].map(p => (
                    <div key={p.label} className={`rounded-lg px-2 py-1.5 ${p.color}`}>
                      <div className="font-bold text-[10px]">{p.value}</div>
                      <div className="text-[8px] opacity-60 mt-0.5">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WipMockup() {
  const rows = [
    { name: 'Riverside Office Complex', pct: 78, contract: '$480,000', billed: '$374,400', costs: '$281,000', over: '$0', under: '$0', margin: '23.4%', status: 'active' },
    { name: 'Highland Retail Center', pct: 45, contract: '$320,000', billed: '$144,000', costs: '$108,000', over: '—', under: '$36,000', margin: '18.9%', status: 'active' },
    { name: 'Downtown Parking Garage', pct: 92, contract: '$890,000', billed: '$818,800', costs: '$720,000', over: '$48,200', under: '—', margin: '19.1%', status: 'active' },
    { name: 'Sunset Townhomes Ph.2', pct: 31, contract: '$650,000', billed: '$201,500', costs: '$175,000', over: '—', under: '$22,500', margin: '21.2%', status: 'active' },
  ]
  return (
    <div className="bg-slate-50 text-xs">
      <div className="bg-white border-b border-slate-200 px-5 h-11 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[10px]">← Back</span>
          <span className="font-bold text-slate-900 text-xs">Apex Builders LLC</span>
          <span className="text-slate-400 text-[10px]">/ WIP Schedule</span>
        </div>
        <div className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-[10px] flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Download PDF
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="font-bold text-slate-900 text-sm">WIP Schedule</div>
          <div className="text-slate-400 text-[10px]">Apex Builders LLC · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        {/* Summary pills */}
        <div className="grid grid-cols-6 gap-2 mb-3">
          {[
            { label: 'Active Jobs', value: '4', color: 'bg-white border border-slate-200 text-slate-900' },
            { label: 'Contract Value', value: '$2,340,000', color: 'bg-white border border-slate-200 text-slate-900' },
            { label: 'Costs to Date', value: '$1,284,000', color: 'bg-white border border-slate-200 text-slate-900' },
            { label: 'Billed to Date', value: '$1,538,700', color: 'bg-white border border-slate-200 text-slate-900' },
            { label: 'Over Billings', value: '$48,200', color: 'bg-red-50 border border-red-200 text-red-800' },
            { label: 'Under Billings', value: '$58,500', color: 'bg-amber-50 border border-amber-200 text-amber-800' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-2.5 ${s.color}`}>
              <div className="font-bold text-[11px]">{s.value}</div>
              <div className="text-[8px] opacity-60 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Project</th>
                <th className="px-3 py-2 text-center font-semibold">% Complete</th>
                <th className="px-3 py-2 text-right font-semibold">Contract $</th>
                <th className="px-3 py-2 text-right font-semibold">Billed to Date</th>
                <th className="px-3 py-2 text-right font-semibold">Costs to Date</th>
                <th className="px-3 py-2 text-right font-semibold">Over Billing</th>
                <th className="px-3 py-2 text-right font-semibold">Under Billing</th>
                <th className="px-3 py-2 text-right font-semibold">Gross Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(r => (
                <tr key={r.name} className="hover:bg-slate-50">
                  <td className="px-3 py-2">
                    <div className="font-medium text-slate-900">{r.name}</div>
                    <div className="text-emerald-600 text-[8px] font-medium mt-0.5">Active</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-center font-bold text-slate-900">{r.pct}%</div>
                    <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                      <div className={`h-1 rounded-full ${r.pct >= 75 ? 'bg-blue-500' : r.pct >= 50 ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${r.pct}%` }} />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">{r.contract}</td>
                  <td className="px-3 py-2 text-right text-slate-700">{r.billed}</td>
                  <td className="px-3 py-2 text-right text-slate-700">{r.costs}</td>
                  <td className="px-3 py-2 text-right">
                    {r.over !== '—' ? <span className="text-red-600 font-semibold">{r.over}</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {r.under !== '—' ? <span className="text-amber-600 font-semibold">{r.under}</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-emerald-600">{r.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

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
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign in</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-0 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center pb-16">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
              Built for construction bookkeepers
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Construction bookkeeping,{' '}
              <span className="text-amber-400">built for the pros.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Manage job costing, WIP reports, and multi-client dashboards for all your construction contractor clients — directly from QuickBooks Online data.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login" className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-lg shadow-amber-400/20">
                Start free trial →
              </Link>
              <a href="#features" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-base rounded-xl transition-colors">
                See features
              </a>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-4 px-4 md:px-0">
            <BrowserMockup>
              <DashboardMockup />
            </BrowserMockup>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { value: '100%', label: 'QuickBooks native' },
              { value: 'Real-time', label: 'Job cost tracking' },
              { value: 'Instant', label: 'WIP schedule' },
              { value: 'PDF', label: 'One-click export' },
            ].map(s => (
              <div key={s.label} className="px-6 py-5">
                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">The full toolkit for construction bookkeepers</h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Stop building reports in spreadsheets. ReconcileBook pulls live data from QuickBooks and turns it into professional reports in seconds.</p>
          </div>

          {/* WIP report mockup */}
          <div className="mb-16 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2.5 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-slate-400 text-xs font-mono border border-slate-200">
                reconcilebook.com/clients/9341025/wip
              </div>
            </div>
            <WipMockup />
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
