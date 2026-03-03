'use client'
import dynamic from 'next/dynamic'
const UpgradeClient = dynamic(() => import('./UpgradeClient'), { ssr: false })
export default function UpgradePage() { return <UpgradeClient /> }
