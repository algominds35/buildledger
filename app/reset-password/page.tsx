'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase puts the token in the URL hash — wait for session to be set
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
      else setMessage({ type: 'error', text: 'Invalid or expired reset link. Please request a new one.' })
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setMessage({ type: 'error', text: 'Passwords do not match.' }); return }
    if (password.length < 6) { setMessage({ type: 'error', text: 'Password must be at least 6 characters.' }); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setMessage({ type: 'error', text: error.message })
    else {
      setMessage({ type: 'success', text: 'Password updated! Redirecting…' })
      setTimeout(() => router.push('/dashboard'), 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">ReconcileBook</span>
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-1">Set new password</h1>
          <p className="text-slate-400 text-sm mb-6">Choose a new password for your account.</p>

          {message && (
            <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium border ${message.type === 'error' ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-emerald-900/30 text-emerald-300 border-emerald-700'}`}>
              {message.text}
            </div>
          )}

          {ready && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">New password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm password</label>
                <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-900 font-bold rounded-xl transition-colors">
                {loading ? 'Saving…' : 'Update password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
