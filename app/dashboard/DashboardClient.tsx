'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface QboConnection {
  id: string
  realm_id: string
  company_name: string
  created_at: string
  token_expires_at: string
}

export default function DashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<User | null>(null)
  const [connections, setConnections] = useState<QboConnection[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      fetchConnections()
    })
  }, [router])

  useEffect(() => {
    if (searchParams.get('connected') === '1') {
      setToast('QuickBooks account connected successfully!')
      setTimeout(() => setToast(null), 4000)
    }
    if (searchParams.get('error')) {
      setToast(`Connection failed: ${searchParams.get('error')}`)
      setTimeout(() => setToast(null), 5000)
    }
  }, [searchParams])

  async function fetchConnections() {
    const { data } = await supabase
      .from('qbo_connections')
      .select('id, realm_id, company_name, created_at, token_expires_at')
      .order('created_at', { ascending: false })
    setConnections(data ?? [])
    setLoading(false)
  }

  async function handleDisconnect(realmId: string, companyName: string) {
    if (!confirm(`Disconnect ${companyName}? This cannot be undone.`)) return
    await supabase
      .from('qbo_connections')
      .delete()
      .eq('realm_id', realmId)
    setConnections((prev) => prev.filter((c) => c.realm_id !== realmId))
    setToast(`${companyName} disconnected.`)
    setTimeout(() => setToast(null), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-pulse">
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
            <button
              onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
              className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome banner */}
        <div className="bg-slate-900 rounded-2xl px-8 py-7 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome to BuildLedger 👋</h1>
            <p className="text-slate-400 text-sm">
              {connections.length === 0
                ? 'Connect your first QuickBooks client to get started.'
                : `You have ${connections.length} QuickBooks client${connections.length > 1 ? 's' : ''} connected.`}
            </p>
          </div>
          <span className="hidden md:block text-3xl">🏗️</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Connected Clients', value: connections.length.toString(), icon: '🔗', color: 'bg-blue-50 text-blue-700' },
            { label: 'Active Projects', value: '0', icon: '📁', color: 'bg-amber-50 text-amber-700' },
            { label: 'Reports Generated', value: '0', icon: '📊', color: 'bg-emerald-50 text-emerald-700' },
            { label: 'Total Billed', value: '$0', icon: '💵', color: 'bg-purple-50 text-purple-700' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg mb-3 ${stat.color}`}>{stat.icon}</div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Connect QBO */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-slate-900 text-lg">QuickBooks Clients</h2>
              <p className="text-sm text-slate-500 mt-0.5">Connect a contractor client&apos;s QBO account to pull their data.</p>
            </div>
            <a
              href={`/api/qbo/connect?userId=${user?.id}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Connect QuickBooks
            </a>
          </div>

          {connections.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">📒</div>
              <p className="text-slate-600 font-medium mb-1">No clients connected yet</p>
              <p className="text-slate-400 text-sm">Click &quot;Connect QuickBooks&quot; to authorize a client&apos;s account.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">🏢</div>
                    <div>
                      <p className="font-semibold text-slate-900">{conn.company_name}</p>
                      <p className="text-xs text-slate-400">
                        Realm ID: {conn.realm_id} · Connected {new Date(conn.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Connected
                    </span>
                    <button
                      onClick={() => handleDisconnect(conn.realm_id, conn.company_name)}
                      className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
