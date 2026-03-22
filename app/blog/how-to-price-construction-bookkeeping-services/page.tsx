import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Price Construction Bookkeeping Services — ReconcileBook',
  description: 'How much to charge for construction bookkeeping clients. Pricing models, what services to include, and how to justify higher rates for WIP and job costing work.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Practice Growth</span>
            <span className="text-xs text-slate-400">March 2026 · 8 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">How to Price Construction Bookkeeping Services</h1>
          <p className="text-slate-500 text-lg leading-relaxed">Construction bookkeeping is more complex than standard small business work — which means you can and should charge significantly more. Here's how to price it, what to include, and how to have the conversation with clients.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Why Construction Bookkeeping Commands Higher Rates</h2>
            <p>A general small business bookkeeping client might pay $300–$600/month. A construction contractor client should pay $800–$2,500/month or more. Here's why the difference is justified:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Job costing complexity</strong> — every transaction must be coded to the correct job, not just the right account</li>
              <li><strong>WIP schedule</strong> — construction bookkeepers produce a monthly WIP report that banks, bonding companies, and CPAs require</li>
              <li><strong>Retainage tracking</strong> — receivable and payable retainage must be tracked separately on the balance sheet</li>
              <li><strong>Progress billing</strong> — AIA draw invoices require knowledge of the G702/G703 process</li>
              <li><strong>Subcontractor management</strong> — 1099 tracking, lien waivers, compliance documentation</li>
              <li><strong>Higher transaction volume</strong> — active job sites generate far more transactions than a typical retail or service business</li>
            </ul>
            <p className="mt-3">If you're doing construction bookkeeping at standard rates, you're leaving significant money on the table.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Pricing Models for Construction Bookkeeping</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">1. Flat Monthly Retainer (Most Common)</h3>
            <p>A fixed monthly fee regardless of transaction volume. Best for established clients where you know the workload. Typical ranges:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-3 text-sm space-y-2">
              <div className="flex justify-between"><span>Small contractor (1–5 active jobs, &lt;$2M revenue)</span><span className="font-semibold text-slate-800">$800–$1,200/mo</span></div>
              <div className="flex justify-between"><span>Mid-size contractor (5–15 jobs, $2M–$10M revenue)</span><span className="font-semibold text-slate-800">$1,200–$2,000/mo</span></div>
              <div className="flex justify-between"><span>Large contractor (15+ jobs, $10M+ revenue)</span><span className="font-semibold text-slate-800">$2,000–$3,500/mo</span></div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">2. Tiered by Services</h3>
            <p>Price based on exactly what's included. A common three-tier structure:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-3 text-sm space-y-4">
              <div>
                <p className="font-semibold text-slate-800">Basic — $700/mo</p>
                <p className="text-slate-500">Transaction coding, bank reconciliation, monthly P&L</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Standard — $1,200/mo</p>
                <p className="text-slate-500">Everything in Basic + job costing report, retainage tracking, invoice management</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Full-Service — $1,800/mo</p>
                <p className="text-slate-500">Everything in Standard + monthly WIP schedule, over/under billing analysis, CPA-ready financials</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5">3. Hourly (For New Clients or Project Work)</h3>
            <p>Charge hourly ($65–$125/hr for bookkeeping, $125–$200/hr for WIP/advisory work) when you're still scoping a new client or handling one-time cleanup projects. Move to a retainer once volume is known.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What to Include at Each Tier</h2>
            <p>Be explicit in your engagement letter about what's included. Construction clients have complex needs — scope creep is real. A clear service list prevents disputes and makes upsells easy.</p>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Always Include (All Tiers)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monthly transaction coding (job-level assignment)</li>
              <li>Bank and credit card reconciliation</li>
              <li>Monthly P&L and balance sheet</li>
              <li>QuickBooks Online management</li>
            </ul>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Upsell Services (Higher Tiers)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monthly WIP schedule — add $300–$600/mo</li>
              <li>Retainage receivable/payable tracking — add $150–$300/mo</li>
              <li>Job costing report — add $200–$400/mo</li>
              <li>AIA billing assistance — add $200–$400/mo</li>
              <li>Subcontractor 1099 prep — annual add-on $250–$500</li>
              <li>CFO advisory / cash flow forecasting — add $500–$1,500/mo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Justify Higher Rates to Contractors</h2>
            <p>Many contractors have never had a real bookkeeper — they've been doing it themselves in a spreadsheet or paying a general bookkeeper $300/month. Here's how to frame the value conversation:</p>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li>
                <strong>"Your bank requires a WIP schedule."</strong>
                <p className="text-sm mt-1">If the contractor has a construction loan or line of credit, the bank almost certainly requires monthly WIP reports. Without a bookkeeper who can produce it, the loan is at risk. That's worth $1,500/month to anyone with a $2M credit line.</p>
              </li>
              <li>
                <strong>"You could be losing money on jobs and not know it."</strong>
                <p className="text-sm mt-1">Job costing shows which projects are profitable and which are bleeding money. Most contractors who don't have job costing are surprised to find out which jobs they should stop taking.</p>
              </li>
              <li>
                <strong>"Your bonding company needs this."</strong>
                <p className="text-sm mt-1">Surety bonds — required for most public and commercial work — require audited or reviewed financials with proper WIP accounting. Without it, they can't grow beyond certain contract sizes.</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Increase Your Capacity (and Margins)</h2>
            <p>The biggest constraint for construction bookkeepers charging premium rates is time. The WIP schedule alone takes 2–4 hours per client per month if done manually in Excel. At $1,500/month per client, that's fine for 5 clients. At 15 clients, you need help or tools.</p>
            <p className="mt-3"><strong>ReconcileBook</strong> reduces the WIP schedule from 3 hours to 30 seconds per client. For a bookkeeper with 10 construction clients, that's 25–30 hours saved every month — enough to take on 5 more clients at the same rate, or simply bill the same hours at higher margin.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Take on more construction clients without adding hours.</p>
              <p className="text-slate-600 text-sm mb-4">ReconcileBook automates WIP schedules, job costing, and retainage tracking — directly from QuickBooks Online. $99/month per client.</p>
              <Link href="/pricing" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm">
                Try ReconcileBook — $99/month →
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Summary</h2>
            <p>Construction bookkeeping is a specialty that commands 2–4× the rate of general bookkeeping. The right pricing model is a flat monthly retainer with clearly defined tiers. Justify higher rates by focusing on what the contractor loses without proper WIP, job costing, and retainage tracking — their bank relationship, their bonding capacity, and their ability to know which jobs are actually profitable.</p>
            <p className="mt-3">And use tools that let you serve more clients without working more hours.</p>
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
