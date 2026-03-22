import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIA Billing (G702/G703) in QuickBooks Online — Construction Bookkeeping Guide',
  description: 'How to track AIA progress billing (G702/G703 forms) in QuickBooks Online for construction contractors. Retainage, stored materials, and schedule of values explained.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Billing</span>
            <span className="text-xs text-slate-400">March 2026 · 10 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">AIA Billing (G702/G703) in QuickBooks Online — Complete Guide</h1>
          <p className="text-slate-500 text-lg leading-relaxed">AIA progress billing is the standard billing method on commercial construction jobs. Here's how to track it in QuickBooks Online and make sure your WIP schedule stays accurate.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is AIA Billing?</h2>
            <p>AIA billing — named after the American Institute of Architects — is the standard method for billing on commercial construction contracts. It uses two specific forms:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>G702</strong> — Application and Certificate for Payment (the summary page showing total contract value, work completed, retainage, and amount due this draw)</li>
              <li><strong>G703</strong> — Continuation Sheet (the line-by-line schedule of values showing each work item, its original value, % complete, and amount billed)</li>
            </ul>
            <p className="mt-3">Every draw (monthly billing) requires a new G702/G703 package. The GC or owner reviews it, approves the amount, and issues payment — minus retainage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Key Terms on the G702/G703</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 space-y-3 text-sm">
              <div><strong className="text-slate-800">Schedule of Values (SOV)</strong> — The breakdown of the total contract into line items (e.g., mobilization, framing, MEP, finishes). Must add up to the contract value.</div>
              <div><strong className="text-slate-800">Work Completed This Period</strong> — Value of work done in the current billing period for each SOV line item.</div>
              <div><strong className="text-slate-800">Work Completed to Date</strong> — Cumulative work completed on each line item since contract start.</div>
              <div><strong className="text-slate-800">Retainage</strong> — A percentage (typically 5–10%) held back from each payment. Released at substantial completion.</div>
              <div><strong className="text-slate-800">Stored Materials</strong> — Materials purchased and on-site but not yet installed. Often eligible for billing on commercial jobs.</div>
              <div><strong className="text-slate-800">Balance to Finish</strong> — Remaining contract value not yet billed (SOV value minus work completed to date).</div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Track AIA Billing in QuickBooks Online</h2>
            <p>QuickBooks Online doesn't have a native G702/G703 form, but you can track AIA billing accurately with the right setup.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 1 — Create the Contract as an Estimate</h3>
            <p>Create an estimate in QBO for each job. Use line items that match your Schedule of Values — one line per SOV category (framing, electrical, plumbing, etc.). The estimate total = contract value.</p>
            <p className="mt-2">This gives you the contract value that flows into your WIP schedule.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 2 — Create Invoices from the Estimate (Progress Invoicing)</h3>
            <p>Each draw, create an invoice in QBO using <strong>Progress Invoicing</strong> (enabled in QBO settings). This lets you bill a percentage of each estimate line item.</p>
            <p className="mt-2">Set the % complete for each SOV line item on this draw. QBO calculates the dollar amount automatically.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 3 — Track Retainage</h3>
            <p>On each invoice, add a retainage line item as a negative amount (e.g., -10% of gross billings). Map it to a <strong>Retainage Receivable</strong> account on the balance sheet — not income.</p>
            <p className="mt-2">When retainage is released at project closeout, create a separate invoice for the retainage amount and clear the Retainage Receivable balance.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 4 — Track Stored Materials (If Applicable)</h3>
            <p>If the GC approves billing for stored materials, create a separate line item on the invoice for the stored materials amount. Map it to a <strong>Stored Materials</strong> account or track it as part of the work-completed total.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 5 — Prepare the G702/G703 Outside QBO</h3>
            <p>QBO doesn't generate the actual G702/G703 PDF. You'll need to prepare the forms separately (Excel template, dedicated AIA billing software, or your client's GC/owner may have their own system). Use the QBO invoice data to populate the numbers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How AIA Billing Affects the WIP Schedule</h2>
            <p>AIA billing creates a direct link between the G703 (schedule of values) and the WIP schedule. Specifically:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Contract Value on WIP</strong> = Total contract value from G702</li>
              <li><strong>Billed to Date on WIP</strong> = Cumulative net billings from all draws (not including retainage held)</li>
              <li><strong>% Complete on WIP</strong> = Calculated from costs, not from the G703 % — the two should be close but won't always match exactly</li>
            </ul>
            <p className="mt-3">A common mistake is using the G703 percentage of completion for the WIP schedule instead of the cost-to-cost method. The G703 % is based on work-in-place value, while the cost-to-cost method uses actual costs. For audit and bonding purposes, always use cost-to-cost.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Change Orders and AIA Billing</h2>
            <p>Change orders add to the contract value and must be reflected in both the G702 and QBO:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Update the estimate in QBO to add the change order value (add a new line item for the CO or increase an existing one)</li>
              <li>The contract value on the WIP schedule automatically updates</li>
              <li>Add the change order line to the G703 in your billing forms</li>
            </ul>
            <p className="mt-3">Unsigned or disputed change orders should NOT be added to the estimate until approved by the owner/GC.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">AIA Billing Mistakes to Avoid</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Front-loading the SOV</strong> — allocating too much contract value to early line items (mobilization, demo) to improve early cash flow. Banks and GCs are watching for this.</li>
              <li><strong>Overbilling stored materials</strong> — billing for materials not yet delivered to the job site</li>
              <li><strong>Forgetting retainage on change orders</strong> — retainage applies to change order work too, not just original contract work</li>
              <li><strong>Not recording retainage releases</strong> — when retainage is paid, it must clear the Retainage Receivable balance in QBO</li>
              <li><strong>Using net billings (after retainage) for WIP</strong> — use gross billings for billed-to-date on the WIP schedule, track retainage separately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Tools That Make This Easier</h2>
            <p>Tracking AIA billing in QBO manually is manageable for one or two projects. For bookkeepers handling multiple commercial construction clients, it becomes complex fast — especially when you need to reconcile the G703, the QBO invoices, the retainage accounts, and the WIP schedule all at once.</p>
            <p className="mt-3"><strong>ReconcileBook</strong> pulls contract values, billings (net of retainage), and costs directly from QuickBooks Online and generates the WIP schedule automatically. Retainage is tracked as a separate column, and over/under billings are calculated in real time — no Excel required.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">WIP schedules from QBO in 30 seconds.</p>
              <p className="text-slate-600 text-sm mb-4">AIA billing, retainage tracking, over/under billings — all calculated live from QuickBooks Online.</p>
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
