'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('Confirming your account…')

  useEffect(() => {
    async function handleCallback() {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const token_hash = params.get('token_hash')
        const type = params.get('type') as 'signup' | 'recovery' | 'email' | null

        if (code) {
          // PKCE flow
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            console.error('exchangeCodeForSession error:', error)
            setStatus('Could not confirm. Redirecting to login…')
            setTimeout(() => router.push('/login'), 2000)
            return
          }
        } else if (token_hash && type) {
          // Email OTP / magic link flow
          const { error } = await supabase.auth.verifyOtp({ token_hash, type })
          if (error) {
            console.error('verifyOtp error:', error)
            setStatus('Could not confirm. Redirecting to login…')
            setTimeout(() => router.push('/login'), 2000)
            return
          }
        } else {
          // No params — check if session already exists (hash-based flow)
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) {
            setStatus('No confirmation token found. Redirecting to login…')
            setTimeout(() => router.push('/login'), 2000)
            return
          }
        }

        // At this point we should have a session
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
        } else {
          setStatus('Session not found. Please sign in manually.')
          setTimeout(() => router.push('/login'), 2000)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setStatus('Something went wrong. Redirecting to login…')
        setTimeout(() => router.push('/login'), 2000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 text-sm font-medium">{status}</p>
      </div>
    </div>
  )
}
