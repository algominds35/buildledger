import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'BK'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
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
            <span className="text-sm text-slate-500 hidden sm:block">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
              {initials}
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Page body */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome banner */}
        <div className="bg-slate-900 rounded-2xl px-8 py-7 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome to BuildLedger 👋
            </h1>
            <p className="text-slate-400 text-sm">
              Your construction bookkeeping workspace is ready. Connect your first client to get started.
            </p>
          </div>
          <div className="hidden md:block w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🏗️</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Connected Clients', value: '0', icon: '🔗', color: 'bg-blue-50 text-blue-700' },
            { label: 'Active Projects', value: '0', icon: '📁', color: 'bg-amber-50 text-amber-700' },
            { label: 'Reports Generated', value: '0', icon: '📊', color: 'bg-emerald-50 text-emerald-700' },
            { label: 'Total Billed', value: '$0', icon: '💵', color: 'bg-purple-50 text-purple-700' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Connect QBO — coming in Step 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-900 mb-1">QuickBooks Online</h2>
                <p className="text-sm text-slate-500">Connect a contractor client&apos;s QBO account to start pulling data.</p>
              </div>
              <span className="text-2xl">📒</span>
            </div>
            <button
              disabled
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 text-sm font-semibold rounded-xl cursor-not-allowed"
            >
              Connect QuickBooks — Coming Soon
            </button>
            <p className="text-xs text-slate-400 mt-2 text-center">Available in Step 2</p>
          </div>

          {/* Reports — coming later */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-slate-900 mb-1">Reports</h2>
                <p className="text-sm text-slate-500">Job costing reports, WIP schedules, and variance analysis.</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
            <button
              disabled
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 text-sm font-semibold rounded-xl cursor-not-allowed"
            >
              View Reports — Coming Soon
            </button>
            <p className="text-xs text-slate-400 mt-2 text-center">Available in Step 4</p>
          </div>
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🏢
          </div>
          <h3 className="text-slate-900 font-semibold text-lg mb-2">No clients connected yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Once you connect a contractor client&apos;s QuickBooks Online account, their projects and transactions will appear here.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-white text-xs font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Auth working — Step 1 complete ✓
          </div>
        </div>
      </main>
    </div>
  )
}
