import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Costing for Contractors in QBO — Complete Guide',
  description: 'How to set up and run accurate job costing reports in QuickBooks Online for construction contractors. Materials, labor, subcontractors explained.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Job Costing</span>
            <span className="text-xs text-slate-400">March 2026 · 10 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">Job Costing for Contractors in QBO — Complete Guide</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Job costing is how construction contractors know if a project is profitable. Here is how to set it up correctly in QuickBooks Online and produce reports your clients can actually use.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is Job Costing?</h2>
            <p>Job costing is the process of tracking all costs — materials, labor, subcontractors, equipment, overhead — against a specific project. The goal is to know exactly how much each job costs compared to what was budgeted and what was billed.</p>
            <p className="mt-3">Without job costing, a contractor might finish a job and have no idea if they made money on it. With job costing, they can see exactly which jobs are profitable and which ones are losing money — while the job is still in progress.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Setting Up Job Costing in QuickBooks Online</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Step 1 — Enable Projects or Use Customers as Jobs</h3>
            <p>QBO offers two approaches:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Projects</strong> (QBO Plus/Advanced): Turn on Projects under Settings → Account and Settings → Advanced. Each project tracks income and expenses separately.</li>
              <li><strong>Customers as jobs</strong>: Create each project as a sub-customer under the contractor. Example: "Smith Roofing : 123 Main St Roof" — works in all QBO plans.</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 2 — Set Up Your Chart of Accounts</h3>
            <p>You need expense accounts for each cost category:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Materials / Supplies</li>
              <li>Direct Labor (or Subcontractors)</li>
              <li>Equipment Rental</li>
              <li>Permits and Fees</li>
              <li>Other Direct Costs</li>
            </ul>
            <p className="mt-2">These accounts let you break down costs per job by category — not just total costs.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 3 — Assign Every Transaction to a Job</h3>
            <p>Every bill, expense, paycheck, and time entry must be assigned to the correct customer/job. This is the most common failure point — if the contractor or their staff forgets to assign transactions to jobs, the job costing data is incomplete.</p>
            <p className="mt-2">In QBO, when entering a Bill or Expense, always fill in the <strong>Customer/Project</strong> field. Mark it as <strong>Billable</strong> if it will be passed through to the client.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 4 — Create Estimates for Each Job</h3>
            <p>Estimates in QBO serve as the budget. Create an Estimate for each project with budgeted amounts by line item. When you run job costing reports, QBO compares actual costs against the estimate to show budget vs. actual variance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Running Job Costing Reports in QBO</h2>
            <p>Once transactions are assigned to jobs, run these reports:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Job Profitability Summary</strong> — Shows profit/loss per job at a glance</li>
              <li><strong>Job Profitability Detail</strong> — Breaks down costs by category per job</li>
              <li><strong>Estimates vs. Actuals Summary</strong> — Shows budget vs. actual variance per job (requires Estimates)</li>
              <li><strong>Project Profitability</strong> (if using Projects feature) — Similar to above with a cleaner interface</li>
            </ul>
            <p className="mt-3">These reports are found under <strong>Reports → Business Overview</strong> or by searching "Job" in the reports search bar.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Three Cost Categories Every Construction Bookkeeper Tracks</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">1. Materials</h3>
            <p>Lumber, concrete, roofing materials, electrical supplies, plumbing fixtures — anything physically installed in the job. Tracked via Bills from suppliers and credit card expenses.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">2. Labor</h3>
            <p>Wages for employees working on the job. In QBO, labor costs are assigned to jobs via payroll (if using QBO Payroll) or via time entries. This is often the hardest category to track accurately because it requires workers to record their time by job.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">3. Subcontractors</h3>
            <p>Payments to subcontractors (electricians, plumbers, HVAC, etc.) tracked as Bills under a Subcontractor vendor. These are often the largest cost category and are tracked separately because of 1099 reporting requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Budget vs. Actual — The Most Important Column</h2>
            <p>The variance between budget and actual costs is the most actionable number in a job costing report. A job that is 20% over budget on materials halfway through the project needs immediate attention — the contractor may need to adjust their bid pricing or have a conversation with their supplier.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4">
              <p className="font-semibold text-slate-900 mb-2">Example — Variance Analysis:</p>
              <div className="text-sm space-y-1 font-mono">
                <p>Materials Budget: $25,000 | Actual: $31,000 | Variance: <span className="text-red-600">-$6,000</span></p>
                <p>Labor Budget: $40,000 | Actual: $36,000 | Variance: <span className="text-green-600">+$4,000</span></p>
                <p>Subs Budget: $20,000 | Actual: $20,000 | Variance: $0</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Job Costing Is Hard to Do in QBO Alone</h2>
            <p>QBO has the raw data but the reporting is limited. The built-in reports don't give you a clean, client-ready job costing report that shows all jobs side by side with budget vs. actual variance at a glance. Most bookkeepers end up exporting to Excel and reformatting manually.</p>
            <p className="mt-3"><strong>ReconcileBook</strong> solves this by pulling all the data from QBO automatically and generating a clean job costing report — materials, labor, subcontractors, budget vs. actual, variance — for every active job, in one screen.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">ReconcileBook pulls job costing data directly from QBO.</p>
              <p className="text-slate-600 text-sm mb-4">Materials, labor, subs, budget vs. actual variance — all in one report. Export to PDF in one click.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

        </div>
      </article>

      <div className="bg-slate-900 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Job costing reports in 30 seconds</h2>
          <p className="text-slate-400 text-sm mb-6">Connect QuickBooks Online → full job costing report ready automatically for every active project.</p>
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
