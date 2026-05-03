import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QuickBooks Online Setup for Construction Contractors — Step-by-Step Guide',
  description: 'How to set up QuickBooks Online correctly for a construction contractor: chart of accounts, job costing, classes, customers as jobs, and WIP reporting. The complete bookkeeper guide.',
}

export default function Post() {
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
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors">← All posts</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors">Get started</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">QuickBooks Setup</span>
            <span className="text-xs text-slate-400">May 2026 · 11 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            QuickBooks Online Setup for Construction Contractors — Step-by-Step Guide
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            A default QBO setup doesn&apos;t work for construction. Contractors need job costing, WIP tracking, retainage, and a chart of accounts that matches how construction accounting actually works. Here&apos;s how to set it up correctly from day one.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-900 font-semibold text-sm mb-1">Who this is for</p>
            <p className="text-amber-800 text-sm">Bookkeepers and ProAdvisors setting up QuickBooks Online for a new construction contractor client — or cleaning up an existing file that wasn&apos;t set up correctly.</p>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Why standard QBO setup fails contractors</h2>
          <p>
            When you set up QBO for a retail business or a service company, the default chart of accounts and workflow works fine. For construction contractors, it doesn&apos;t — and using a generic setup leads to three specific problems:
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              'No job-level profitability — you can&apos;t see if individual projects made or lost money',
              'WIP reports are impossible — you can&apos;t calculate percent complete or over/under billings',
              'Retainage is invisible — money held back by the GC or owner doesn&apos;t show correctly',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <p>Here&apos;s the correct setup to avoid all three.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 1: Choose the right QBO subscription</h2>
          <p>
            For construction contractors, you need <strong>QBO Plus or QBO Advanced</strong> — not Simple Start or Essentials. You need Plus or above because it includes:
          </p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Class tracking (for cost categories like labor, materials, subs)</li>
            <li>Location tracking (for tracking multiple job sites or divisions)</li>
            <li>Project profitability reports</li>
          </ul>
          <p>Without these features, job costing in QBO is essentially impossible. If your client is already on Simple Start or Essentials, they need to upgrade before you can set things up correctly.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 2: Build the correct chart of accounts</h2>
          <p>The default QBO chart of accounts is generic. For construction, you need accounts that map to how contractors actually track money. Here&apos;s the core structure:</p>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-900 text-white text-xs font-bold px-4 py-3">
              <div>Account</div>
              <div>Type</div>
              <div>Purpose</div>
            </div>
            {[
              ['Contract Revenue', 'Income', 'Billed contract amounts'],
              ['Retainage Receivable', 'Other Current Asset', 'Retainage held by owner/GC'],
              ['Costs in Excess of Billings', 'Other Current Asset', 'Under-billed WIP'],
              ['Billings in Excess of Costs', 'Other Current Liability', 'Over-billed WIP'],
              ['Direct Labor', 'Cost of Goods Sold', 'Field labor on jobs'],
              ['Materials', 'Cost of Goods Sold', 'Materials used on jobs'],
              ['Subcontractors', 'Cost of Goods Sold', 'Sub and vendor costs'],
              ['Equipment', 'Cost of Goods Sold', 'Equipment rental/depreciation'],
              ['Retainage Payable', 'Other Current Liability', 'Retainage owed to subs'],
            ].map((row, i) => (
              <div key={row[0]} className={`grid grid-cols-3 text-sm px-4 py-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="font-medium text-slate-800">{row[0]}</div>
                <div className="text-slate-500">{row[1]}</div>
                <div className="text-slate-500">{row[2]}</div>
              </div>
            ))}
          </div>

          <p>The two most important accounts that most bookkeepers miss: <strong>Costs in Excess of Billings</strong> and <strong>Billings in Excess of Costs</strong>. These are the WIP accounts. They represent the difference between what a contractor has earned (based on percent complete) and what they&apos;ve actually billed. Without them, the balance sheet is wrong and WIP reports are impossible.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 3: Set up Customers as Jobs</h2>
          <p>In QBO, each construction project should be set up as a <strong>sub-customer under the GC or owner</strong>. This is how job costing works in QBO — every transaction tagged to a sub-customer becomes a job cost.</p>
          <p>Structure it like this:</p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-sm space-y-1">
            <div className="text-slate-500">Customer (GC / Owner)</div>
            <div className="ml-4 text-slate-700">└── Sub-customer: Project Name — 123 Main St</div>
            <div className="ml-4 text-slate-700">└── Sub-customer: Project Name — 456 Oak Ave</div>
          </div>
          <p>Every invoice, bill, expense, and paycheck should be tagged to the sub-customer (the project). This is what generates the job costing reports you need for WIP.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 4: Enable and configure Class tracking</h2>
          <p>Classes in QBO map to cost types — the categories of costs on each job. For construction, the standard classes are:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>Labor</strong> — direct field labor costs</li>
            <li><strong>Materials</strong> — lumber, concrete, fixtures, etc.</li>
            <li><strong>Subcontractors</strong> — electrical, plumbing, HVAC subs</li>
            <li><strong>Equipment</strong> — owned or rented equipment</li>
            <li><strong>Other Direct Costs</strong> — permits, bonds, misc job costs</li>
          </ul>
          <p>Enable classes in QBO: <strong>Settings → Account and Settings → Advanced → Categories → Track classes</strong>. Set it to &quot;One to each row in transaction.&quot;</p>
          <p>With classes on, every transaction tagged to a project AND a class gives you a full breakdown of where money is going on each job.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 5: Set up retainage correctly</h2>
          <p>Retainage is money withheld from progress billings — typically 5–10% — until the project is complete. Most bookkeepers handle this wrong, which causes the accounts receivable to look inflated and the WIP report to be inaccurate.</p>
          <p>The correct approach:</p>
          <ul className="space-y-2 ml-4 list-disc">
            <li>When you invoice the owner/GC, bill the full contract amount earned</li>
            <li>Create a separate line item for retainage withheld (negative amount, coded to Retainage Receivable)</li>
            <li>The net invoice equals what&apos;s actually due now</li>
            <li>When retainage is released at project completion, invoice it separately</li>
          </ul>
          <p>This keeps retainage visible on the balance sheet and out of regular AR — exactly what lenders and bonding companies want to see.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 6: Enter contract amounts and budgets</h2>
          <p>For WIP reporting, you need two numbers for every project:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>Original contract amount</strong> — what the contractor is being paid</li>
            <li><strong>Estimated total cost</strong> — what they expect to spend to finish it</li>
          </ul>
          <p>In QBO Projects, you can enter a project budget. This becomes the &quot;Estimated Costs&quot; figure on the WIP schedule. The actual costs that flow through from bills and expenses become the &quot;Costs to Date.&quot;</p>
          <p>Without these two numbers, you can&apos;t calculate percent complete, and you can&apos;t produce a WIP report. Make sure your client (or their project manager) enters a cost budget for every project before it starts.</p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Step 7: Reconcile monthly and produce WIP reports</h2>
          <p>Once QBO is set up correctly, the monthly workflow for a construction contractor looks like this:</p>
          <ol className="space-y-2 ml-4 list-decimal">
            <li>Code all bills, expenses, and payroll to the correct job and class</li>
            <li>Invoice progress billings with retainage split out correctly</li>
            <li>Reconcile bank and credit card accounts</li>
            <li>Update estimated costs for any jobs where the budget has changed</li>
            <li>Pull the WIP schedule and review over/under billings</li>
            <li>Post journal entries for costs in excess and billings in excess</li>
          </ol>
          <p>That last step — pulling the WIP schedule — is where most bookkeepers spend the most time. If you&apos;re doing it manually in Excel, pulling numbers from QBO one by one, it takes hours per client.</p>

          <div className="bg-slate-900 rounded-2xl p-8 my-10">
            <h3 className="text-xl font-extrabold text-white mb-3">Automate the WIP schedule for all your construction clients</h3>
            <p className="text-slate-400 mb-6">ReconcileBook connects to QuickBooks Online and generates the full WIP schedule automatically — contract amounts, costs to date, percent complete, over/under billings, and retainage. For every client, in seconds.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://reconcilebook.com/login" className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm text-center">
                Try free for 14 days →
              </a>
              <a href="https://reconcilebook.com/pricing" className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors text-sm text-center">
                See pricing
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Common mistakes to avoid</h2>
          <ul className="space-y-3">
            {[
              { mistake: 'Using one income account for everything', fix: 'Separate contract revenue by project type if the contractor does commercial, residential, and service work' },
              { mistake: 'Skipping retainage tracking', fix: 'Set up Retainage Receivable and Retainage Payable from day one — retrofitting this later is painful' },
              { mistake: 'Forgetting to tag payroll to jobs', fix: 'Direct labor is a job cost — make sure payroll items are mapped to jobs and classes' },
              { mistake: 'Not entering cost budgets', fix: 'Without estimated costs, WIP percent complete is impossible to calculate accurately' },
              { mistake: 'Using Expenses instead of Bills for vendor invoices', fix: 'Bills tie to AP and give you better job cost timing — use Bills for everything that comes in with a vendor invoice' },
            ].map(item => (
              <li key={item.mistake} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.mistake}</p>
                    <p className="text-slate-500 text-sm mt-0.5">Fix: {item.fix}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Summary: QBO construction setup checklist</h2>
          <ul className="space-y-2">
            {[
              'QBO Plus or Advanced subscription',
              'Construction chart of accounts with WIP accounts',
              'Customers set up as jobs (sub-customers per project)',
              'Classes enabled and mapped to cost types',
              'Retainage Receivable and Retainage Payable accounts active',
              'Cost budgets entered for every active project',
              'Monthly WIP schedule review in workflow',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-sm mt-8 pt-8 border-t border-slate-100">
            Questions about setting up QBO for a construction client?{' '}
            <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">Email us</a> or{' '}
            <Link href="/blog" className="text-amber-600 hover:underline">browse more guides</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
