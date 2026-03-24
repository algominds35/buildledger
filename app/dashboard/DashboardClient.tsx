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

interface QboConnection { id: string; realm_id: string; company_name: string; created_at: string }
interface Subscription { status: string; trial_end: string | null; current_period_end: string | null }
interface ClientSummary {
  realmId: string; company: string; activeJobs: number; totalContract: number
  totalBilled: number; totalCosts: number; totalAR: number; totalAP: number
  overBillings: number; underBillings: number; openInvoices: number; openBills: number
  loading: boolean; error?: string
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`rounded-lg px-3 py-2 ${color}`}>
      <div className="text-xs font-medium opacity-70 mb-0.5">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  )
}


function ClientCard({ summary, onDisconnect }: { summary: ClientSummary; onDisconnect: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-300 transition-colors">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{summary.company}</h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Connected · {summary.activeJobs} jobs
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/clients/${summary.realmId}/job-costing`} className="px-3 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg transition-colors">
            Job Costing
          </a>
          <a href={`/clients/${summary.realmId}/wip`} className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-700 text-white rounded-lg transition-colors">
            WIP
          </a>
          <a href={`/clients/${summary.realmId}`} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:border-slate-400 text-slate-600 rounded-lg transition-colors">
            Data →
          </a>
        </div>
      </div>

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
            <StatPill label="Over Billings" value={summary.overBillings > 0 ? fmt(summary.overBillings) : '—'} color={summary.overBillings > 0 ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-400'} />
            <StatPill label="Under Billings" value={summary.underBillings > 0 ? fmt(summary.underBillings) : '—'} color={summary.underBillings > 0 ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-400'} />
          </div>
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

      <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button onClick={onDisconnect} className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors">Disconnect</button>
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
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const [billingLoading, setBillingLoading] = useState(false)

  useEffect(() => {
    // getSession first (instant, reads localStorage)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        fetchAll(session.user.id)
        return
      }
      // No session yet — wait for auth state to settle (handles post-signup redirect)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
        subscription.unsubscribe()
        if (!newSession) { router.push('/login'); return }
        setUser(newSession.user)
        fetchAll(newSession.user.id)
      })
      // Safety timeout — if no auth event fires in 3s, send to login
      setTimeout(() => { subscription.unsubscribe(); router.push('/login') }, 3000)
    })
  }, [router])

  useEffect(() => {
    if (searchParams.get('connected') === '1') { setToast('QuickBooks account connected!'); setTimeout(() => setToast(null), 4000) }
    if (searchParams.get('subscribed') === '1') { setToast('Subscription active — welcome to ReconcileBook!'); setTimeout(() => setToast(null), 5000) }
  }, [searchParams])

  async function fetchAll(uid: string) {
    const [connRes, subRes] = await Promise.all([
      supabase.from('qbo_connections').select('id,realm_id,company_name,created_at').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('status,trial_end,current_period_end').eq('user_id', uid).single(),
    ])

    const conns = connRes.data ?? []
    setConnections(conns)

    if (subRes.data) {
      setSubscription(subRes.data)
    } else {
      // New user — auto-create a 14-day free trial (no credit card required)
      const trialEnd = new Date()
      trialEnd.setDate(trialEnd.getDate() + 14)
      const trialEndISO = trialEnd.toISOString()
      await supabase.from('subscriptions').upsert({
        user_id: uid,
        status: 'trialing',
        trial_end: trialEndISO,
        stripe_customer_id: null,
        stripe_subscription_id: null,
        current_period_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      setSubscription({ status: 'trialing', trial_end: trialEndISO, current_period_end: null })
    }

    setLoading(false)

    for (const conn of conns) {
      setSummaries(prev => ({ ...prev, [conn.realm_id]: { realmId: conn.realm_id, company: conn.company_name, activeJobs: 0, totalContract: 0, totalBilled: 0, totalCosts: 0, totalAR: 0, totalAP: 0, overBillings: 0, underBillings: 0, openInvoices: 0, openBills: 0, loading: true } }))
      fetch(`/api/qbo/summary?realmId=${conn.realm_id}&userId=${uid}`)
        .then(r => r.json())
        .then(json => setSummaries(prev => ({ ...prev, [conn.realm_id]: { ...json, loading: false } })))
        .catch(() => setSummaries(prev => ({ ...prev, [conn.realm_id]: { ...prev[conn.realm_id], loading: false, error: 'Failed to load' } })))
    }
  }

  async function handleDisconnect(realmId: string, name: string) {
    if (!confirm(`Disconnect ${name}?`)) return
    await supabase.from('qbo_connections').delete().eq('realm_id', realmId)
    setConnections(prev => prev.filter(c => c.realm_id !== realmId))
    setToast(`${name} disconnected.`)
    setTimeout(() => setToast(null), 3000)
  }

  async function handleManageBilling() {
    if (!user) return
    setBillingLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id }) })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setBillingLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading…</div>
    </div>
  )

  const allSummaries = Object.values(summaries).filter(s => !s.loading && !s.error)
  const aggContract = allSummaries.reduce((s, c) => s + c.totalContract, 0)
  const aggBilled = allSummaries.reduce((s, c) => s + c.totalBilled, 0)
  const aggAR = allSummaries.reduce((s, c) => s + c.totalAR, 0)
  const aggOver = allSummaries.reduce((s, c) => s + c.overBillings, 0)
  const aggUnder = allSummaries.reduce((s, c) => s + c.underBillings, 0)
  const totalJobs = allSummaries.reduce((s, c) => s + c.activeJobs, 0)

  const now = new Date()
  const trialEndDate = subscription?.trial_end ? new Date(subscription.trial_end) : null
  const isTrialing = subscription?.status === 'trialing' && trialEndDate && trialEndDate > now
  const trialDaysLeft = isTrialing && trialEndDate ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const isExpired = subscription && subscription.status !== 'active' && !isTrialing

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg">{toast}</div>
      )}

      {/* Paywall overlay */}
      {isExpired && (
        <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your trial has ended</h2>
            <p className="text-slate-500 text-sm mb-6">Subscribe to keep access to your clients, reports, and data.</p>
            <div className="text-4xl font-extrabold text-slate-900 mb-1">$99<span className="text-lg text-slate-400 font-normal">/month</span></div>
            <p className="text-slate-400 text-xs mb-6">Cancel anytime · No contracts</p>
            <a href="/upgrade" className="block w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors">
              Subscribe now →
            </a>
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/login') }} className="mt-3 text-xs text-slate-400 hover:text-slate-600">Sign out</button>
          </div>
        </div>
      )}

      {/* Trial banner */}
      {isTrialing && (
        <div className="bg-amber-400 text-slate-900 text-sm font-medium py-2 px-6 flex items-center justify-between">
          <span>
            🎉 <strong>{trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''} left</strong> in your free trial — no credit card needed yet.
          </span>
          <a href="/upgrade" className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-slate-700 transition-colors">
            Subscribe $99/mo →
          </a>
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
            <span className="text-lg font-bold text-slate-900 tracking-tight">ReconcileBook</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
            {subscription?.status === 'active' && (
              <button onClick={handleManageBilling} disabled={billingLoading} className="text-xs text-slate-500 hover:text-slate-800 font-medium border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                {billingLoading ? '…' : 'Manage billing'}
              </button>
            )}
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/login') }} className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Client Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">{connections.length} client{connections.length !== 1 ? 's' : ''} connected · {totalJobs} active jobs</p>
          </div>
          <a href={`/api/qbo/connect?userId=${user?.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Connect Client
          </a>
        </div>

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

        {(aggOver > 0 || aggUnder > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {aggOver > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <div>
                  <p className="text-red-800 text-sm font-semibold">Over-Billings: {fmt(aggOver)}</p>
                  <p className="text-red-600 text-xs">Billed more than earned — liability on balance sheet</p>
                </div>
              </div>
            )}
            {aggUnder > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
                <div>
                  <p className="text-amber-800 text-sm font-semibold">Under-Billings: {fmt(aggUnder)}</p>
                  <p className="text-amber-600 text-xs">Earned more than billed — asset on balance sheet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {connections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-semibold text-lg mb-2">No clients connected yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">Click &quot;Connect Client&quot; to authorize a contractor&apos;s QuickBooks Online account.</p>
            <a href={`/api/qbo/connect?userId=${user?.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
              Connect First Client
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map(conn => (
              <ClientCard
                key={conn.realm_id}
                summary={summaries[conn.realm_id] ?? { realmId: conn.realm_id, company: conn.company_name, activeJobs: 0, totalContract: 0, totalBilled: 0, totalCosts: 0, totalAR: 0, totalAP: 0, overBillings: 0, underBillings: 0, openInvoices: 0, openBills: 0, loading: true }}
                onDisconnect={() => handleDisconnect(conn.realm_id, conn.company_name)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
