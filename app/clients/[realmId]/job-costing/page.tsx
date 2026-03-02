'use client'

import dynamic from 'next/dynamic'
import { use } from 'react'

const JobCostingClient = dynamic(() => import('./JobCostingClient'), { ssr: false })

export default function JobCostingPage({ params }: { params: Promise<{ realmId: string }> }) {
  const { realmId } = use(params)
  return <JobCostingClient realmId={realmId} />
}
