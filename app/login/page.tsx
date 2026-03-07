'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoginClient = dynamic(() => import('./LoginClient'), { ssr: false })

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginClient />
    </Suspense>
  )
}
