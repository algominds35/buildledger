import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Create a WIP Report in QuickBooks Online for Construction',
  description: 'Step-by-step guide to building a WIP schedule using QuickBooks Online data. The cost-to-cost method explained for construction bookkeepers.',
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
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">How to Create a WIP Report in QuickBooks Online for Construction</h1>
          <p className="text-slate-500 text-lg leading-relaxed">The WIP schedule is one of the most important — and most time-consuming — reports a construction bookkeeper produces. Here's how to build it using QuickBooks Online data.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Is a WIP Report?</h2>
            <p>A Work in Progress (WIP) report — also called a WIP schedule — shows the financial status of every active construction project. It answers the question: <em>has the contractor billed more or less than they've earned on each job?</em></p>
            <p className="mt-3">Banks require it for construction loans. Bonding companies require it for bonds. CPAs require it for accurate financial statements. Without a WIP schedule, a contractor's financials are incomplete.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Cost-to-Cost Method (Percentage of Completion)</h2>
            <p>The most common method for calculating WIP in construction is the <strong>cost-to-cost method</strong>. Here's the formula:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4 font-mono text-sm space-y-2">
              <p>% Complete = Costs to Date ÷ Estimated Total Costs</p>
              <p>Earned Revenue = Contract Value × % Complete</p>
              <p>Over Billing = Billed to Date − Earned Revenue (if positive)</p>
              <p>Under Billing = Earned Revenue − Billed to Date (if positive)</p>
            </div>
            <p><strong>Example:</strong> A $200,000 roofing contract with $60,000 in costs so far, estimated total costs of $120,000, and $110,000 billed:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>% Complete = $60k ÷ $120k = 50%</li>
              <li>Earned Revenue = $200k × 50% = $100,000</li>
              <li>Over Billing = $110k − $100k = <strong>$10,000 liability</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What Data You Need from QuickBooks Online</h2>
            <p>To build a WIP schedule manually from QBO, you need to pull four data points per job:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li><strong>Contract Value</strong> — from Estimates (the original signed contract amount)</li>
              <li><strong>Costs to Date</strong> — from Bills and Expenses, filtered by customer/job</li>
              <li><strong>Estimated Total Costs</strong> — this must be entered manually or tracked separately</li>
              <li><strong>Billed to Date</strong> — from Invoices, filtered by customer/job</li>
            </ol>
            <p className="mt-3">QuickBooks Online does not have a native WIP report. You have to export this data to Excel and calculate it manually — which typically takes 2–4 hours per month.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Step-by-Step: Building the WIP in QBO Manually</h2>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Step 1 — Pull Estimates (Contract Values)</h3>
            <p>In QBO, go to <strong>Reports → Estimates by Customer</strong>. Export to Excel. The "Total" column is your contract value per job.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 2 — Pull Costs by Job</h3>
            <p>Go to <strong>Reports → Job Profitability Detail</strong> or <strong>Project Profitability</strong> (if using Projects). This shows costs broken down by job — materials, labor, subcontractors.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 3 — Pull Invoices (Billed to Date)</h3>
            <p>Go to <strong>Reports → Invoice List</strong>, filter by date range, group by customer. Sum the invoices per job to get total billed.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 4 — Build the Schedule in Excel</h3>
            <p>Create columns for: Job Name, Contract Value, Est. Total Cost, Costs to Date, % Complete, Earned Revenue, Billed to Date, Over Billing, Under Billing. Fill in each row manually. Calculate the formulas.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">Step 5 — Review and Adjust</h3>
            <p>Check each job for reasonableness. Over-billings are liabilities (money received but not yet earned). Under-billings are assets (work done but not yet billed). The net position matters for the balance sheet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Common Mistakes Bookkeepers Make on WIP Reports</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Using revenue instead of costs</strong> for % complete — always use costs, not billings</li>
              <li><strong>Not updating estimated total costs</strong> when a project goes over budget</li>
              <li><strong>Including retainage in billed amounts</strong> — retainage should be tracked separately</li>
              <li><strong>Forgetting completed contracts</strong> — jobs that closed mid-month still need to appear</li>
              <li><strong>Wrong date filters</strong> — costs and billings must be pulled for the same period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">The Faster Way: Automate It</h2>
            <p>Doing this manually every month in Excel is error-prone and time-consuming. <strong>ReconcileBook</strong> connects directly to QuickBooks Online and generates the complete WIP schedule automatically — pulling contract values, costs, and billings from QBO in real time.</p>
            <p className="mt-3">Instead of 3 hours of Excel work, it takes 30 seconds. The report is always up to date, and you can export it as a PDF in one click.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">ReconcileBook generates WIP schedules automatically from QBO data.</p>
              <p className="text-slate-600 text-sm mb-4">Cost-to-cost method, over/under billings, retainage tracking — all calculated live from QuickBooks.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Summary</h2>
            <p>A WIP report requires pulling estimates, costs, and invoices from QuickBooks Online and calculating percentage of completion, earned revenue, and over/under billings for each active job. QuickBooks does not do this automatically — it requires manual work in Excel or a specialized tool like ReconcileBook.</p>
            <p className="mt-3">For construction bookkeepers managing multiple contractor clients, automating the WIP schedule saves hours every month and eliminates the risk of manual errors.</p>
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
