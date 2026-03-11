'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { WipRow } from '@/app/api/qbo/wip/route'
import { usePdfExport } from '@/lib/usePdfExport'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const pct = (n: number) => `${n.toFixed(1)}%`

function PctBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}

export default function WipClient({ realmId }: { realmId: string }) {
  const router = useRouter()
  const [wip, setWip] = useState<WipRow[]>([])
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'complete'>('active')
  const { exportPdf, exporting } = usePdfExport()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      try {
        const res = await fetch(`/api/qbo/wip?realmId=${realmId}&userId=${session.user.id}`)
        const json = await res.json()
        if (!res.ok) { setError(json.error); setLoading(false); return }
        setWip(json.wip)
        setCompany(json.company)
      } catch {
        setError('Failed to load WIP data')
      } finally {
        setLoading(false)
      }
    })
  }, [realmId, router])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-500 text-sm">Building WIP schedule…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <Link href="/dashboard" className="text-sm text-amber-600 hover:underline">← Back</Link>
      </div>
    </div>
  )

  const filtered = wip.filter(r => filter === 'all' ? true : r.status === filter)
  const active = wip.filter(r => r.status === 'active')

  const totalContract = filtered.reduce((s, r) => s + r.contractAmount, 0)
  const totalCosts = filtered.reduce((s, r) => s + r.costsToDate, 0)
  const totalBilled = filtered.reduce((s, r) => s + r.billedToDate, 0)
  const totalOver = filtered.reduce((s, r) => s + r.overBilling, 0)
  const totalUnder = filtered.reduce((s, r) => s + r.underBilling, 0)
  const totalRetainage = filtered.reduce((s, r) => s + r.retainage, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/clients/${realmId}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">{company}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 text-sm">WIP Schedule</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/clients/${realmId}/job-costing`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              Job Costing
            </Link>
            <button
              onClick={() => exportPdf('wip-report', `wip-schedule-${company.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0,10)}.pdf`)}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 disabled:opacity-60 transition-colors"
            >
              {exporting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating…</>
              ) : (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg> Download PDF</>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
      <div id="wip-report">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">WIP Schedule</h1>
          <p className="text-slate-500 text-sm mt-1">{company} · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Active Jobs', value: active.length.toString(), bg: 'bg-slate-100', iconColor: 'text-slate-600', color: 'text-slate-900', path: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z' },
            { label: 'Contract Value', value: fmt(totalContract), bg: 'bg-slate-100', iconColor: 'text-slate-600', color: 'text-slate-900', path: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z' },
            { label: 'Costs to Date', value: fmt(totalCosts), bg: 'bg-amber-50', iconColor: 'text-amber-600', color: 'text-slate-900', path: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75' },
            { label: 'Billed to Date', value: fmt(totalBilled), bg: 'bg-blue-50', iconColor: 'text-blue-600', color: 'text-slate-900', path: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
            { label: 'Over Billings', value: fmt(totalOver), bg: totalOver > 0 ? 'bg-red-50' : 'bg-slate-50', iconColor: totalOver > 0 ? 'text-red-500' : 'text-slate-400', color: totalOver > 0 ? 'text-red-600' : 'text-slate-400', path: 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' },
            { label: 'Under Billings', value: fmt(totalUnder), bg: totalUnder > 0 ? 'bg-amber-50' : 'bg-slate-50', iconColor: totalUnder > 0 ? 'text-amber-600' : 'text-slate-400', color: totalUnder > 0 ? 'text-amber-600' : 'text-slate-400', path: 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
                <svg className={`w-3.5 h-3.5 ${s.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={s.path} /></svg>
              </div>
              <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Retainage callout */}
        {totalRetainage > 0 && (
          <div className="mb-5 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <p className="text-blue-700 text-sm font-medium">
              Total retainage held: <strong>{fmt(totalRetainage)}</strong> — confirm release schedule with clients
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 print:hidden">
          {(['active', 'all', 'complete'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {f === 'active' ? `🏗️ Active (${active.length})` : f === 'complete' ? `✓ Complete` : 'All Jobs'}
            </button>
          ))}
        </div>

        {/* WIP Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left sticky left-0 bg-slate-50">Project</th>
                  <th className="px-4 py-3 text-right">Contract $</th>
                  <th className="px-4 py-3 text-right">Est. Costs</th>
                  <th className="px-4 py-3 text-center min-w-[120px]">% Complete</th>
                  <th className="px-4 py-3 text-right">Rev. Earned</th>
                  <th className="px-4 py-3 text-right">Billed to Date</th>
                  <th className="px-4 py-3 text-right">Costs to Date</th>
                  <th className="px-4 py-3 text-right">Over Billing</th>
                  <th className="px-4 py-3 text-right">Under Billing</th>
                  <th className="px-4 py-3 text-right">Retainage</th>
                  <th className="px-4 py-3 text-right">Cost to Complete</th>
                  <th className="px-4 py-3 text-right">Gross Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 sticky left-0 bg-white">
                      <div className="font-medium text-slate-900 max-w-[160px] truncate">{row.name}</div>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        row.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                        row.status === 'complete' ? 'bg-blue-50 text-blue-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {row.status === 'active' ? 'Active' : row.status === 'complete' ? 'Complete' : 'Not Started'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">{fmt(row.contractAmount)}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{fmt(row.estimatedCosts)}</td>
                    <td className="px-4 py-3">
                      <div className="text-center font-semibold text-slate-900">{pct(row.pctComplete)}</div>
                      <PctBar
                        value={row.pctComplete}
                        color={row.pctComplete >= 100 ? 'bg-blue-500' : row.pctComplete >= 50 ? 'bg-emerald-500' : 'bg-amber-400'}
                      />
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">{fmt(row.earnedRevenue)}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{fmt(row.billedToDate)}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{fmt(row.costsToDate)}</td>
                    <td className="px-4 py-3 text-right">
                      {row.overBilling > 0
                        ? <span className="text-red-600 font-semibold">{fmt(row.overBilling)}</span>
                        : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.underBilling > 0
                        ? <span className="text-amber-600 font-semibold">{fmt(row.underBilling)}</span>
                        : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-blue-600 font-medium">{fmt(row.retainage)}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{fmt(row.costToComplete)}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${row.grossMarginPct >= 20 ? 'text-emerald-600' : row.grossMarginPct >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                      {pct(row.grossMarginPct)}
                    </td>
                  </tr>
                ))}
                {/* Totals */}
                <tr className="bg-slate-50 font-semibold text-sm border-t-2 border-slate-300">
                  <td className="px-4 py-3 sticky left-0 bg-slate-50">TOTAL</td>
                  <td className="px-4 py-3 text-right">{fmt(totalContract)}</td>
                  <td className="px-4 py-3 text-right">{fmt(filtered.reduce((s, r) => s + r.estimatedCosts, 0))}</td>
                  <td className="px-4 py-3 text-center">
                    {totalContract > 0 ? pct(filtered.reduce((s, r) => s + r.earnedRevenue, 0) / totalContract * 100) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">{fmt(filtered.reduce((s, r) => s + r.earnedRevenue, 0))}</td>
                  <td className="px-4 py-3 text-right">{fmt(totalBilled)}</td>
                  <td className="px-4 py-3 text-right">{fmt(totalCosts)}</td>
                  <td className="px-4 py-3 text-right text-red-600">{totalOver > 0 ? fmt(totalOver) : '—'}</td>
                  <td className="px-4 py-3 text-right text-amber-600">{totalUnder > 0 ? fmt(totalUnder) : '—'}</td>
                  <td className="px-4 py-3 text-right text-blue-600">{fmt(totalRetainage)}</td>
                  <td className="px-4 py-3 text-right">{fmt(filtered.reduce((s, r) => s + r.costToComplete, 0))}</td>
                  <td className="px-4 py-3 text-right">
                    {(() => {
                      const earned = filtered.reduce((s, r) => s + r.earnedRevenue, 0)
                      const gp = filtered.reduce((s, r) => s + r.grossProfit, 0)
                      return earned > 0 ? <span className={gp >= 0 ? 'text-emerald-600' : 'text-red-600'}>{pct(gp / earned * 100)}</span> : '—'
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">WIP Schedule Definitions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-600">
            {[
              { term: '% Complete', def: 'Costs to Date ÷ Estimated Total Costs (cost-to-cost method)' },
              { term: 'Revenue Earned', def: 'Contract Amount × % Complete' },
              { term: 'Over Billing', def: 'Billed to Date exceeds Revenue Earned — liability on balance sheet' },
              { term: 'Under Billing', def: 'Revenue Earned exceeds Billed to Date — asset on balance sheet' },
              { term: 'Retainage', def: 'Amount held by owner until project completion (typically 10%)' },
              { term: 'Cost to Complete', def: 'Estimated Total Costs minus Costs to Date' },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-2">
                <span className="font-semibold text-slate-800 min-w-fit">{term}:</span>
                <span>{def}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}
