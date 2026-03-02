'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { JobCostData } from '@/app/api/qbo/job-costing/route'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`

export default function JobCostingClient({ realmId }: { realmId: string }) {
  const router = useRouter()
  const [jobs, setJobs] = useState<JobCostData[]>([])
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<JobCostData | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      try {
        const res = await fetch(`/api/qbo/job-costing?realmId=${realmId}&userId=${session.user.id}`)
        const json = await res.json()
        if (!res.ok) { setError(json.error); setLoading(false); return }
        setJobs(json.jobs)
        setCompany(json.company)
      } catch {
        setError('Failed to load job costing data')
      } finally {
        setLoading(false)
      }
    })
  }, [realmId, router])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-500 text-sm">Building job cost report…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 font-medium mb-3">{error}</p>
        <Link href="/dashboard" className="text-sm text-amber-600 hover:underline">← Back</Link>
      </div>
    </div>
  )

  const totalContract = jobs.reduce((s, j) => s + j.contractAmount, 0)
  const totalCost = jobs.reduce((s, j) => s + j.costs.total, 0)
  const totalBudget = jobs.reduce((s, j) => s + j.budgetTotal, 0)
  const totalVariance = totalBudget - totalCost
  const overBudget = jobs.filter(j => j.status === 'over-budget').length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/clients/${realmId}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">{company}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 text-sm">Job Costing Report</span>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>
            Print / Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Report header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Job Costing Report</h1>
          <p className="text-slate-500 text-sm mt-1">{company} · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Contract Value', value: fmt(totalContract), icon: '📋', color: 'text-slate-900' },
            { label: 'Total Budget', value: fmt(totalBudget), icon: '🎯', color: 'text-blue-600' },
            { label: 'Total Actual Cost', value: fmt(totalCost), icon: '💰', color: 'text-slate-900' },
            { label: 'Total Variance', value: fmt(totalVariance), icon: totalVariance >= 0 ? '✅' : '⚠️', color: totalVariance >= 0 ? 'text-emerald-600' : 'text-red-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {overBudget > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <span className="text-red-500 text-lg">⚠️</span>
            <p className="text-red-700 text-sm font-medium">{overBudget} project{overBudget > 1 ? 's are' : ' is'} over budget — review cost allocations</p>
          </div>
        )}

        {/* Jobs table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Project Cost Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Project</th>
                  <th className="px-4 py-3 text-right">Contract</th>
                  <th className="px-4 py-3 text-right">Budget</th>
                  <th className="px-4 py-3 text-right">Materials</th>
                  <th className="px-4 py-3 text-right">Labor</th>
                  <th className="px-4 py-3 text-right">Subs</th>
                  <th className="px-4 py-3 text-right">Other</th>
                  <th className="px-4 py-3 text-right">Total Cost</th>
                  <th className="px-4 py-3 text-right">Variance</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900 max-w-[180px] truncate">{job.name}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(job.contractAmount)}</td>
                    <td className="px-4 py-3 text-right text-blue-600">{fmt(job.budgetTotal)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(job.costs.materials)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(job.costs.labor)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(job.costs.subcontractors)}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{fmt(job.costs.other)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">{fmt(job.costs.total)}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${job.variance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {fmt(job.variance)}<br />
                      <span className="text-xs font-normal">{pct(job.variancePct)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.status === 'over-budget' ? 'bg-red-100 text-red-700' :
                        job.status === 'under-budget' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {job.status === 'over-budget' ? '⚠ Over' : job.status === 'under-budget' ? '✓ Under' : '● On Track'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(selected?.id === job.id ? null : job)} className="text-xs text-amber-600 hover:underline font-medium">
                        {selected?.id === job.id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="bg-slate-50 font-semibold">
                  <td className="px-4 py-3 text-slate-900">TOTAL</td>
                  <td className="px-4 py-3 text-right">{fmt(totalContract)}</td>
                  <td className="px-4 py-3 text-right text-blue-600">{fmt(totalBudget)}</td>
                  <td className="px-4 py-3 text-right">{fmt(jobs.reduce((s, j) => s + j.costs.materials, 0))}</td>
                  <td className="px-4 py-3 text-right">{fmt(jobs.reduce((s, j) => s + j.costs.labor, 0))}</td>
                  <td className="px-4 py-3 text-right">{fmt(jobs.reduce((s, j) => s + j.costs.subcontractors, 0))}</td>
                  <td className="px-4 py-3 text-right">{fmt(jobs.reduce((s, j) => s + j.costs.other, 0))}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{fmt(totalCost)}</td>
                  <td className={`px-4 py-3 text-right ${totalVariance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(totalVariance)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail breakdown panel */}
        {selected && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-slate-900 text-lg mb-4">Cost Breakdown — {selected.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Materials', value: selected.costs.materials, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                { label: 'Labor', value: selected.costs.labor, color: 'bg-purple-50 border-purple-200 text-purple-700' },
                { label: 'Subcontractors', value: selected.costs.subcontractors, color: 'bg-orange-50 border-orange-200 text-orange-700' },
                { label: 'Other', value: selected.costs.other, color: 'bg-slate-50 border-slate-200 text-slate-700' },
              ].map(cat => (
                <div key={cat.label} className={`rounded-xl border p-4 ${cat.color}`}>
                  <div className="text-xl font-bold">{fmt(cat.value)}</div>
                  <div className="text-sm font-medium mt-0.5">{cat.label}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {selected.costs.total > 0 ? ((cat.value / selected.costs.total) * 100).toFixed(1) : '0'}% of total
                  </div>
                </div>
              ))}
            </div>
            {/* Budget vs actual bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Actual Cost vs Budget</span>
                <span>{fmt(selected.costs.total)} / {fmt(selected.budgetTotal)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${selected.status === 'over-budget' ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min((selected.costs.total / (selected.budgetTotal || 1)) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-slate-400">0</span>
                <span className={`font-medium ${selected.status === 'over-budget' ? 'text-red-600' : 'text-emerald-600'}`}>
                  {((selected.costs.total / (selected.budgetTotal || 1)) * 100).toFixed(1)}% used
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
