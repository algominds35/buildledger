'use client'

import dynamic from 'next/dynamic'
import { use } from 'react'

const WipClient = dynamic(() => import('./WipClient'), { ssr: false })

export default function WipPage({ params }: { params: Promise<{ realmId: string }> }) {
  const { realmId } = use(params)
  return <WipClient realmId={realmId} />
}
