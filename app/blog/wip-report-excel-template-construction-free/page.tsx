import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WIP Report Excel Template for Construction — Free + How to Use It',
  description: 'A free construction WIP report Excel template with the cost-to-cost method built in. Download it, fill it in from QuickBooks, or skip the spreadsheet entirely.',
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
            <span className="text-xs text-slate-400">April 2026 · 9 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">WIP Report Excel Template for Construction — Free + How to Use It</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Most construction bookkeepers build their WIP schedule in Excel every month. Here's the exact template columns you need, the formulas to use, and how to populate it from QuickBooks Online data — plus a faster alternative if you manage multiple clients.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Every Construction Bookkeeper Needs a WIP Template</h2>
            <p>A WIP (Work in Progress) schedule shows the financial position of every active construction job: how much has been earned vs. billed, and whether each job is over- or under-billed. Banks, bonding companies, and CPAs require it — and QuickBooks Online doesn't generate it automatically.</p>
            <p className="mt-3">So most bookkeepers build it in Excel. Every month. By hand. If you manage 5 contractor clients, you're probably spending 15–20 hours a month just on WIP spreadsheets.</p>
          </section>

          {/* Excel screenshot */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What the Manual Excel WIP Looks Like</h2>
            <p>This is what most construction bookkeepers are working with — a spreadsheet they rebuild every month by exporting data from QuickBooks and filling in formulas manually:</p>

            <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/wip-excel-manual.png"
                alt="Construction WIP report built manually in Microsoft Excel"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">The manual Excel WIP — rebuilt from scratch every month per client.</p>

            <p className="mt-4">It works. But for a bookkeeper managing 8–10 construction clients, rebuilding this spreadsheet from QBO exports every month adds up to 15–25 hours of repetitive work. Every. Single. Month.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Columns Your WIP Template Needs</h2>
            <p>Set up one row per active job. Your template needs these columns — in this order — to match what CPAs and bonding companies expect:</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-3 py-2 rounded-tl-lg">Column</th>
                    <th className="text-left px-3 py-2 rounded-tr-lg">Where It Comes From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Job Name / Number', 'Customer/job name in QBO'],
                    ['Original Contract Value', 'Estimate total in QBO'],
                    ['Approved Change Orders', 'Added line items on Estimate'],
                    ['Revised Contract Value', 'Col B + Col C'],
                    ['Estimated Total Cost', 'Entered manually by contractor'],
                    ['Cost to Date', 'Bills + Expenses in QBO by job'],
                    ['% Complete (Cost-to-Cost)', 'Col F ÷ Col E'],
                    ['Earned Revenue', 'Col D × Col G'],
                    ['Billed to Date', 'Invoices in QBO by job'],
                    ['Retainage Held', 'Tracked separately or from invoice lines'],
                    ['Net Billed (excl. retainage)', 'Col I − Col J'],
                    ['Over Billing (liability)', 'If Col K > Col H, the difference'],
                    ['Under Billing (asset)', 'If Col H > Col K, the difference'],
                    ['Gross Profit to Date', 'Col F − (Col E × Col G)'],
                    ['Projected Total Profit', 'Col D − Col E'],
                  ].map(([col, src], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 font-medium text-slate-800">{col}</td>
                      <td className="px-3 py-2 text-slate-500">{src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Core Formulas (Copy These Exactly)</h2>
            <p>Assuming your data starts on row 2:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm space-y-2">
              <p><span className="text-slate-400">// Revised Contract Value (col D)</span></p>
              <p>=B2+C2</p>
              <p className="mt-3"><span className="text-slate-400">// % Complete (col G)</span></p>
              <p>=IF(E2=0, 0, F2/E2)</p>
              <p className="mt-3"><span className="text-slate-400">// Earned Revenue (col H)</span></p>
              <p>=D2*G2</p>
              <p className="mt-3"><span className="text-slate-400">// Net Billed excl. retainage (col K)</span></p>
              <p>=I2-J2</p>
              <p className="mt-3"><span className="text-slate-400">// Over Billing (col L)</span></p>
              <p>=IF(K2&gt;H2, K2-H2, 0)</p>
              <p className="mt-3"><span className="text-slate-400">// Under Billing (col M)</span></p>
              <p>=IF(H2&gt;K2, H2-K2, 0)</p>
              <p className="mt-3"><span className="text-slate-400">// Projected Total Profit (col O)</span></p>
              <p>=D2-E2</p>
            </div>
            <p>Add a totals row at the bottom. The total over-billings become a current liability on the balance sheet. Total under-billings become a current asset. Your CPA will check these against the balance sheet — they need to tie out.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Pull the Data from QuickBooks Online Each Month</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Contract Values → Estimates by Customer report</h3>
            <p>QBO: <strong>Reports → Estimates by Customer</strong>. Filter to "Open" estimates only. Export. The Total column is your Revised Contract Value. Note: if change orders are on separate Estimates, you need to sum them per job.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Costs to Date → Job Profitability Detail or Project Profitability</h3>
            <p>QBO: <strong>Reports → Job Profitability Detail</strong> (or <strong>Project Profitability</strong> if using Projects). Set the date range to the end of the month. Sum the "Actual Cost" column per job.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Billed to Date → Invoice List</h3>
            <p>QBO: <strong>Reports → Invoice List</strong>. Filter to all invoices from job start date through month end. Group by customer. Sum per job. Separate out retainage if it's tracked on invoice lines.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Estimated Total Costs → Manual entry</h3>
            <p>This is the one number QBO can't give you. You need the contractor to provide it — or track it in a separate worksheet. It's the original cost budget plus any change in scope.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Takes So Long — and Why It Adds Up</h2>
            <p>If you have one client with 8 active jobs, here's a realistic time breakdown:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Pulling 3–4 QBO reports and exporting to Excel: ~20 min</li>
              <li>Cleaning and organizing the export data: ~20 min</li>
              <li>Manually entering estimated total costs and contract values: ~15 min</li>
              <li>Building and checking the WIP formulas: ~30 min</li>
              <li>Reconciling retainage, checking totals, adjusting for errors: ~20 min</li>
              <li>Formatting and sending to the CPA or client: ~15 min</li>
            </ul>
            <p className="mt-3">That's roughly <strong>2 hours per client per month</strong> just on the WIP spreadsheet. For a bookkeeper managing 10 construction clients, that's 20 hours a month — half a work week — on one report type.</p>
          </section>

          {/* WIP App screenshot */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What It Looks Like When It's Automated</h2>
            <p>Instead of rebuilding the spreadsheet every month, imagine opening a dashboard where the WIP schedule is already done — pulling live from QuickBooks, calculated automatically, ready to export as a PDF:</p>

            <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src="/wip-schedule-app.png"
                alt="ReconcileBook WIP Schedule — automated WIP report from QuickBooks Online"
                width={900}
                height={560}
                className="w-full"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">ReconcileBook WIP Schedule — generated automatically from QuickBooks Online data.</p>

            <p className="mt-4">This is what <strong>ReconcileBook</strong> produces — the same WIP schedule you'd build in Excel, but calculated live from your client's QuickBooks data. % complete, earned revenue, over/under billings, retainage, gross margin — all there, all accurate, without a single formula to write.</p>

            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://reconcilebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm"
              >
                See ReconcileBook live →
              </a>
              <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                View pricing
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">When the Excel Template Makes Sense (and When It Doesn't)</h2>
            <p><strong>The template works well if:</strong> you manage 1–2 construction clients, they have fewer than 5 active jobs each, and you have time each month to pull and reconcile the data manually.</p>
            <p className="mt-3"><strong>The template breaks down when:</strong> you manage 5+ construction clients, jobs have lots of change orders, you're reconciling retainage on 20+ jobs, or you're spending more time on the WIP spreadsheet than on actual bookkeeping.</p>
            <p className="mt-3">For most bookkeepers scaling a construction niche, automating the WIP schedule is the single highest-leverage thing they can do to reclaim their time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Alternative: Skip the Spreadsheet</h2>
            <p><strong>ReconcileBook</strong> connects directly to QuickBooks Online and generates the complete WIP schedule automatically — pulling contract values, costs, invoices, and retainage from QBO in real time. The schedule is always up to date. PDF export is one click.</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-1">What ReconcileBook does automatically:</p>
              <ul className="text-sm text-slate-600 space-y-1 mt-2 mb-5">
                <li>✓ Pulls contract values from QBO Estimates (including change orders)</li>
                <li>✓ Sums costs to date from Bills and Expenses per job</li>
                <li>✓ Calculates % complete, earned revenue, over/under billings</li>
                <li>✓ Tracks retainage from invoice line descriptions</li>
                <li>✓ Lets you override % complete manually per job</li>
                <li>✓ Exports to PDF in one click</li>
              </ul>
              <div className="flex items-center gap-4">
                <a
                  href="https://reconcilebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm"
                >
                  Visit ReconcileBook.com →
                </a>
                <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                  See pricing
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Summary</h2>
            <p>A construction WIP report in Excel needs 15 columns covering contract value, estimated and actual costs, % complete, earned revenue, billings, retainage, and over/under billings. The data comes from QBO's Estimates, Job Profitability, and Invoice List reports. The whole process takes about 2 hours per client per month.</p>
            <p className="mt-3">If you're scaling a construction bookkeeping practice, ReconcileBook automates this entirely — generating the WIP schedule directly from QuickBooks Online data in seconds, for every client.</p>
            <p className="mt-4">
              <a
                href="https://reconcilebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Learn more at ReconcileBook.com →
              </a>
            </p>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Stop rebuilding the WIP spreadsheet every month</h2>
          <p className="text-slate-400 text-sm mb-6">ReconcileBook generates it automatically from QuickBooks Online. Every client, every month, in 30 seconds.</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://reconcilebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors"
            >
              Visit ReconcileBook.com →
            </a>
            <Link href="/pricing" className="text-slate-400 hover:text-white text-sm font-semibold transition-colors">
              See pricing
            </Link>
          </div>
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
