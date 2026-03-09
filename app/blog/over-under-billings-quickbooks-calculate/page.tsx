import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over/Under Billings in QuickBooks — How to Calculate',
  description: 'What over and under billings mean, how to calculate them using QuickBooks data, and why banks and bonding companies require this on every construction project.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Billings</span>
            <span className="text-xs text-slate-400">March 2026 · 9 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Over/Under Billings in QuickBooks — How to Calculate</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Over billings and under billings are the most misunderstood line items on a construction balance sheet. Here is exactly what they mean and how to calculate them from QuickBooks Online data.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Are Over Billings and Under Billings?</h2>
            <p>In construction accounting, revenue is recognized based on how much work has been completed — not simply based on how much has been invoiced. This is called the <strong>percentage of completion method</strong>.</p>
            <p className="mt-3">When the amount billed does not match the amount earned, there is an imbalance:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Over Billing (Billings in Excess of Costs)</strong> — The contractor has invoiced more than they have earned based on work completed. This is a <em>liability</em> on the balance sheet.</li>
              <li><strong>Under Billing (Costs in Excess of Billings)</strong> — The contractor has completed more work than they have invoiced. This is an <em>asset</em> on the balance sheet.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Formula</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm space-y-2">
              <p className="font-bold text-slate-900">Step 1: Calculate % Complete</p>
              <p>% Complete = Costs to Date ÷ Estimated Total Costs</p>
              <p className="font-bold text-slate-900 mt-3">Step 2: Calculate Earned Revenue</p>
              <p>Earned Revenue = Contract Value × % Complete</p>
              <p className="font-bold text-slate-900 mt-3">Step 3: Calculate Position</p>
              <p>If Billed &gt; Earned → Over Billing = Billed − Earned</p>
              <p>If Earned &gt; Billed → Under Billing = Earned − Billed</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Worked Examples</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Example 1 — Over Billed Project</h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-3 text-sm space-y-1">
              <p>Contract Value: $300,000</p>
              <p>Estimated Total Costs: $200,000</p>
              <p>Costs to Date: $80,000</p>
              <p>Billed to Date: $180,000</p>
              <p className="mt-2">% Complete = $80k ÷ $200k = <strong>40%</strong></p>
              <p>Earned Revenue = $300k × 40% = <strong>$120,000</strong></p>
              <p className="text-red-700 font-bold mt-1">Over Billing = $180k − $120k = $60,000 (liability)</p>
            </div>
            <p>The contractor billed $60,000 more than they have earned. This money has been received but the work has not been done yet — it is a liability.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">Example 2 — Under Billed Project</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-3 text-sm space-y-1">
              <p>Contract Value: $500,000</p>
              <p>Estimated Total Costs: $350,000</p>
              <p>Costs to Date: $175,000</p>
              <p>Billed to Date: $200,000</p>
              <p className="mt-2">% Complete = $175k ÷ $350k = <strong>50%</strong></p>
              <p>Earned Revenue = $500k × 50% = <strong>$250,000</strong></p>
              <p className="text-amber-700 font-bold mt-1">Under Billing = $250k − $200k = $50,000 (asset)</p>
            </div>
            <p>The contractor has completed $250,000 worth of work but only billed $200,000. The $50,000 under billing is an asset — they have earned it but not collected it yet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Banks and Bonding Companies Care</h2>
            <p>Construction lenders and bonding companies require a WIP schedule with over/under billings because it reveals the true financial health of the contractor's work-in-progress:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Large over billings</strong> mean the contractor has spent money they received but hasn't done the work yet — risky if a job goes wrong</li>
              <li><strong>Large under billings</strong> mean the contractor is not collecting fast enough — cash flow problem</li>
              <li>Banks use the net billings position (over minus under) to assess risk for construction loans</li>
              <li>Bonding companies use it to set bond limits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Where to Get the Data in QuickBooks Online</h2>
            <p>To calculate over/under billings for each job, you need to pull from QBO:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Contract Value</strong> → Estimates (the signed contract amount per customer)</li>
              <li><strong>Costs to Date</strong> → Bills and Expenses filtered by customer/job</li>
              <li><strong>Billed to Date</strong> → Invoices filtered by customer/job</li>
              <li><strong>Estimated Total Cost</strong> → This must be maintained manually — it is the total budgeted cost for the job</li>
            </ul>
            <p className="mt-3">QuickBooks Online does not calculate over/under billings automatically. You must pull the data and run the calculations yourself — typically in Excel.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common Errors When Calculating Over/Under Billings</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Using total contract costs instead of estimated total costs</strong> — if a job goes over budget, the denominator changes and the % complete calculation is wrong</li>
              <li><strong>Including retainage in billings</strong> — retainage should be separated from the billed amount</li>
              <li><strong>Not including all cost types</strong> — labor, materials, subs, and overhead must all be included in costs to date</li>
              <li><strong>Wrong date cutoff</strong> — costs and billings must be pulled for the same reporting period</li>
              <li><strong>Forgetting to include all active jobs</strong> — every job with costs or billings in the period must appear on the WIP</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Automate Over/Under Billing Calculations</h2>
            <p>Calculating over/under billings manually for 10, 20, or 50 active jobs takes hours every month. <strong>ReconcileBook</strong> connects to QuickBooks Online and calculates the complete WIP schedule automatically — including over billings, under billings, percentage complete, earned revenue, and retainage for every active job.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Over/under billings calculated automatically from QBO data.</p>
              <p className="text-slate-600 text-sm mb-4">Full WIP schedule with over billings, under billings, % complete, earned revenue, and retainage — ready in 30 seconds.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Stop calculating billings in Excel</h2>
          <p className="text-slate-400 text-sm mb-6">ReconcileBook calculates over/under billings for every active job automatically — pulled live from QuickBooks Online.</p>
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
