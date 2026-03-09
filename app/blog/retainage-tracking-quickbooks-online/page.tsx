import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retainage Tracking in QuickBooks Online — Construction Guide',
  description: 'Everything you need to know about tracking retainage receivable and payable in QuickBooks Online for construction projects.',
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-slate-900 font-bold">ReconcileBook</span>
          </Link>
          <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← All articles</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Retainage</span>
            <span className="text-xs text-slate-400">March 2026 · 7 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Retainage Tracking in QuickBooks Online</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Retainage is one of the most misunderstood concepts in construction accounting. Here is what it is, why it matters, and how to track it correctly in QuickBooks Online.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is Retainage?</h2>
            <p>Retainage (also called retention) is a percentage of each progress payment that the owner withholds from the contractor until the project is substantially complete. It is typically 5% to 10% of each invoice.</p>
            <p className="mt-3">The purpose is to protect the project owner — they hold back a portion of the contract price to ensure the contractor finishes the job and fixes any defects before receiving full payment.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4">
              <p className="font-semibold text-slate-900 mb-2">Example:</p>
              <p className="text-sm">Contract: $500,000 | Retainage rate: 10%</p>
              <p className="text-sm mt-1">Invoice #1: $100,000 | Amount paid: $90,000 | Retainage held: $10,000</p>
              <p className="text-sm mt-1">Invoice #2: $150,000 | Amount paid: $135,000 | Retainage held: $15,000</p>
              <p className="text-sm mt-1 font-semibold">Total retainage held: $25,000 (paid when project is complete)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Retainage Receivable vs. Retainage Payable</h2>
            <p>From the <strong>general contractor's</strong> perspective:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Retainage Receivable</strong> — money owed to the contractor by the project owner (asset)</li>
              <li><strong>Retainage Payable</strong> — money the contractor is withholding from their subcontractors (liability)</li>
            </ul>
            <p className="mt-3">Both must be tracked separately from regular accounts receivable and accounts payable. If retainage is mixed in with regular AR/AP, the financial statements are misleading and the contractor cannot accurately see their cash position.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Track Retainage in QuickBooks Online</h2>
            <p>QBO does not have a built-in retainage feature, but you can track it with a few account setups:</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Step 1 — Create Retainage Accounts</h3>
            <p>In Chart of Accounts, create:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Retainage Receivable</strong> — Account type: Other Current Assets</li>
              <li><strong>Retainage Payable</strong> — Account type: Other Current Liabilities</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Step 2 — Create a Retainage Item</h3>
            <p>Go to Products and Services → New → Service. Name it "Retainage Withheld." Set the Income Account to Retainage Receivable. This item will be used on invoices as a negative line item.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Step 3 — Add Retainage to Invoices</h3>
            <p>On each progress invoice, add the Retainage item as a negative line:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-sm font-mono space-y-1">
              <p>Roofing Services — Phase 1: $100,000</p>
              <p>Retainage Withheld (10%): -$10,000</p>
              <p className="font-bold border-t pt-1 mt-1">Invoice Total: $90,000</p>
            </div>
            <p>The $10,000 goes to Retainage Receivable on the balance sheet — not income, not regular AR.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Step 4 — Release Retainage at Project Completion</h3>
            <p>When the project is complete, create a final invoice for all the withheld retainage:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-sm font-mono space-y-1">
              <p>Retainage Release — 123 Main St Project: $50,000</p>
            </div>
            <p>This invoice clears Retainage Receivable back to zero and creates a normal receivable for the final payment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Retainage Appears on the WIP Report</h2>
            <p>A proper WIP schedule includes a retainage column. This shows how much retainage has been withheld across all active projects — which is important for the contractor's cash flow planning.</p>
            <p className="mt-3">A contractor might be owed $200,000 in retainage across 10 projects. That is real money owed to them that won't show up in regular accounts receivable. Lenders and bonding companies look at this number closely.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Problem with Manual Retainage Tracking</h2>
            <p>Manually tracking retainage across multiple projects in QBO requires careful setup and discipline. Mistakes are common — retainage ends up in regular AR, it gets forgotten on old projects, or it is calculated incorrectly on invoices.</p>
            <p className="mt-3"><strong>ReconcileBook</strong> tracks retainage automatically as part of the WIP schedule — pulling the data from QuickBooks and showing retainage held per project alongside percentage complete, over/under billings, and earned revenue.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Retainage tracking built into the WIP schedule.</p>
              <p className="text-slate-600 text-sm mb-4">ReconcileBook shows retainage per project automatically — pulled live from QuickBooks Online.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Track retainage automatically</h2>
          <p className="text-slate-400 text-sm mb-6">ReconcileBook includes retainage tracking in every WIP schedule — pulled directly from QuickBooks Online.</p>
          <Link href="/pricing" className="inline-block px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors">
            Start for $99/month →
          </Link>
        </div>
      </div>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} ReconcileBook</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
