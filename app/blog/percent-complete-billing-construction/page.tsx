import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Percent Complete Billing in Construction — How It Works',
  description: 'What percent complete billing is, how to calculate it using the cost-to-cost method, and why it matters for construction bookkeepers managing WIP schedules.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">WIP Reports</span>
            <span className="text-xs text-slate-400">March 2026 · 8 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Percent Complete Billing in Construction — How It Works</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Percent complete billing is the foundation of every WIP schedule. Here is what it means, how the cost-to-cost method works, and why getting it right matters for your contractor clients.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is Percent Complete Billing?</h2>
            <p>In construction, contractors bill clients as work progresses — not all at once at the end. This is called progress billing or percent complete billing. Instead of waiting until a $500,000 project is finished to invoice, the contractor bills a portion of the contract value each month based on how much work has been completed.</p>
            <p className="mt-3">The key question is: how do you know what percentage of the job is actually done? That is where the percent complete calculation comes in — and where most of the complexity in construction accounting lives.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Cost-to-Cost Method</h2>
            <p>The most common way to calculate percent complete in construction is the <strong>cost-to-cost method</strong>. The formula is simple:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm">
              <p className="font-bold text-slate-900">% Complete = Costs to Date ÷ Estimated Total Costs</p>
              <p className="mt-3 text-slate-500">Example:</p>
              <p>Costs incurred so far: $30,000</p>
              <p>Total estimated costs: $75,000</p>
              <p className="font-bold mt-1">% Complete = $30,000 ÷ $75,000 = 40%</p>
            </div>
            <p>This method is widely accepted by accountants, lenders, and bonding companies because it is based on actual cost data rather than someone&apos;s opinion of how far along the work is.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Revenue Earned vs. Billed</h2>
            <p>Once you have the percent complete, you can calculate <strong>revenue earned</strong>:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm">
              <p className="font-bold text-slate-900">Revenue Earned = Contract Value × % Complete</p>
              <p className="mt-3 text-slate-500">Example:</p>
              <p>Contract value: $100,000</p>
              <p>% Complete: 40%</p>
              <p className="font-bold mt-1">Revenue Earned = $100,000 × 40% = $40,000</p>
            </div>
            <p>Revenue earned is what the contractor has <em>actually earned</em> based on work completed — regardless of what has been invoiced. The difference between what has been billed and what has been earned is what creates over and under billings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Over Billings and Under Billings</h2>
            <p>This is where percent complete billing connects directly to the WIP schedule:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Over billing</strong> — Billed more than earned. The contractor invoiced $50,000 but only earned $40,000. The $10,000 difference is a liability — they owe that work to the client.</li>
              <li><strong>Under billing</strong> — Earned more than billed. The contractor completed $40,000 worth of work but only invoiced $30,000. The $10,000 is an asset — money earned but not yet invoiced.</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-4">
              <p className="font-semibold text-slate-900 mb-2">Why banks and bonding companies care</p>
              <p className="text-slate-700 text-sm">Lenders and surety companies look at over and under billings to assess financial health. A contractor with large over billings relative to contract value is a risk — they may be front-loading invoices to cover cash flow problems. Large under billings can signal poor billing practices or problems collecting.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Percent Complete Is Hard to Track in QuickBooks</h2>
            <p>QuickBooks Online does not calculate percent complete for you. To get the number manually, you need to:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>Export all costs by job (bills, expenses, purchases)</li>
              <li>Get the estimated total costs from each estimate</li>
              <li>Divide costs to date by estimated total costs for each job</li>
              <li>Multiply contract value by that percentage to get earned revenue</li>
              <li>Compare earned revenue to billed amount to get over/under</li>
            </ol>
            <p className="mt-3">For a bookkeeper managing 10 contractor clients with 5 active jobs each, that is 50 separate calculations every month — all done manually in a spreadsheet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common Mistakes in Percent Complete Billing</h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Using billing percentage instead of cost percentage</strong> — Some contractors estimate percent complete based on how much they have invoiced. This is circular and inaccurate unless billings exactly track work completed.</li>
              <li><strong>Not updating estimated total costs</strong> — If a job goes over budget, the estimated total costs should be revised upward. Using the original budget when actual costs have blown past it will overstate percent complete.</li>
              <li><strong>Missing costs in QBO</strong> — If a bill or expense is not assigned to a job in QuickBooks, it will not show up in costs to date. This understates percent complete and understates costs.</li>
              <li><strong>Including retainage in billed amounts</strong> — Retainage should be tracked separately. Including it in regular billed amounts distorts the over/under billing calculation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How ReconcileBook Handles Percent Complete</h2>
            <p>ReconcileBook connects to QuickBooks Online and calculates percent complete automatically for every job using the cost-to-cost method:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Pulls all costs (bills and purchases) assigned to each job</li>
              <li>Pulls estimated total costs from QBO Estimates</li>
              <li>Calculates % Complete = Costs to Date ÷ Estimated Total Costs</li>
              <li>Calculates Revenue Earned = Contract Value × % Complete</li>
              <li>Calculates Over/Under Billings against invoiced amounts</li>
              <li>Shows retainage held per job separately</li>
            </ul>
            <p className="mt-3">All of this updates live every time you open the report — no spreadsheets, no manual calculations.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">WIP schedule with percent complete — automated.</p>
              <p className="text-slate-600 text-sm mb-4">ReconcileBook calculates cost-to-cost percent complete for every job and generates a complete WIP schedule in seconds.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Automate your WIP schedule</h2>
          <p className="text-slate-400 text-sm mb-6">ReconcileBook calculates percent complete and over/under billings automatically — live from QuickBooks Online.</p>
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
