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
        // Get the code from the URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            setStatus('Something went wrong. Redirecting to login…')
            setTimeout(() => router.push('/login'), 2000)
            return
          }
        }

        // Check we actually have a session now
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
        } else {
          setStatus('Could not confirm account. Redirecting to login…')
          setTimeout(() => router.push('/login'), 2000)
        }
      } catch {
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
