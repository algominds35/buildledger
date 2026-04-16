import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foundation Software vs QuickBooks Online for Construction Bookkeeping',
  description: 'Comparing Foundation Software and QuickBooks Online for construction bookkeeping. WIP reports, job costing, retainage, pricing — which is right for your clients?',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Software Comparison</span>
            <span className="text-xs text-slate-400">April 2026 · 10 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Foundation Software vs QuickBooks Online for Construction Bookkeeping</h1>
          <p className="text-slate-500 text-lg leading-relaxed">If you're a bookkeeper deciding between Foundation Software and QuickBooks Online for your construction contractor clients, this is the comparison you need. We cover WIP reports, job costing, retainage, pricing, and who each tool is actually built for.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Short Answer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-1">Foundation Software</p>
                <p className="text-sm text-slate-600">Built specifically for construction. Has native WIP reports, certified payroll, AIA billing, and union tracking. Best for larger GCs doing $5M+ in annual revenue who need a full ERP.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-1">QuickBooks Online</p>
                <p className="text-sm text-slate-600">General-purpose accounting that most small contractors already use. No native WIP report, but much cheaper, easier to adopt, and integrates with more tools. Best for contractors under $5M.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Foundation Software Does Well</h2>
            <p>Foundation is purpose-built for construction accounting. It has features that QuickBooks simply doesn't have out of the box:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Native WIP reporting</strong> — Foundation generates a WIP schedule automatically. No Excel, no manual calculations. It tracks earned revenue, over/under billings, and retainage natively.</li>
              <li><strong>Certified payroll</strong> — Prevailing wage, union rules, and government-required reporting are built in. This is critical for GCs doing public works jobs.</li>
              <li><strong>AIA billing (G702/G703)</strong> — Foundation can produce AIA pay applications directly from job data.</li>
              <li><strong>Equipment costing</strong> — Track equipment costs by job, including depreciation and usage rates.</li>
              <li><strong>Job cost forecasting</strong> — Built-in tools to project final job costs and compare to budget.</li>
              <li><strong>Subcontractor compliance tracking</strong> — Insurance certificates, lien waivers, 1099 tracking.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Where Foundation Falls Short</h2>
            <p>Foundation's strengths come with real trade-offs that matter a lot for bookkeepers:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Price</strong> — Foundation typically costs $5,000–$15,000+ per year depending on modules and users. QBO Plus is ~$1,188/year. The gap is significant for small contractors.</li>
              <li><strong>Implementation cost</strong> — Setting up Foundation correctly takes time and often requires a consultant. QBO a bookkeeper can get running in a day.</li>
              <li><strong>Learning curve</strong> — Foundation is complex. Contractors who aren't tech-savvy will struggle. You'll spend more time training and supporting them.</li>
              <li><strong>Contractor adoption</strong> — Most small contractors already have QBO. Migrating them to Foundation is a major change management challenge.</li>
              <li><strong>App ecosystem</strong> — QBO integrates with hundreds of apps (payroll, CRM, field tools). Foundation's integrations are more limited.</li>
              <li><strong>Cloud access</strong> — Foundation's cloud offering is newer and less mature than QBO's.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What QuickBooks Online Does Well for Construction</h2>
            <p>QBO isn't purpose-built for construction, but it's not helpless either:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Job costing with Projects</strong> — QBO's Projects feature tracks income and costs by job, with a profitability dashboard. It's basic compared to Foundation, but good enough for many small contractors.</li>
              <li><strong>Estimate-to-Invoice workflow</strong> — Create an Estimate → send to client → convert to progress invoices as work proceeds. Clean and familiar for most contractors.</li>
              <li><strong>Subcontractor 1099 tracking</strong> — QBO handles this natively.</li>
              <li><strong>Bank feeds and reconciliation</strong> — QBO's bank feed matching is excellent. Bookkeepers can reconcile fast.</li>
              <li><strong>Price</strong> — At $99–$235/month, QBO is accessible for contractors at any size.</li>
              <li><strong>Your client probably already uses it</strong> — This is not a small thing. Not having to migrate a client is a huge advantage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Biggest Problem with QuickBooks Online for Construction</h2>
            <p>Here's the honest truth: <strong>QBO does not have a WIP report.</strong></p>
            <p className="mt-3">WIP schedules are required by construction lenders, bonding companies, and CPAs. They show earned revenue vs. billed revenue on each active job — the core financial health indicator for any construction business. Without it, your client's financials are incomplete.</p>
            <p className="mt-3">With Foundation, you run the WIP report in the software. With QBO, you have to build it in Excel every month by pulling Estimates, Job Profitability, and Invoice reports — then calculating cost-to-cost percentages, earned revenue, and over/under billings manually. For a bookkeeper with 5–10 QBO construction clients, this is 15–30 hours a month of spreadsheet work.</p>
            <p className="mt-3">This is exactly what <strong>ReconcileBook</strong> solves. It connects to QuickBooks Online and generates the WIP schedule automatically — pulling the same data you'd pull manually, doing the math instantly, and letting you export a PDF in one click.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Head-to-Head Comparison</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-3 py-2 rounded-tl-lg">Feature</th>
                    <th className="text-center px-3 py-2">Foundation</th>
                    <th className="text-center px-3 py-2">QBO</th>
                    <th className="text-center px-3 py-2 rounded-tr-lg">QBO + ReconcileBook</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Native WIP report', '✓', '✗', '✓'],
                    ['Job costing', '✓', 'Basic', '✓'],
                    ['Retainage tracking', '✓', 'Manual', '✓'],
                    ['AIA billing (G702/G703)', '✓', 'Manual', '✗'],
                    ['Certified payroll', '✓', '✗', '✗'],
                    ['PDF WIP export', '✓', '✗', '✓'],
                    ['Multi-client dashboard', '—', '✗', '✓'],
                    ['Easy contractor adoption', '✗', '✓', '✓'],
                    ['Price (per contractor)', '$5k–$15k/yr', '$1.2k/yr', '$1.2k + $99/mo'],
                    ['Setup time', 'Weeks', 'Days', 'Days'],
                    ['App integrations', 'Limited', 'Hundreds', 'Hundreds'],
                  ].map(([feature, foundation, qbo, rbook], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 font-medium text-slate-800">{feature}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{foundation}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{qbo}</td>
                      <td className="px-3 py-2 text-center font-medium text-amber-700">{rbook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Which Should You Recommend to Your Clients?</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Recommend Foundation if:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>The contractor does $5M+ in annual revenue</li>
              <li>They do prevailing wage or union work</li>
              <li>They need certified payroll reporting</li>
              <li>They regularly produce AIA pay applications</li>
              <li>They have an office manager or controller who can learn new software</li>
              <li>They're willing to invest in a proper implementation</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Recommend QBO (+ ReconcileBook) if:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>The contractor is under $5M in revenue</li>
              <li>They're already using QBO and don't want to migrate</li>
              <li>You manage multiple construction clients and need WIP at scale</li>
              <li>They need WIP and job costing reports but not certified payroll</li>
              <li>You want to stay in a familiar ecosystem with better integrations</li>
              <li>Budget is a consideration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What the QBO + ReconcileBook WIP Schedule Looks Like</h2>
            <p>This is what ReconcileBook generates automatically from QuickBooks Online — the same WIP schedule a bookkeeper would spend 2 hours building in Excel, ready in 30 seconds:</p>
            <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src="/wip-schedule-app.png"
                alt="ReconcileBook WIP Schedule — automated from QuickBooks Online"
                width={900}
                height={560}
                className="w-full"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">ReconcileBook WIP Schedule — live from QuickBooks Online. No Excel required.</p>
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

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Bottom Line for Bookkeepers</h2>
            <p>For most construction bookkeepers building a practice around small-to-mid contractors, QuickBooks Online is the right platform. Your clients are already on it, it's affordable, and the ecosystem is unmatched.</p>
            <p className="mt-3">The gap — WIP reports, job costing reports, retainage tracking — is real, but it's solvable without migrating your clients to a $10,000/year ERP. <strong>ReconcileBook</strong> fills exactly that gap: it adds construction-specific reporting on top of QBO, giving your clients what they need without rebuilding their entire accounting setup.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Keep your clients on QBO. Add the WIP reports they need.</p>
              <p className="text-slate-600 text-sm mb-4">ReconcileBook connects to QuickBooks Online and generates WIP schedules, job costing reports, and retainage tracking automatically.</p>
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

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">WIP reports for QBO — without the $10k ERP</h2>
          <p className="text-slate-400 text-sm mb-6">ReconcileBook adds construction-specific reporting on top of QuickBooks Online. No migration required.</p>
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
