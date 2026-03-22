'use client'

import Link from 'next/link'
import { useState } from 'react'

function Check() {
  return (
    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function BrowserMockup({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
      <div className="bg-slate-100 px-4 py-3 flex items-center gap-3 border-b border-slate-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-slate-400 text-xs font-mono border border-slate-200">{url}</div>
      </div>
      {children}
    </div>
  )
}

function SidebarIcon({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${active ? 'bg-amber-400' : 'hover:bg-white/10'}`}>
      {children}
    </div>
  )
}

function AppShell({ children, activeTab }: { children: React.ReactNode; activeTab: 'dashboard' | 'wip' | 'jobs' | 'pdf' }) {
  return (
    <div className="flex h-full font-sans text-xs">
      {/* Dark sidebar */}
      <div className="w-14 bg-[#0f1117] flex flex-col items-center py-3 gap-2 flex-shrink-0">
        {/* Logo */}
        <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center mb-2">
          <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
        </div>
        {/* Nav icons */}
        <SidebarIcon active={activeTab === 'dashboard'}>
          <svg className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        </SidebarIcon>
        <SidebarIcon active={activeTab === 'wip'}>
          <svg className={`w-4 h-4 ${activeTab === 'wip' ? 'text-slate-900' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </SidebarIcon>
        <SidebarIcon active={activeTab === 'jobs'}>
          <svg className={`w-4 h-4 ${activeTab === 'jobs' ? 'text-slate-900' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </SidebarIcon>
        <SidebarIcon active={activeTab === 'pdf'}>
          <svg className={`w-4 h-4 ${activeTab === 'pdf' ? 'text-slate-900' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </SidebarIcon>
        {/* Avatar at bottom */}
        <div className="mt-auto w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-[9px] font-bold text-white">SB</div>
      </div>
      {/* Main content */}
      <div className="flex-1 bg-slate-50 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <AppShell activeTab="dashboard">
      {/* Real app top nav */}
      <div className="bg-white border-b border-slate-200 px-5 h-10 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-900 text-[11px]">Client Dashboard</span>
          <span className="text-slate-400 text-[9px] ml-2">3 clients connected · 18 active jobs</span>
        </div>
        <div className="px-3 py-1 bg-amber-400 text-slate-900 font-bold rounded-lg text-[9px] cursor-pointer">+ Connect Client</div>
      </div>
      <div className="p-3 space-y-2 overflow-hidden">
        {/* Dark portfolio overview — exact match to real app */}
        <div className="bg-slate-900 rounded-xl p-3">
          <div className="text-slate-400 text-[8px] font-semibold uppercase tracking-widest mb-2">Portfolio Overview</div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: 'Total Clients', sub: 'connected', value: '3' },
              { label: 'Contract Value', sub: 'all clients', value: '$4,120,000' },
              { label: 'Billed to Date', sub: 'all clients', value: '$2,882,000' },
              { label: 'Accounts Rec.', sub: 'outstanding', value: '$453,000' },
              { label: 'Net Billings Position', sub: 'over-billed', value: '-$26,600' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-white font-bold text-[10px]">{s.value}</div>
                <div className="text-slate-400 text-[8px] mt-0.5">{s.label}</div>
                <div className="text-slate-600 text-[7px]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Over-billing alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          <div className="text-red-600 text-[9px] font-bold">Over-Billings: $26,600</div>
          <div className="text-red-400 text-[8px]">Billed more than earned — liability on balance sheet</div>
        </div>
        {/* Client card — exact match */}
        {[
          { name: 'Apex Builders LLC', jobs: 8, contract: '$1,240,000', billed: '$892,000', costs: '$710,000', ar: '$148,000', over: '$24,500', under: '—', invoices: '3 open invoices · $148K outstanding', bills: '2 unpaid bills · $52K owed' },
          { name: 'Summit Contracting', jobs: 5, contract: '$780,000', billed: '$430,000', costs: '$380,000', ar: '$95,000', over: '—', under: '$61,200', invoices: '1 open invoice · $95K outstanding', bills: '1 unpaid bill · $38K owed' },
        ].map(c => (
          <div key={c.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-[10px]">{c.name}</div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[8px] font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    Connected · {c.jobs} jobs
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="px-2 py-1 bg-amber-400 text-slate-900 font-bold rounded text-[8px]">Job Costing</div>
                <div className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[8px]">WIP</div>
                <div className="text-slate-400 text-[8px] font-medium">Data →</div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1.5 px-3 pb-2">
              {[
                { label: 'Contract Value', value: c.contract, color: 'text-slate-900 bg-slate-50' },
                { label: 'Billed to Date', value: c.billed, color: 'text-blue-700 bg-blue-50' },
                { label: 'Costs to Date', value: c.costs, color: 'text-purple-700 bg-purple-50' },
                { label: 'Accounts Rec.', value: c.ar, color: 'text-emerald-700 bg-emerald-50' },
                { label: 'Over Billings', value: c.over, color: c.over !== '—' ? 'text-red-600 bg-red-50' : 'text-slate-300 bg-slate-50' },
                { label: 'Under Billings', value: c.under, color: c.under !== '—' ? 'text-amber-700 bg-amber-50' : 'text-slate-300 bg-slate-50' },
              ].map(p => (
                <div key={p.label} className={`rounded-lg px-2 py-1.5 ${p.color}`}>
                  <div className="font-bold text-[9px]">{p.value}</div>
                  <div className="text-[7px] opacity-70 mt-0.5">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="px-3 pb-2 flex gap-2">
              <span className="bg-blue-50 text-blue-600 text-[7px] font-medium px-2 py-0.5 rounded-full">{c.invoices}</span>
              <span className="bg-amber-50 text-amber-700 text-[7px] font-medium px-2 py-0.5 rounded-full">{c.bills}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}

function WipMockup() {
  const rows = [
    { name: 'Apex Valley Roofing', status: 'Active', pct: 74, contract: '$47,250', estCosts: '$35,438', revEarned: '$35,015', billed: '$38,000', costs: '$26,175', over: '$2,985', under: '—', retainage: '$3,800', costToComplete: '$9,263', margin: '25.3%' },
    { name: 'Pine Ridge Remodel', status: 'Active', pct: 44, contract: '$62,500', estCosts: '$46,875', revEarned: '$27,500', billed: '$15,000', costs: '$20,625', over: '—', under: '$12,500', retainage: '$1,500', costToComplete: '$26,250', margin: '25.0%' },
    { name: 'Summit Commercial', status: 'Active', pct: 13, contract: '$98,500', estCosts: '$73,875', revEarned: '$12,805', billed: '$49,250', costs: '$9,604', over: '$36,445', under: '—', retainage: '$4,925', costToComplete: '$64,271', margin: '24.9%' },
    { name: 'Harbor View Build', status: 'Active', pct: 58, contract: '$31,500', estCosts: '$23,625', revEarned: '$18,270', billed: '$12,000', costs: '$13,703', over: '—', under: '$6,270', retainage: '$1,200', costToComplete: '$9,922', margin: '25.0%' },
  ]
  return (
    <AppShell activeTab="wip">
      {/* Top nav — exact match to real app */}
      <div className="bg-white border-b border-slate-200 px-4 h-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[9px]">← Back</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 text-[9px]">reconcilebook</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 text-[9px]">WIP Schedule</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 border border-slate-200 rounded text-[8px] text-slate-600 font-medium">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" /></svg>
            Job Costing
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-900 text-white rounded text-[8px] font-bold">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Download PDF
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 overflow-auto">
        {/* Title */}
        <div>
          <div className="font-bold text-slate-900 text-sm">WIP Schedule</div>
          <div className="text-slate-400 text-[9px]">reconcilebook · March 18, 2026</div>
        </div>

        {/* 6 stat cards with icons — exact match */}
        <div className="grid grid-cols-6 gap-1.5">
          {[
            { label: 'Active Jobs', value: '4', valColor: 'text-slate-900', iconColor: 'text-slate-500', iconBg: 'bg-slate-100', path: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21' },
            { label: 'Contract Value', value: '$239,750', valColor: 'text-slate-900', iconColor: 'text-slate-500', iconBg: 'bg-slate-100', path: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z' },
            { label: 'Costs to Date', value: '$70,107', valColor: 'text-slate-900', iconColor: 'text-amber-500', iconBg: 'bg-amber-50', path: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75' },
            { label: 'Billed to Date', value: '$114,250', valColor: 'text-slate-900', iconColor: 'text-blue-500', iconBg: 'bg-blue-50', path: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
            { label: 'Over Billings', value: '$39,430', valColor: 'text-red-600', iconColor: 'text-red-500', iconBg: 'bg-red-50', path: 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' },
            { label: 'Under Billings', value: '$18,770', valColor: 'text-amber-600', iconColor: 'text-amber-500', iconBg: 'bg-amber-50', path: 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-2">
              <div className={`w-5 h-5 ${s.iconBg} rounded-md flex items-center justify-center mb-1`}>
                <svg className={`w-2.5 h-2.5 ${s.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={s.path} /></svg>
              </div>
              <div className={`font-bold text-[10px] ${s.valColor}`}>{s.value}</div>
              <div className="text-[7px] text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Retainage banner — blue, with lock icon */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          <span className="text-blue-700 text-[8px] font-medium">Total retainage held: <strong>$11,425</strong> — confirm release schedule with clients</span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1">
          {[{ label: '🏗️ Active (1)', active: false }, { label: 'All Jobs', active: true }, { label: '✓ Complete', active: false }].map(f => (
            <div key={f.label} className={`px-2 py-1 rounded-lg text-[8px] font-medium ${f.active ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{f.label}</div>
          ))}
        </div>

        {/* WIP Table — all columns from real app */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[7px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['PROJECT','CONTRACT $','EST. COSTS','% COMPLETE','REV. EARNED','BILLED TO DATE','COSTS TO DATE','OVER BILLING','UNDER BILLING','RETAINAGE','COST TO COMPLETE','GROSS MARGIN'].map(h => (
                    <th key={h} className="px-1.5 py-1.5 text-left font-semibold text-slate-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(r => (
                  <tr key={r.name} className="hover:bg-slate-50">
                    <td className="px-1.5 py-2">
                      <div className="font-semibold text-slate-900 whitespace-nowrap">{r.name}</div>
                      <div className={`text-[7px] font-medium mt-0.5 ${r.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>{r.status}</div>
                    </td>
                    <td className="px-1.5 py-2 text-slate-700">{r.contract}</td>
                    <td className="px-1.5 py-2 text-blue-600 font-medium">{r.estCosts}</td>
                    <td className="px-1.5 py-2">
                      <div className="font-bold text-slate-900">{r.pct}.0%</div>
                      <div className="w-8 bg-slate-100 rounded-full h-1 mt-0.5">
                        <div className="h-1 rounded-full bg-slate-300" style={{ width: `${r.pct}%` }} />
                      </div>
                    </td>
                    <td className="px-1.5 py-2 text-slate-600">{r.revEarned}</td>
                    <td className="px-1.5 py-2 text-slate-700">{r.billed}</td>
                    <td className="px-1.5 py-2 text-slate-600">{r.costs}</td>
                    <td className="px-1.5 py-2">{r.over !== '—' ? <span className="text-red-600 font-bold">{r.over}</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="px-1.5 py-2">{r.under !== '—' ? <span className="text-amber-600 font-bold">{r.under}</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="px-1.5 py-2 text-blue-600 font-medium">{r.retainage}</td>
                    <td className="px-1.5 py-2 text-slate-600">{r.costToComplete}</td>
                    <td className="px-1.5 py-2 font-bold text-amber-500">{r.margin}</td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold">
                  <td className="px-1.5 py-2 text-slate-900">TOTAL</td>
                  <td className="px-1.5 py-2">$239,750</td>
                  <td className="px-1.5 py-2 text-blue-600">$179,813</td>
                  <td className="px-1.5 py-2">36.5%</td>
                  <td className="px-1.5 py-2">$93,590</td>
                  <td className="px-1.5 py-2">$114,250</td>
                  <td className="px-1.5 py-2">$70,107</td>
                  <td className="px-1.5 py-2 text-red-600">$39,430</td>
                  <td className="px-1.5 py-2 text-amber-600">$18,770</td>
                  <td className="px-1.5 py-2 text-blue-600">$11,425</td>
                  <td className="px-1.5 py-2">$109,706</td>
                  <td className="px-1.5 py-2 text-emerald-600">25.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Definitions section */}
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <div className="font-semibold text-slate-900 text-[9px] mb-2">WIP Schedule Definitions</div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 text-[7px] text-slate-500">
            {[
              { term: '% Complete', def: 'Costs to Date ÷ Estimated Total Costs (cost-to-cost method)' },
              { term: 'Revenue Earned', def: 'Contract Amount × % Complete' },
              { term: 'Over Billing', def: 'Billed to Date exceeds Revenue Earned — liability on balance sheet' },
              { term: 'Under Billing', def: 'Revenue Earned exceeds Billed to Date — asset on balance sheet' },
              { term: 'Retainage', def: 'Amount held by owner until project completion (typically 10%)' },
              { term: 'Cost to Complete', def: 'Estimated Total Costs minus Costs to Date' },
            ].map(d => (
              <div key={d.term} className="flex gap-1">
                <span className="font-semibold text-slate-700 whitespace-nowrap">{d.term}:</span>
                <span>{d.def}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function JobCostMockup() {
  const rows = [
    { name: 'Apex Valley Roofing', contract: '$38,000', budget: '$35,438', mat: '$8,250', labor: '$14,925', subs: '$3,000', other: '$0', total: '$26,175', variance: '+$9,263', pct: '+26.1%', status: 'Under' },
    { name: 'Pine Ridge Remodel', contract: '$15,000', budget: '$46,875', mat: '$5,430', labor: '$12,195', subs: '$3,000', other: '$0', total: '$20,625', variance: '+$26,250', pct: '+56.0%', status: 'Under' },
    { name: 'Summit Commercial', contract: '$49,250', budget: '$73,875', mat: '$2,750', labor: '$5,854', subs: '$1,000', other: '$0', total: '$9,604', variance: '+$64,271', pct: '+87.0%', status: 'Under' },
    { name: 'Harbor View Build', contract: '$12,000', budget: '$23,625', mat: '$4,850', labor: '$7,353', subs: '$1,500', other: '$0', total: '$13,703', variance: '-$9,922', pct: '-42.0%', status: 'Over' },
  ]
  return (
    <AppShell activeTab="jobs">
      <div className="bg-white border-b border-slate-200 px-4 h-10 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 text-[11px]">Job Costing Report</div>
          <div className="text-slate-400 text-[8px]">reconcilebook · March 18, 2026</div>
        </div>
        <div className="px-2 py-1 bg-slate-900 text-white font-bold rounded text-[8px] cursor-pointer">↓ PDF</div>
      </div>
      <div className="p-3 space-y-2">
        {/* 4 stat cards — exact match to real app */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total Contract Value', value: '$114,250', color: 'text-slate-900', icon: 'text-slate-500' },
            { label: 'Total Budget', value: '$179,813', color: 'text-blue-600', icon: 'text-blue-500' },
            { label: 'Total Actual Cost', value: '$70,107', color: 'text-purple-600', icon: 'text-purple-500' },
            { label: 'Total Variance', value: '+$89,862', color: 'text-emerald-600', icon: 'text-emerald-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-2.5">
              <svg className={`w-3 h-3 ${s.icon} mb-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              <div className={`font-bold text-[11px] ${s.color}`}>{s.value}</div>
              <div className="text-slate-400 text-[8px] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Over-budget alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <svg className="w-3 h-3 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
          <span className="text-red-600 text-[8px] font-medium">1 project is over budget — review cost allocations</span>
        </div>
        {/* Table — exact columns from real app */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-slate-100">
            <span className="text-[9px] font-bold text-slate-700">Project Cost Summary</span>
          </div>
          <table className="w-full text-[8px]">
            <thead>
              <tr className="border-b border-slate-100">
                {['PROJECT','CONTRACT','BUDGET','MATERIALS','LABOR','SUBS','OTHER','TOTAL COST','VARIANCE','STATUS'].map(h => (
                  <th key={h} className="px-2 py-1.5 text-left font-semibold text-slate-400 first:sticky first:left-0 first:bg-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(r => (
                <tr key={r.name} className="hover:bg-slate-50">
                  <td className="px-2 py-1.5 font-medium text-slate-900">{r.name}</td>
                  <td className="px-2 py-1.5 text-slate-600">{r.contract}</td>
                  <td className="px-2 py-1.5 text-blue-600 font-medium">{r.budget}</td>
                  <td className="px-2 py-1.5 text-slate-600">{r.mat}</td>
                  <td className="px-2 py-1.5 text-slate-600">{r.labor}</td>
                  <td className="px-2 py-1.5 text-slate-600">{r.subs}</td>
                  <td className="px-2 py-1.5 text-slate-600">{r.other}</td>
                  <td className="px-2 py-1.5 font-bold text-slate-900">{r.total}</td>
                  <td className={`px-2 py-1.5 font-bold ${r.variance.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {r.variance}<br/><span className="font-normal text-[7px]">{r.pct}</span>
                  </td>
                  <td className="px-2 py-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${r.status === 'Over' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold">
                <td className="px-2 py-1.5 text-slate-900">TOTAL</td>
                <td className="px-2 py-1.5 text-slate-900">$114,250</td>
                <td className="px-2 py-1.5 text-blue-600">$179,813</td>
                <td className="px-2 py-1.5">$21,280</td>
                <td className="px-2 py-1.5">$40,327</td>
                <td className="px-2 py-1.5">$8,500</td>
                <td className="px-2 py-1.5">$0</td>
                <td className="px-2 py-1.5">$70,107</td>
                <td className="px-2 py-1.5 text-emerald-600">+$89,862</td>
                <td className="px-2 py-1.5"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}

function TabbedPreview() {
  const [tab, setTab] = useState<'dashboard' | 'wip' | 'jobs'>('wip')
  const tabs = [
    { id: 'dashboard', label: 'Client Dashboard', url: 'app.reconcilebook.com/dashboard' },
    { id: 'wip', label: 'WIP Schedule', url: 'app.reconcilebook.com/clients/apex/wip' },
    { id: 'jobs', label: 'Job Costing', url: 'app.reconcilebook.com/clients/apex/job-costing' },
  ] as const

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Live app preview</p>
          <h2 className="text-3xl font-extrabold text-slate-900">See exactly what you get.</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">Click the tabs to preview each report — this is your actual app, live from QuickBooks.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Preview */}
        <BrowserMockup url={tabs.find(t => t.id === tab)!.url}>
          {tab === 'dashboard' && <DashboardMockup />}
          {tab === 'wip' && <WipMockup />}
          {tab === 'jobs' && <JobCostMockup />}
        </BrowserMockup>

        {/* Feature callouts under the preview */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { tab: 'dashboard' as const, icon: '📊', title: 'Multi-client dashboard', desc: 'All clients in one place. Portfolio financials, over/under billing, open invoices — always live from QBO.' },
            { tab: 'wip' as const, icon: '📋', title: 'WIP schedule in 30 seconds', desc: '% complete auto-calculated. Over/under billings, retainage, gross margin — ready to send to bonding agents.' },
            { tab: 'jobs' as const, icon: '💰', title: 'Job costing by category', desc: 'Materials, labor, subs broken out per job. Budget vs. actual variance with over-budget alerts.' },
          ].map(f => (
            <button
              key={f.tab}
              onClick={() => setTab(f.tab)}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${
                tab === f.tab ? 'border-amber-400 bg-amber-50' : 'border-transparent bg-slate-50 hover:border-slate-200'
              }`}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-bold text-slate-900 mb-1">{f.title}</div>
              <div className="text-slate-500 text-sm leading-relaxed">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">ReconcileBook</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            Built for construction bookkeepers
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Stop building WIP schedules<br />
            <span className="text-amber-400">in Excel.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto">
            ReconcileBook connects to your contractor clients&apos; QuickBooks Online and generates WIP schedules, job costing reports, and over/under billing summaries in 30 seconds — not 3 hours.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center mb-3">
            <Link href="/login" className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-lg shadow-amber-200">
              Start free trial →
            </Link>
            <Link href="/pricing" className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-base rounded-xl transition-colors">
              See pricing
            </Link>
          </div>
          <p className="text-slate-400 text-sm">14-day free trial · No credit card required</p>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <BrowserMockup url="app.reconcilebook.com/clients/apex/wip">
            <WipMockup />
          </BrowserMockup>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-slate-100 py-5 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Works with</span>
          {['QuickBooks Online — All Plans', 'Simple Start', 'Essentials', 'Plus', 'Advanced'].map(name => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-slate-600 font-medium text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DEMO VIDEO */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">See it in action</p>
            <h2 className="text-4xl font-extrabold text-slate-900">WIP schedule from QuickBooks in 30 seconds.</h2>
            <p className="text-slate-500 mt-3 text-lg">Watch how ReconcileBook pulls live data and generates your report automatically.</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1Lht9gLdhskXVVAbKeBzuOTrq2SH2sPXb/preview"
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* TABBED LIVE PREVIEW */}
      <TabbedPreview />

      {/* FEATURE 1 — WIP */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">WIP Schedules</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                WIP schedule done in 30 seconds — not 3 hours.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Your contractor clients need WIP reports for bonding, lenders, and monthly close. ReconcileBook generates them automatically using the cost-to-cost method — live from QuickBooks, no spreadsheet required.
              </p>
              <div className="space-y-3">
                {[
                  '% Complete calculated automatically (cost-to-cost method)',
                  'Over/under billings per project',
                  'Retainage tracked separately — not buried in AR',
                  'Revenue earned vs. billed — the number banks require',
                  'Cost to complete and gross margin per job',
                  'Download PDF in one click — bonding agent ready',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <BrowserMockup url="app.reconcilebook.com/clients/apex/wip">
              <WipMockup />
            </BrowserMockup>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — JOB COSTING */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <BrowserMockup url="app.reconcilebook.com/clients/apex/job-costing">
              <JobCostMockup />
            </BrowserMockup>
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">Job Costing</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Budget vs. actual. Every job. Every category.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Your contractors need to know if a job is profitable — and why. ReconcileBook breaks down costs by materials, labor, and subcontractors for every active project, compared against the budget from QuickBooks estimates.
              </p>
              <div className="space-y-3">
                {[
                  'Materials, labor, and subcontractor costs — separately',
                  'Budget vs. actual variance per job',
                  'Over-budget alerts so you catch problems early',
                  'Pulled live from QBO bills, expenses, and purchases',
                  'Works on all QBO plans — no Projects feature required',
                  'Export to PDF — professional, client-ready format',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3 — QBO INTEGRATION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">QuickBooks Integration</div>
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Connect any QBO account in under a minute.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                No CSV exports. No manual data entry. ReconcileBook uses secure OAuth to connect directly to your clients&apos; QuickBooks Online — and pulls live data every time you open a report.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Secure OAuth — no passwords stored',
                  'Works with all QBO plans (Simple Start, Essentials, Plus)',
                  'No Projects feature or add-ons required',
                  'No QuickBooks Time or other add-ons needed',
                  'Data is always current — no manual sync required',
                  'Unlimited contractor clients on one subscription',
                ].map(b => (
                  <div key={b} className="flex gap-3 items-start">
                    <Check />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">QuickBooks Online</div>
                    <div className="text-xs text-slate-400">Customers · Invoices · Bills · Estimates</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">CONNECTED</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">What ReconcileBook pulls</div>
                {[
                  { label: 'Customers & sub-customers (jobs)', icon: '👥' },
                  { label: 'Invoices (contract value & billing)', icon: '📄' },
                  { label: 'Estimates (budget & % complete)', icon: '📊' },
                  { label: 'Bills & purchases (costs by job)', icon: '💰' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                    <svg className="w-4 h-4 text-emerald-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium">
                Reports update live from QBO — no manual sync, no caching.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — vs Excel */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">ReconcileBook vs. Manual</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Stop doing this in a spreadsheet.</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-900 text-white text-sm font-bold">
              <div className="px-6 py-4 text-slate-400">Feature</div>
              <div className="px-6 py-4 text-amber-400 text-center">ReconcileBook</div>
              <div className="px-6 py-4 text-center text-slate-400">Excel / Manual</div>
            </div>
            {[
              { feature: 'WIP schedule generation', us: 'Automatic — 30 seconds', them: '2–4 hours per month' },
              { feature: 'Job costing by category', us: 'Live from QBO', them: 'Manual export + pivot table' },
              { feature: 'Over/under billing calculation', us: 'Auto cost-to-cost method', them: 'Manual formula, error-prone' },
              { feature: 'Retainage tracking', us: 'Per job, built into WIP', them: 'Separate spreadsheet tab' },
              { feature: 'Multiple clients', us: 'Unlimited, one dashboard', them: 'One file per client' },
              { feature: 'PDF export', us: 'One click, professional', them: 'Format manually every month' },
              { feature: 'Data accuracy', us: 'Always current from QBO', them: 'Only as good as last export' },
              { feature: 'QuickBooks required add-ons', us: 'None — any QBO plan works', them: 'N/A' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-6 py-4 text-slate-700 font-medium">{row.feature}</div>
                <div className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {row.us}
                  </span>
                </div>
                <div className="px-6 py-4 text-center text-slate-400">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Simple setup</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Up and running in 5 minutes.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up with your email. No credit card required to start your trial.' },
              { step: '02', title: 'Connect a client\'s QBO', desc: 'Click "Connect Client" and authorize their QuickBooks account via secure OAuth.' },
              { step: '03', title: 'Pull live data', desc: 'ReconcileBook instantly fetches all customers, invoices, bills, and estimates from QBO.' },
              { step: '04', title: 'Generate and download', desc: 'Open job costing or WIP. Download PDF. Send to your client in seconds.' },
            ].map((s, i) => (
              <div key={s.step} className="bg-white rounded-2xl p-7 border border-slate-200 relative">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-slate-900 font-extrabold text-sm">{s.step}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 -right-3 z-10 text-slate-300 text-xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">What bookkeepers say</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Finally built for construction bookkeepers.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used to spend 3 hours every month building WIP schedules in Excel. ReconcileBook does it in 30 seconds — I just connect QuickBooks and the report is there.",
                name: 'Sarah M.',
                title: 'CPA · 12 construction clients',
              },
              {
                quote: "My clients needed WIP reports for bonding and I was manually calculating over/under billings every month. This completely replaced that process. Worth every penny.",
                name: 'James T.',
                title: 'Bookkeeper · Specializes in GCs',
              },
              {
                quote: "The job costing breakdown by materials, labor, and subs is exactly what my contractors ask for. I can't believe I was doing this manually before.",
                name: 'Maria R.',
                title: 'QuickBooks ProAdvisor',
              },
            ].map(t => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Simple, transparent pricing.</h2>
            <p className="text-slate-500 mt-3">14-day free trial on every plan. No credit card required to start.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Starter</div>
              <div className="flex items-end gap-1 mb-1"><span className="text-4xl font-extrabold text-slate-900">$49</span><span className="text-slate-400 mb-1">/mo</span></div>
              <p className="text-slate-500 text-sm mb-6">Up to 3 clients. Great for getting started.</p>
              <ul className="space-y-2 mb-8 flex-1 text-sm text-slate-600">
                {['Up to 3 clients', 'WIP Schedule', 'Job Costing', 'PDF export', 'QBO integration'].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}</li>
                ))}
              </ul>
              <Link href="/pricing" className="block w-full text-center py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors text-sm">Start free trial →</Link>
            </div>
            {/* Pro */}
            <div className="bg-slate-900 rounded-3xl border-2 border-amber-400 p-8 flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-amber-400 text-slate-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">Most Popular</span></div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pro</div>
              <div className="flex items-end gap-1 mb-1"><span className="text-4xl font-extrabold text-white">$99</span><span className="text-slate-400 mb-1">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6">Unlimited clients. Everything included.</p>
              <ul className="space-y-2 mb-8 flex-1 text-sm text-slate-300">
                {['Unlimited clients', 'WIP Schedule', 'Job Costing', 'PDF export', 'Multi-client dashboard', 'Retainage tracking', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}</li>
                ))}
              </ul>
              <Link href="/pricing" className="block w-full text-center py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">Start free trial →</Link>
            </div>
            {/* Enterprise */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Enterprise</div>
              <div className="flex items-end gap-1 mb-1"><span className="text-4xl font-extrabold text-slate-900">Custom</span></div>
              <p className="text-slate-500 text-sm mb-6">For large firms needing custom setup and team seats.</p>
              <ul className="space-y-2 mb-8 flex-1 text-sm text-slate-600">
                {['Everything in Pro', 'Unlimited team seats', 'Custom onboarding', 'White-label option', 'Dedicated support'].map(f => (
                  <li key={f} className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}</li>
                ))}
              </ul>
              <a href="mailto:alex@reconcilebookapp.com?subject=Enterprise inquiry" className="block w-full text-center py-3 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm">Contact us →</a>
            </div>
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">All plans include a 14-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Your clients need WIP reports.<br />You don&apos;t need Excel to make them.
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join construction bookkeepers who replaced their WIP spreadsheet with ReconcileBook. Set up in 5 minutes. First report in 30 seconds.
          </p>
          <Link href="/login" className="inline-block px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-base rounded-xl transition-colors shadow-xl">
            Start free trial →
          </Link>
          <p className="text-slate-600 text-xs mt-4">No credit card required · Set up in under 5 minutes</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <span className="text-white font-bold">ReconcileBook</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">Job costing, WIP reports, and multi-client management for construction bookkeepers.</p>
            </div>
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Product</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                  <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Support</p>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="mailto:alex@reconcilebookapp.com" className="hover:text-white transition-colors">Contact</a>
                  <a href="mailto:alex@reconcilebookapp.com" className="hover:text-white transition-colors">alex@reconcilebookapp.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-slate-600 text-sm text-center">© {new Date().getFullYear()} ReconcileBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
