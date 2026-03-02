'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

interface QboConnection {
  id: string
  realm_id: string
  company_name: string
  created_at: string
}

interface ClientSummary {
  realmId: string
  company: string
  activeJobs: number
  totalContract: number
  totalBilled: number
  totalCosts: number
  totalAR: number
  totalAP: number
  overBillings: number
  underBillings: number
  openInvoices: number
  openBills: number
  loading: boolean
  error?: string
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`rounded-lg px-3 py-2 ${color}`}>
      <div className="text-xs font-medium opacity-70 mb-0.5">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  )
}

function ClientCard({ summary, userId, onDisconnect }: {
  summary: ClientSummary
  userId: string
  onDisconnect: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-300 transition-colors">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">🏢</div>
          <div>
            <h3 className="font-bold text-slate-900">{summary.company}</h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Connected · {summary.activeJobs} jobs
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/clients/${summary.realmId}/job-costing`}
            className="px-3 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg transition-colors">
            📊 Job Costing
          </a>
          <a href={`/clients/${summary.realmId}/wip`}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-700 text-white rounded-lg transition-colors">
            🏗️ WIP
          </a>
          <a href={`/clients/${summary.realmId}`}
            className="px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:border-slate-400 text-slate-600 rounded-lg transition-colors">
            Data →
          </a>
        </div>
      </div>

      {/* Metrics */}
      {summary.loading ? (
        <div className="px-6 py-6 flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          Loading financials…
        </div>
      ) : summary.error ? (
        <div className="px-6 py-4 text-sm text-red-500">{summary.error}</div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <StatPill label="Contract Value" value={fmt(summary.totalContract)} color="bg-slate-50 text-slate-800" />
            <StatPill label="Billed to Date" value={fmt(summary.totalBilled)} color="bg-blue-50 text-blue-800" />
            <StatPill label="Costs to Date" value={fmt(summary.totalCosts)} color="bg-purple-50 text-purple-800" />
            <StatPill label="Accounts Rec." value={fmt(summary.totalAR)} color="bg-emerald-50 text-emerald-800" />
            <StatPill
              label="Over Billings"
              value={summary.overBillings > 0 ? fmt(summary.overBillings) : '—'}
              color={summary.overBillings > 0 ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-400'}
            />
            <StatPill
              label="Under Billings"
              value={summary.underBillings > 0 ? fmt(summary.underBillings) : '—'}
              color={summary.underBillings > 0 ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-400'}
            />
          </div>

          {/* Alerts */}
          {(summary.openInvoices > 0 || summary.openBills > 0) && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {summary.openInvoices > 0 && (
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-lg font-medium">
                  {summary.openInvoices} open invoice{summary.openInvoices > 1 ? 's' : ''} · {fmt(summary.totalAR)} outstanding
                </span>
              )}
              {summary.openBills > 0 && (
                <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-1 rounded-lg font-medium">
                  {summary.openBills} unpaid bill{summary.openBills > 1 ? 's' : ''} · {fmt(summary.totalAP)} owed
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button onClick={onDisconnect} className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors">
          Disconnect
        </button>
      </div>
    </div>
  )
}

export default function DashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<User | null>(null)
  const [connections, setConnections] = useState<QboConnection[]>([])
  const [summaries, setSummaries] = useState<Record<string, ClientSummary>>({})
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      fetchConnections(session.user.id)
    })
  }, [router])

  useEffect(() => {
    if (searchParams.get('connected') === '1') {
      setToast('QuickBooks account connected!')
      setTimeout(() => setToast(null), 4000)
    }
  }, [searchParams])

  async function fetchConnections(uid: string) {
    const { data } = await supabase
      .from('qbo_connections')
      .select('id, realm_id, company_name, created_at')
      .order('created_at', { ascending: false })
    setConnections(data ?? [])
    setLoading(false)

    // Load summaries for each client
    for (const conn of data ?? []) {
      setSummaries(prev => ({
        ...prev,
        [conn.realm_id]: { realmId: conn.realm_id, company: conn.company_name, activeJobs: 0, totalContract: 0, totalBilled: 0, totalCosts: 0, totalAR: 0, totalAP: 0, overBillings: 0, underBillings: 0, openInvoices: 0, openBills: 0, loading: true }
      }))
      fetch(`/api/qbo/summary?realmId=${conn.realm_id}&userId=${uid}`)
        .then(r => r.json())
        .then(json => {
          setSummaries(prev => ({ ...prev, [conn.realm_id]: { ...json, loading: false } }))
        })
        .catch(() => {
          setSummaries(prev => ({ ...prev, [conn.realm_id]: { ...prev[conn.realm_id], loading: false, error: 'Failed to load' } }))
        })
    }
  }

  async function handleDisconnect(realmId: string, name: string) {
    if (!confirm(`Disconnect ${name}?`)) return
    await supabase.from('qbo_connections').delete().eq('realm_id', realmId)
    setConnections(prev => prev.filter(c => c.realm_id !== realmId))
    setToast(`${name} disconnected.`)
    setTimeout(() => setToast(null), 3000)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading…</div>
    </div>
  )

  // Aggregate totals across all clients
  const allSummaries = Object.values(summaries).filter(s => !s.loading && !s.error)
  const aggContract = allSummaries.reduce((s, c) => s + c.totalContract, 0)
  const aggBilled = allSummaries.reduce((s, c) => s + c.totalBilled, 0)
  const aggAR = allSummaries.reduce((s, c) => s + c.totalAR, 0)
  const aggOver = allSummaries.reduce((s, c) => s + c.overBillings, 0)
  const aggUnder = allSummaries.reduce((s, c) => s + c.underBillings, 0)
  const totalJobs = allSummaries.reduce((s, c) => s + c.activeJobs, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Nav */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">BuildLedger</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
              {user?.email?.slice(0, 2).toUpperCase() ?? 'BK'}
            </div>
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
              className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Client Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {connections.length} client{connections.length !== 1 ? 's' : ''} connected · {totalJobs} active jobs
            </p>
          </div>
          <a href={`/api/qbo/connect?userId=${user?.id}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Connect Client
          </a>
        </div>

        {/* Portfolio summary */}
        {connections.length > 0 && (
          <div className="bg-slate-900 rounded-2xl p-6 mb-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Portfolio Overview</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Clients', value: connections.length.toString(), sub: 'connected' },
                { label: 'Contract Value', value: fmt(aggContract), sub: 'all clients' },
                { label: 'Billed to Date', value: fmt(aggBilled), sub: 'all clients' },
                { label: 'Accounts Rec.', value: fmt(aggAR), sub: 'outstanding' },
                { label: 'Net Billings Position', value: aggOver > aggUnder ? `-${fmt(aggOver - aggUnder)}` : `+${fmt(aggUnder - aggOver)}`, sub: aggOver > aggUnder ? 'over-billed' : 'under-billed' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                  <div className="text-xs text-slate-600">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts row */}
        {(aggOver > 0 || aggUnder > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {aggOver > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-red-500">⬆️</span>
                <div>
                  <p className="text-red-800 text-sm font-semibold">Over-Billings: {fmt(aggOver)}</p>
                  <p className="text-red-600 text-xs">Billed more than earned — liability on balance sheet</p>
                </div>
              </div>
            )}
            {aggUnder > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-amber-500">⬇️</span>
                <div>
                  <p className="text-amber-800 text-sm font-semibold">Under-Billings: {fmt(aggUnder)}</p>
                  <p className="text-amber-600 text-xs">Earned more than billed — asset on balance sheet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Client cards */}
        {connections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🏢</div>
            <h3 className="text-slate-900 font-semibold text-lg mb-2">No clients connected yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Click &quot;Connect Client&quot; to authorize a contractor&apos;s QuickBooks Online account.
            </p>
            <a href={`/api/qbo/connect?userId=${user?.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
              Connect First Client
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map(conn => (
              <ClientCard
                key={conn.realm_id}
                summary={summaries[conn.realm_id] ?? { realmId: conn.realm_id, company: conn.company_name, activeJobs: 0, totalContract: 0, totalBilled: 0, totalCosts: 0, totalAR: 0, totalAP: 0, overBillings: 0, underBillings: 0, openInvoices: 0, openBills: 0, loading: true }}
                userId={user?.id ?? ''}
                onDisconnect={() => handleDisconnect(conn.realm_id, conn.company_name)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
