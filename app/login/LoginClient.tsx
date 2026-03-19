'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextParam = searchParams.get('next')
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  // If coming from pricing, default to signup tab
  useEffect(() => {
    if (nextParam === 'checkout') setMode('signup')
  }, [nextParam])

  async function redirectAfterAuth(userId: string) {
    if (nextParam === 'checkout') {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const { url } = await res.json()
      window.location.href = url
    } else {
      router.push('/dashboard')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setMessage({ type: 'error', text: error.message })
        else if (data.user) await redirectAfterAuth(data.user.id)
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) setMessage({ type: 'error', text: error.message })
        else if (data.user) await redirectAfterAuth(data.user.id)
        else setMessage({ type: 'success', text: 'Check your email to confirm your account, then sign in.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-400 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ReconcileBook</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-6">
            Construction bookkeeping,<br />
            <span className="text-amber-400">built for the pros.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Manage job costing, WIP reports, and multi-client dashboards for all your construction contractor clients.
          </p>
          <div className="space-y-4">
            {[
              { label: 'Job Costing Reports', desc: 'Materials, labor, subs — budget vs actual' },
              { label: 'WIP Schedules', desc: 'Over/under billings at a glance' },
              { label: 'Multi-Client Management', desc: 'All your contractor clients in one place' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-sm">© 2026 ReconcileBook.</p>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-9 h-9 bg-amber-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">ReconcileBook</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {mode === 'signin' ? 'Welcome back' : 'Start your free trial'}
            </h2>
            <p className="text-slate-500 text-sm">
              {mode === 'signin' ? 'Sign in to your bookkeeper workspace' : '14 days free — no credit card required.'}
            </p>
            {mode === 'signup' && (
              <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-xl">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                14-day free trial · No credit card · Cancel anytime
              </div>
            )}
          </div>

          <div className="flex rounded-xl bg-slate-100 p-1 mb-8">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setMessage(null) }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {message && (
            <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium border ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@firm.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 px-6 bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-900 font-semibold text-sm rounded-xl transition-colors">
              {loading ? '…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {mode === 'signin' && (
            <div className="mt-4 text-center">
              <button
                onClick={async () => {
                  if (!email) { setMessage({ type: 'error', text: 'Enter your email address above first.' }); return }
                  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
                  if (error) setMessage({ type: 'error', text: error.message })
                  else setMessage({ type: 'success', text: 'Password reset email sent — check your inbox.' })
                }}
                className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
