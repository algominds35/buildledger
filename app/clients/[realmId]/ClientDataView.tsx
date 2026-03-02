'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface QboData {
  company: string
  realmId: string
  customers: Record<string, unknown>[]
  invoices: Record<string, unknown>[]
  bills: Record<string, unknown>[]
  expenses: Record<string, unknown>[]
  accounts: Record<string, unknown>[]
}

export default function ClientDataView({ realmId }: { realmId: string }) {
  const router = useRouter()
  const [data, setData] = useState<QboData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'customers' | 'invoices' | 'bills' | 'expenses' | 'accounts'>('customers')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      try {
        const res = await fetch(`/api/qbo/data?realmId=${realmId}&userId=${session.user.id}`)
        const json = await res.json()
        if (!res.ok) { setError(json.error); setLoading(false); return }
        setData(json)
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    })
  }, [realmId, router])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-slate-500 text-sm">Pulling data from QuickBooks…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 font-medium mb-3">{error}</p>
        <Link href="/dashboard" className="text-sm text-amber-600 hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  )

  const tabs = [
    { key: 'customers', label: 'Customers / Jobs', count: data?.customers.length ?? 0, icon: '🏢' },
    { key: 'invoices', label: 'Invoices', count: data?.invoices.length ?? 0, icon: '🧾' },
    { key: 'bills', label: 'Bills', count: data?.bills.length ?? 0, icon: '📄' },
    { key: 'expenses', label: 'Expenses', count: data?.expenses.length ?? 0, icon: '💳' },
    { key: 'accounts', label: 'Accounts', count: data?.accounts.length ?? 0, icon: '📒' },
  ] as const

  const activeData = data?.[activeTab] ?? []

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <span className="font-semibold text-slate-900">{data?.company}</span>
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-200">
            ✓ Live QBO Data
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{data?.company}</h1>
          <p className="text-slate-500 text-sm mt-1">Realm ID: {realmId} · Live data pulled from QuickBooks Online</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === tab.key
                  ? 'bg-amber-400 border-amber-400 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
              }`}
            >
              <div className="text-xl mb-1">{tab.icon}</div>
              <div className="text-2xl font-bold">{tab.count}</div>
              <div className="text-xs font-medium mt-0.5 opacity-80">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* Data table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">
              {tabs.find(t => t.key === activeTab)?.icon} {tabs.find(t => t.key === activeTab)?.label}
            </h2>
            <span className="text-sm text-slate-400">{activeData.length} records</span>
          </div>

          {activeData.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">No records found</div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'customers' && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Company</th>
                      <th className="px-6 py-3 text-right">Balance</th>
                      <th className="px-6 py-3 text-left">Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.customers ?? []).map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{String(c.DisplayName ?? c.Name ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String(c.CompanyName ?? '—')}</td>
                        <td className="px-6 py-3 text-right font-mono">${Number(c.Balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.Active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {c.Active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'invoices' && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Invoice #</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                      <th className="px-6 py-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.invoices ?? []).map((inv, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-mono text-slate-700">{String((inv.DocNumber as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-900">{String(((inv.CustomerRef as Record<string, unknown>)?.name as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((inv.TxnDate as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-right font-mono">${Number(inv.TotalAmt ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-3 text-right font-mono text-amber-600">${Number(inv.Balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'bills' && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Vendor</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Due Date</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                      <th className="px-6 py-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.bills ?? []).map((b, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{String(((b.VendorRef as Record<string, unknown>)?.name as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((b.TxnDate as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((b.DueDate as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-right font-mono">${Number(b.TotalAmt ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="px-6 py-3 text-right font-mono text-red-500">${Number(b.Balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'expenses' && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Payee</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Payment Method</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.expenses ?? []).map((e, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{String(((e.EntityRef as Record<string, unknown>)?.name as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((e.TxnDate as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((e.PaymentType as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-right font-mono">${Number(e.TotalAmt ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'accounts' && (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Account Name</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Subtype</th>
                      <th className="px-6 py-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.accounts ?? []).map((a, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{String((a.Name as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((a.AccountType as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-slate-500">{String((a.AccountSubType as string) ?? '—')}</td>
                        <td className="px-6 py-3 text-right font-mono">${Number(a.CurrentBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
