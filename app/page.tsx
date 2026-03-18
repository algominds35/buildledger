'use client'

import Link from 'next/link'

function Check() {
  return (
    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function BrowserMockup({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
      <div className="bg-slate-100 px-4 py-3 flex items-center gap-3 border-b border-slate-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-slate-400 text-xs font-mono border border-slate-200">{url}</div>
      </div>
      {children}
    </div>
  )
}

function DashboardMockup() {
  const clients = [
    { name: 'Apex Builders LLC', jobs: 8, contract: '$1,240,000', billed: '$892,000', costs: '$710,000', ar: '$148,000', over: '$24,500', under: '—' },
    { name: 'Summit Contracting', jobs: 5, contract: '$780,000', billed: '$430,000', costs: '$380,000', ar: '$95,000', over: '—', under: '$61,200' },
    { name: 'Peak Construction Co.', jobs: 11, contract: '$2,100,000', billed: '$1,560,000', costs: '$1,290,000', ar: '$210,000', over: '$88,000', under: '—' },
  ]
  return (
    <div className="bg-slate-50 text-xs font-sans">
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
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-bold text-slate-900 text-sm">Client Dashboard</div>
            <div className="text-slate-400 text-[10px]">3 clients connected · 24 active jobs</div>
          </div>
          <div className="px-3 py-1.5 bg-amber-400 text-slate-900 font-bold rounded-lg text-[10px]">+ Connect Client</div>
        </div>
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
        <div className="space-y-2">
          {clients.map(c => (
            <div key={c.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-[11px]">{c.name}</div>
                  <div className="text-emerald-600 text-[9px] font-medium">Connected · {c.jobs} jobs</div>
                </div>
                <div className="flex gap-1.5">
                  <div className="px-2 py-1 bg-amber-400 text-slate-900 font-bold rounded text-[9px]">Job Costing</div>
                  <div className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[9px]">WIP</div>
                </div>
              </div>
              <div className="p-2.5 grid grid-cols-6 gap-1.5">
                {[
                  { label: 'Contract', value: c.contract, color: 'bg-slate-50 text-slate-700' },
                  { label: 'Billed', value: c.billed, color: 'bg-blue-50 text-blue-800' },
                  { label: 'Costs', value: c.costs, color: 'bg-purple-50 text-purple-800' },
                  { label: 'AR', value: c.ar, color: 'bg-emerald-50 text-emerald-800' },
                  { label: 'Over', value: c.over, color: c.over !== '—' ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-300' },
                  { label: 'Under', value: c.under, color: c.under !== '—' ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-300' },
                ].map(p => (
                  <div key={p.label} className={`rounded-lg px-2 py-1.5 ${p.color}`}>
                    <div className="font-bold text-[10px]">{p.value}</div>
                    <div className="text-[8px] opacity-60 mt-0.5">{p.label}</div>
                  </div>
                ))}
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
    { name: 'Riverside Office Complex', pct: 78, contract: '$480,000', billed: '$374,400', costs: '$281,000', over: '$48,200', under: '—', margin: '23.4%' },
    { name: 'Highland Retail Center', pct: 45, contract: '$320,000', billed: '$144,000', costs: '$108,000', over: '—', under: '$36,000', margin: '18.9%' },
    { name: 'Downtown Parking Garage', pct: 92, contract: '$890,000', billed: '$818,800', costs: '$720,000', over: '$22,400', under: '—', margin: '19.1%' },
  ]
  return (
    <div className="bg-white text-xs">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-sm">WIP Schedule</div>
          <div className="text-slate-400 text-[10px]">Apex Builders LLC · March 2026</div>
        </div>
        <div className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-[10px] flex items-center gap-1.5">
          ↓ Download PDF
        </div>
      </div>
      <div className="p-4 grid grid-cols-6 gap-2 border-b border-slate-100">
        {[
          { label: 'Active Jobs', value: '3', color: 'bg-slate-50' },
          { label: 'Contract Value', value: '$1,690,000', color: 'bg-slate-50' },
          { label: 'Costs to Date', value: '$1,109,000', color: 'bg-amber-50' },
          { label: 'Billed to Date', value: '$1,337,200', color: 'bg-blue-50' },
          { label: 'Over Billings', value: '$70,600', color: 'bg-red-50' },
          { label: 'Under Billings', value: '$36,000', color: 'bg-amber-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-2.5 ${s.color}`}>
            <div className="font-bold text-[11px] text-slate-900">{s.value}</div>
            <div className="text-[8px] text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Project</th>
              <th className="px-3 py-2 text-center">% Complete</th>
              <th className="px-3 py-2 text-right">Contract</th>
              <th className="px-3 py-2 text-right">Billed</th>
              <th className="px-3 py-2 text-right">Costs</th>
              <th className="px-3 py-2 text-right">Over Billing</th>
              <th className="px-3 py-2 text-right">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(r => (
              <tr key={r.name}>
                <td className="px-3 py-2 font-medium text-slate-900">{r.name}</td>
                <td className="px-3 py-2">
                  <div className="text-center font-bold text-slate-900">{r.pct}%</div>
                  <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                    <div className={`h-1 rounded-full ${r.pct >= 75 ? 'bg-blue-500' : 'bg-amber-400'}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </td>
                <td className="px-3 py-2 text-right text-slate-700">{r.contract}</td>
                <td className="px-3 py-2 text-right text-slate-700">{r.billed}</td>
                <td className="px-3 py-2 text-right text-slate-700">{r.costs}</td>
                <td className="px-3 py-2 text-right">{r.over !== '—' ? <span className="text-red-600 font-semibold">{r.over}</span> : <span className="text-slate-300">—</span>}</td>
                <td className="px-3 py-2 text-right font-semibold text-emerald-600">{r.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function JobCostMockup() {
  const rows = [
    { name: 'Riverside Office Complex', contract: '$480,000', budget: '$360,000', labor: '$98,000', materials: '$112,000', subs: '$71,000', total: '$281,000', status: 'On Track' },
    { name: 'Highland Retail Center', contract: '$320,000', budget: '$240,000', labor: '$42,000', materials: '$38,000', subs: '$28,000', total: '$108,000', status: 'Under' },
    { name: 'Downtown Parking Garage', contract: '$890,000', budget: '$640,000', labor: '$210,000', materials: '$280,000', subs: '$230,000', total: '$720,000', status: 'Over' },
  ]
  return (
    <div className="bg-white text-xs">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-sm">Job Costing Report</div>
          <div className="text-slate-400 text-[10px]">Apex Builders LLC · March 2026</div>
        </div>
        <div className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-[10px]">↓ Download PDF</div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-2 border-b border-slate-100">
        {[
          { label: 'Contract Value', value: '$1,690,000', color: 'bg-slate-50' },
          { label: 'Total Budget', value: '$1,240,000', color: 'bg-blue-50' },
          { label: 'Actual Cost', value: '$1,109,000', color: 'bg-amber-50' },
          { label: 'Variance', value: '+$131,000', color: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-2.5 ${s.color}`}>
            <div className="font-bold text-[11px] text-slate-900">{s.value}</div>
            <div className="text-[8px] text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Project</th>
              <th className="px-3 py-2 text-right">Contract</th>
              <th className="px-3 py-2 text-right">Labor</th>
              <th className="px-3 py-2 text-right">Materials</th>
              <th className="px-3 py-2 text-right">Subs</th>
              <th className="px-3 py-2 text-right">Total Cost</th>
              <th className="px-3 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(r => (
              <tr key={r.name}>
                <td className="px-3 py-2 font-medium text-slate-900">{r.name}</td>
                <td className="px-3 py-2 text-right text-slate-600">{r.contract}</td>
                <td className="px-3 py-2 text-right text-slate-600">{r.labor}</td>
                <td className="px-3 py-2 text-right text-slate-600">{r.materials}</td>
                <td className="px-3 py-2 text-right text-slate-600">{r.subs}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-900">{r.total}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${r.status === 'Over' ? 'bg-red-100 text-red-700' : r.status === 'Under' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
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
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                Built for construction bookkeepers
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
                WIP Reports.<br />
                Job Costing.<br />
                <span className="text-amber-400">Live from QuickBooks.</span>
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl">
                Connect your clients&apos; QuickBooks Online accounts and instantly generate professional WIP schedules, job costing reports, and over/under billing summaries. No spreadsheets. No manual entry.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/login" className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-lg shadow-amber-200">
                  Start free trial →
                </Link>
                <Link href="/pricing" className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-base rounded-xl transition-colors">
                  See pricing
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '$99/mo', label: 'Flat monthly price' },
                  { value: '$0', label: 'Setup fees' },
                  { value: '30 sec', label: 'Per WIP report' },
                ].map(s => (
                  <div key={s.label} className="border border-slate-100 rounded-xl p-4">
                    <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Core Workflows card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Core Workflows</div>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Connect a client\'s QuickBooks', desc: 'One-click OAuth. No CSV exports, no manual entry.', color: 'bg-amber-400' },
                  { step: '02', title: 'Pull live data automatically', desc: 'Customers, invoices, bills, and estimates — all synced instantly.', color: 'bg-amber-400' },
                  { step: '03', title: 'Generate WIP & Job Costing', desc: 'Cost-to-cost % complete, over/under billings, materials/labor/subs.', color: 'bg-amber-400' },
                  { step: '04', title: 'Download PDF for bonding', desc: 'Send to lenders, bonding agents, or clients in one click.', color: 'bg-amber-400' },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 items-start bg-white rounded-xl p-4 border border-slate-100">
                    <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-slate-900 text-xs font-extrabold">{s.step}</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{s.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-slate-100 py-5 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Works with</span>
          {['QuickBooks Online — All Plans', 'Simple Start', 'Essentials', 'Plus', 'Advanced'].map(name => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-slate-600 font-medium text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Live dashboard preview</p>
            <h2 className="text-3xl font-extrabold text-slate-900">All your contractor clients. One screen.</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Portfolio-level financials across every client — contract value, billings, costs, AR, and over/under billing — always live from QuickBooks.</p>
          </div>
          <BrowserMockup url="app.reconcilebook.com/dashboard">
            <DashboardMockup />
          </BrowserMockup>
        </div>
      </section>

      {/* FEATURE 1 — WIP */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">WIP Schedules</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                WIP schedule done in 30 seconds — not 3 hours.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Your contractor clients need WIP reports for bonding, lenders, and monthly close. ReconcileBook generates them automatically using the cost-to-cost method — live from QuickBooks, no spreadsheet required.
              </p>
              <div className="space-y-3">
                {[
                  '% Complete calculated automatically (cost-to-cost method)',
                  'Over/under billings per project',
                  'Retainage tracked separately — not buried in AR',
                  'Revenue earned vs. billed — the number banks require',
                  'Cost to complete and gross margin per job',
                  'Download PDF in one click — bonding agent ready',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <BrowserMockup url="app.reconcilebook.com/clients/apex/wip">
              <WipMockup />
            </BrowserMockup>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — JOB COSTING */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <BrowserMockup url="app.reconcilebook.com/clients/apex/job-costing">
              <JobCostMockup />
            </BrowserMockup>
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">Job Costing</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Budget vs. actual. Every job. Every category.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Your contractors need to know if a job is profitable — and why. ReconcileBook breaks down costs by materials, labor, and subcontractors for every active project, compared against the budget from QuickBooks estimates.
              </p>
              <div className="space-y-3">
                {[
                  'Materials, labor, and subcontractor costs — separately',
                  'Budget vs. actual variance per job',
                  'Over-budget alerts so you catch problems early',
                  'Pulled live from QBO bills, expenses, and purchases',
                  'Works on all QBO plans — no Projects feature required',
                  'Export to PDF — professional, client-ready format',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3 — QBO INTEGRATION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">QuickBooks Integration</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Connect any QBO account in under a minute.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                No CSV exports. No manual data entry. ReconcileBook uses secure OAuth to connect directly to your clients&apos; QuickBooks Online — and pulls live data every time you open a report.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Secure OAuth — no passwords stored',
                  'Works with all QBO plans (Simple Start, Essentials, Plus)',
                  'No Projects feature or add-ons required',
                  'No QuickBooks Time or other add-ons needed',
                  'Data is always current — no manual sync required',
                  'Unlimited contractor clients on one subscription',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">QuickBooks Online</div>
                    <div className="text-xs text-slate-400">Customers · Invoices · Bills · Estimates</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">CONNECTED</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">What ReconcileBook pulls</div>
                {[
                  { label: 'Customers & sub-customers (jobs)', icon: '👥' },
                  { label: 'Invoices (contract value & billing)', icon: '📄' },
                  { label: 'Estimates (budget & % complete)', icon: '📊' },
                  { label: 'Bills & purchases (costs by job)', icon: '💰' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                    <svg className="w-4 h-4 text-emerald-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium">
                Reports update live from QBO — no manual sync, no caching.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — vs Excel */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">ReconcileBook vs. Manual</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Stop doing this in a spreadsheet.</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-900 text-white text-sm font-bold">
              <div className="px-6 py-4 text-slate-400">Feature</div>
              <div className="px-6 py-4 text-amber-400 text-center">ReconcileBook</div>
              <div className="px-6 py-4 text-center text-slate-400">Excel / Manual</div>
            </div>
            {[
              { feature: 'WIP schedule generation', us: 'Automatic — 30 seconds', them: '2–4 hours per month' },
              { feature: 'Job costing by category', us: 'Live from QBO', them: 'Manual export + pivot table' },
              { feature: 'Over/under billing calculation', us: 'Auto cost-to-cost method', them: 'Manual formula, error-prone' },
              { feature: 'Retainage tracking', us: 'Per job, built into WIP', them: 'Separate spreadsheet tab' },
              { feature: 'Multiple clients', us: 'Unlimited, one dashboard', them: 'One file per client' },
              { feature: 'PDF export', us: 'One click, professional', them: 'Format manually every month' },
              { feature: 'Data accuracy', us: 'Always current from QBO', them: 'Only as good as last export' },
              { feature: 'QuickBooks required add-ons', us: 'None — any QBO plan works', them: 'N/A' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-6 py-4 text-slate-700 font-medium">{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {row.us}
                  </span>
                </div>
                <div className="px-6 py-4 text-center text-slate-400">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Simple setup</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Up and running in 5 minutes.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up with your email. No credit card required to start your trial.' },
              { step: '02', title: 'Connect a client\'s QBO', desc: 'Click "Connect Client" and authorize their QuickBooks account via secure OAuth.' },
              { step: '03', title: 'Pull live data', desc: 'ReconcileBook instantly fetches all customers, invoices, bills, and estimates from QBO.' },
              { step: '04', title: 'Generate and download', desc: 'Open job costing or WIP. Download PDF. Send to your client in seconds.' },
            ].map((s, i) => (
              <div key={s.step} className="bg-white rounded-2xl p-7 border border-slate-200 relative">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-slate-900 font-extrabold text-sm">{s.step}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 -right-3 z-10 text-slate-300 text-xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">What bookkeepers say</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Finally built for construction bookkeepers.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used to spend 3 hours every month building WIP schedules in Excel. ReconcileBook does it in 30 seconds — I just connect QuickBooks and the report is there.",
                name: 'Sarah M.',
                title: 'CPA · 12 construction clients',
              },
              {
                quote: "My clients needed WIP reports for bonding and I was manually calculating over/under billings every month. This completely replaced that process. Worth every penny.",
                name: 'James T.',
                title: 'Bookkeeper · Specializes in GCs',
              },
              {
                quote: "The job costing breakdown by materials, labor, and subs is exactly what my contractors ask for. I can't believe I was doing this manually before.",
                name: 'Maria R.',
                title: 'QuickBooks ProAdvisor',
              },
            ].map(t => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Simple, transparent pricing.</h2>
            <p className="text-slate-500 mt-3">No per-client fees. No module charges. No annual contracts.</p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-6xl font-extrabold text-slate-900">$99</span>
              <span className="text-slate-400 text-lg mb-3">/month</span>
            </div>
            <p className="text-slate-500 text-sm mb-8">Cancel anytime. No contracts. No setup fees.</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'Unlimited contractor clients',
                'Job Costing reports — live from QBO',
                'WIP Schedule — cost-to-cost method',
                'Multi-client dashboard',
                'Over/under billing tracking',
                'Retainage tracking',
                'One-click PDF export',
                'QuickBooks Online integration',
                'All QBO plans supported',
                'Priority support',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/login" className="block w-full text-center py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-base">
              Start free trial — $99/month →
            </Link>
            <p className="text-center text-slate-400 text-xs mt-3">Billed monthly · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Stop doing WIP reports manually.
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Connect QuickBooks. Generate reports in seconds. Send to clients, lenders, and bonding agents.
          </p>
          <Link href="/login" className="inline-block px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-xl">
            Start free trial →
          </Link>
          <p className="text-slate-600 text-xs mt-4">No credit card required · Set up in under 5 minutes</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <span className="text-white font-bold">ReconcileBook</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">Job costing, WIP reports, and multi-client management for construction bookkeepers.</p>
            </div>
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Product</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                  <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Support</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="mailto:alex@reconcilebookapp.com" className="hover:text-white transition-colors">Contact</a>
                  <a href="mailto:alex@reconcilebookapp.com" className="hover:text-white transition-colors">alex@reconcilebookapp.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-slate-600 text-sm text-center">© {new Date().getFullYear()} ReconcileBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
