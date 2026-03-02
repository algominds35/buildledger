'use client'

import dynamic from 'next/dynamic'
import { use } from 'react'

const ClientDataView = dynamic(() => import('./ClientDataView'), { ssr: false })

export default function ClientPage({ params }: { params: Promise<{ realmId: string }> }) {
  const { realmId } = use(params)
  return <ClientDataView realmId={realmId} />
}
