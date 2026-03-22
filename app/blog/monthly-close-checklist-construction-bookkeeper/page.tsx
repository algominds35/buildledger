import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monthly Close Checklist for Construction Bookkeepers — ReconcileBook',
  description: 'The complete month-end close checklist for construction bookkeepers: WIP reports, retainage, job costing reconciliation, and QuickBooks cleanup steps.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Month-End Close</span>
            <span className="text-xs text-slate-400">March 2026 · 9 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Monthly Close Checklist for Construction Bookkeepers</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Construction month-end close is more complex than a typical small business. Here's the complete checklist — covering WIP, retainage, job costing, and QuickBooks reconciliation — so nothing slips through.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Construction Close Is Different</h2>
            <p>Most small business bookkeeping closes in a few hours: reconcile the bank, code transactions, and you're done. Construction is different. You have long-term contracts, retainage held back on every invoice, costs spread across dozens of jobs, and a WIP schedule that banks and CPAs require every single month.</p>
            <p className="mt-3">Miss any of these steps and the financial statements are wrong — which means the contractor could be making decisions based on bad numbers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Complete Monthly Close Checklist</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Week 1 — Transaction Coding</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Code all bank and credit card transactions to the correct job (customer) in QBO</li>
              <li>Ensure every bill is assigned to a customer/job at the line item level — not just the header</li>
              <li>Match all subcontractor bills to the correct job and verify against lien waivers</li>
              <li>Enter any owner-pay expenses (materials picked up on personal card, etc.)</li>
              <li>Post payroll journal entries allocated by job if using a payroll provider</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Week 2 — Invoicing Review</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Confirm all AIA draw invoices have been created in QBO for the period</li>
              <li>Verify retainage amounts withheld are tracked correctly (separate line items or accounts)</li>
              <li>Check for unapplied payments or credits on customer accounts</li>
              <li>Follow up on any invoices more than 30 days outstanding</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Week 3 — WIP Schedule</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Update estimated total costs for each active job (especially jobs over or under budget)</li>
              <li>Pull contract values from estimates in QBO</li>
              <li>Pull costs to date from bills and expenses in QBO (line-level job assignment)</li>
              <li>Pull billed to date from invoices in QBO</li>
              <li>Calculate % complete using cost-to-cost method for every active job</li>
              <li>Calculate earned revenue, over billings, and under billings per job</li>
              <li>Review any jobs with % complete over 100% — this usually means an estimate needs updating</li>
              <li>Review any large swings in over/under billing compared to prior month</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Week 4 — Bank Reconciliation & Final Review</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reconcile all bank accounts and credit cards to the statement</li>
              <li>Reconcile retainage receivable account balance to retainage amounts on open invoices</li>
              <li>Reconcile retainage payable account balance to retainage on open subcontractor bills</li>
              <li>Post over/under billing journal entries to the balance sheet (if on percentage of completion)</li>
              <li>Run P&L by job — verify gross margin on each job looks reasonable</li>
              <li>Run balance sheet — verify total assets and liabilities tie out</li>
              <li>Send WIP schedule to CPA and/or owner for review</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The WIP Journal Entries</h2>
            <p>If your client is on the <strong>percentage of completion method</strong>, you need to post journal entries to put over/under billings on the balance sheet:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm space-y-3">
              <div>
                <p className="font-semibold text-slate-700 not-italic mb-1">Over Billing (Deferred Revenue — Liability):</p>
                <p>DR: Revenue (income statement) — by overbilled amount</p>
                <p>CR: Billings in Excess of Costs (balance sheet liability)</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700 not-italic mb-1">Under Billing (Unbilled Revenue — Asset):</p>
                <p>DR: Costs in Excess of Billings (balance sheet asset)</p>
                <p>CR: Revenue (income statement) — by underbilled amount</p>
              </div>
            </div>
            <p>These entries are reversed at the start of the next month when you re-run the WIP.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common Mistakes to Catch at Month-End</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Costs coded to overhead instead of a job</strong> — check for large general expenses that should be job-coded</li>
              <li><strong>Invoices without retainage lines</strong> — verify every draw invoice has the correct retainage withheld</li>
              <li><strong>Estimates not updated after change orders</strong> — contract value should reflect approved change orders</li>
              <li><strong>Duplicate bills</strong> — subcontractors sometimes re-submit invoices; watch for duplicates in QBO</li>
              <li><strong>Completed jobs still showing in WIP</strong> — jobs that are 100% complete and fully billed should be closed out</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How Long Should Construction Close Take?</h2>
            <p>For a contractor with 5–15 active jobs:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Transaction coding and invoicing review: 2–4 hours</li>
              <li>WIP schedule (manual in Excel): 2–4 hours</li>
              <li>Bank reconciliation and journal entries: 1–2 hours</li>
              <li>Final review and reporting: 1 hour</li>
            </ul>
            <p className="mt-3">That's 6–11 hours per client, per month. For bookkeepers with multiple construction clients, this adds up fast.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Faster Approach</h2>
            <p>The WIP schedule step — which takes 2–4 hours manually — can be eliminated entirely with the right tool. <strong>ReconcileBook</strong> pulls all the data from QuickBooks Online automatically: contract values from estimates, costs from bills and expenses (line-level job assignment), and billings from invoices.</p>
            <p className="mt-3">The WIP schedule is generated in real time. No Excel, no manual formula errors, no re-pulling reports. The checklist above still applies — but the most time-consuming step takes 30 seconds instead of 3 hours.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Cut your construction month-end close in half.</p>
              <p className="text-slate-600 text-sm mb-4">ReconcileBook automates the WIP schedule — the hardest part of construction close — directly from QuickBooks Online.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Generate WIP reports in 30 seconds</h2>
          <p className="text-slate-400 text-sm mb-6">Connect QuickBooks Online → WIP schedule is ready automatically. No Excel required.</p>
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
