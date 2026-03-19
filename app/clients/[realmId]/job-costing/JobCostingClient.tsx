'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { JobCostData } from '@/app/api/qbo/job-costing/route'
import { usePdfExport } from '@/lib/usePdfExport'

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
  const { exportPdf, exporting, error: pdfError, clearError: clearPdfError } = usePdfExport()

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
    <div className="min-h-screen bg-slate-50 print:min-h-0 print:bg-white">
      {pdfError && (
        <div className="fixed top-4 right-4 z-50 max-w-sm bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl shadow-lg flex items-start gap-3">
          <span className="flex-1">{pdfError}</span>
          <button type="button" onClick={clearPdfError} className="text-red-500 hover:text-red-700 font-medium" aria-label="Dismiss">×</button>
        </div>
      )}
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
          <button
            onClick={() => { clearPdfError(); exportPdf('job-costing-report', `job-costing-${company.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0,10)}.pdf`); }}
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
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 print:py-4 print:px-4">
      <div id="job-costing-report">
        {/* Report header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Job Costing Report</h1>
          <p className="text-slate-500 text-sm mt-1">
            {company} · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {jobs.length > 0 && (
              <span className="text-slate-400"> · {jobs.length} project{jobs.length !== 1 ? 's' : ''} — totals include all rows below</span>
            )}
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
            </div>
            <div className="text-xl font-bold text-slate-900">{fmt(totalContract)}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total Contract Value</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
            </div>
            <div className="text-xl font-bold text-blue-600">{fmt(totalBudget)}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total Budget</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>
            </div>
            <div className="text-xl font-bold text-slate-900">{fmt(totalCost)}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total Actual Cost</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${totalVariance >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <svg className={`w-4 h-4 ${totalVariance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={totalVariance >= 0 ? "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"} /></svg>
            </div>
            <div className={`text-xl font-bold ${totalVariance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(totalVariance)}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total Variance</div>
          </div>
        </div>

        {overBudget > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
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
                  <th className="px-4 py-3 print:hidden"></th>
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
                        {job.status === 'over-budget' ? 'Over' : job.status === 'under-budget' ? 'Under' : 'On Track'}
                      </span>
                    </td>
                    <td className="px-4 py-3 print:hidden">
                      <button type="button" onClick={() => setSelected(selected?.id === job.id ? null : job)} className="text-xs text-amber-600 hover:underline font-medium">
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
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 print:hidden"></td>
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
      </div>
      </main>
    </div>
  )
}
