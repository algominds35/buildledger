import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WIP Reports for Bonding Companies and Lenders — What They Need',
  description: 'What bonding companies and construction lenders actually look for in a WIP schedule. Format, timing, key ratios, and how to produce a WIP report that gets your contractor approved.',
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
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">WIP Reports</span>
            <span className="text-xs text-slate-400">May 2026 · 10 min read</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            WIP Reports for Bonding Companies and Lenders — What They Actually Need
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Your contractor client needs bonding or a construction loan. The surety or lender asks for a WIP schedule. What exactly are they looking for — and how do you make sure your report passes? Here&apos;s exactly what they want to see.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-900 font-semibold text-sm mb-1">Why this matters</p>
            <p className="text-amber-800 text-sm">A poorly formatted or incomplete WIP schedule can delay or kill a bond application or construction loan. Knowing exactly what sureties and lenders need — and delivering it cleanly — is one of the most valuable things a construction bookkeeper can do for a contractor client.</p>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Why bonding companies and lenders require WIP schedules</h2>
          <p>
            A WIP (Work in Progress) schedule tells a surety or lender two critical things about a contractor:
          </p>
          <ul className="space-y-2 ml-4 list-disc">
            <li><strong>Are they financially healthy right now?</strong> A contractor with large over-billings may look profitable on their P&L but be in financial trouble — they&apos;ve collected money they haven&apos;t earned yet.</li>
            <li><strong>Can they finish their current work?</strong> Under-billed jobs mean the contractor has done work they haven&apos;t invoiced for — which shows up as an asset and demonstrates work capacity.</li>
          </ul>
          <p>
            A P&L and balance sheet alone don&apos;t show this. The WIP schedule is the only financial report that shows the true state of a contractor&apos;s current projects — which is why every construction surety and construction lender requires one.
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">The exact columns a WIP schedule needs</h2>
          <p>Every bonding company and lender has a slightly different form, but all of them require the same core data. If your WIP schedule contains all of these, it will satisfy virtually any request:</p>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2 bg-slate-900 text-white text-xs font-bold px-4 py-3">
              <div>Column</div>
              <div>What it shows</div>
            </div>
            {[
              ['Contract Amount', 'The total value of the contract, including approved change orders'],
              ['Revised Contract Amount', 'Updated contract value after all change orders'],
              ['Costs to Date', 'Total costs incurred on this job so far'],
              ['Estimated Cost to Complete', 'How much more it will cost to finish the job'],
              ['Estimated Total Cost', 'Costs to Date + Estimated Cost to Complete'],
              ['% Complete (Cost-to-Cost)', 'Costs to Date ÷ Estimated Total Cost'],
              ['Earned Revenue', 'Contract Amount × % Complete'],
              ['Billings to Date', 'Total amount invoiced to the owner/GC so far'],
              ['Over Billing', 'Billings to Date > Earned Revenue (liability)'],
              ['Under Billing', 'Earned Revenue > Billings to Date (asset)'],
              ['Retainage Receivable', 'Amount withheld by owner/GC, not yet released'],
            ].map((row, i) => (
              <div key={row[0]} className={`grid grid-cols-2 text-sm px-4 py-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="font-semibold text-slate-800">{row[0]}</div>
                <div className="text-slate-500">{row[1]}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">The cost-to-cost method — why it&apos;s the standard</h2>
          <p>
            The cost-to-cost method is the standard for calculating percent complete in the construction industry and is required by most bonding companies and lenders. The formula is simple:
          </p>
          <div className="bg-slate-100 rounded-xl p-5 font-mono text-sm text-slate-700">
            % Complete = Costs Incurred to Date ÷ Total Estimated Costs
          </div>
          <p>
            For example: A $500,000 contract with $200,000 in estimated total cost. If $80,000 has been spent, the job is 40% complete. Earned revenue is $200,000 (40% × $500,000).
          </p>
          <p>
            Some contractors try to use physical completion percentages instead — &quot;we&apos;re 50% done with the framing.&quot; Bonding companies almost always reject this. They want cost-to-cost because it&apos;s objective and auditable from the accounting records.
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">What sureties look for — the red flags</h2>
          <p>When a surety underwriter reviews a WIP schedule, these are the things that will slow down or kill a bond application:</p>

          <ul className="space-y-4">
            {[
              {
                flag: 'Large overbillings relative to contract size',
                detail: 'If a contractor has billed 80% of a contract but only completed 40% of the work, that\'s a major red flag. It suggests cash flow problems — they needed to bill ahead to pay current expenses. Sureties call this "front-loading."',
              },
              {
                flag: 'Fade in estimated costs (costs going up after the fact)',
                detail: 'If the estimated total cost keeps increasing month after month, the contractor is losing money on the job and trying to hide it by adjusting estimates. Sureties track this closely.',
              },
              {
                flag: 'Jobs where % complete has barely moved',
                detail: 'A job that was 30% complete last quarter and is still 30% complete this quarter raises questions about whether the job is active or has stalled.',
              },
              {
                flag: 'Missing retainage',
                detail: 'If a contractor has been working for years and shows no retainage receivable, something is wrong — either retainage isn\'t being tracked, or contracts don\'t include it (unusual in commercial construction).',
              },
              {
                flag: 'WIP doesn\'t reconcile to the balance sheet',
                detail: 'The total underbillings on the WIP schedule should match Costs in Excess of Billings on the balance sheet. The total overbillings should match Billings in Excess of Costs. If they don\'t match, the financials aren\'t reliable.',
              },
            ].map(item => (
              <li key={item.flag} className="bg-red-50 rounded-xl border border-red-100 p-4 list-none">
                <p className="font-semibold text-red-800 text-sm mb-1">🚩 {item.flag}</p>
                <p className="text-red-700 text-sm">{item.detail}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">Timing: when do they need the WIP schedule?</h2>
          <p>Bonding companies and construction lenders typically request WIP schedules:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>At fiscal year-end</strong> — required with annual reviewed or audited financials</li>
            <li><strong>At bond application</strong> — for a new bond or to increase bonding capacity</li>
            <li><strong>Quarterly</strong> — for contractors with large or complex bonding programs</li>
            <li><strong>Mid-year with interim financials</strong> — some lenders require quarterly updates</li>
          </ul>
          <p>
            The WIP schedule date should match the financial statement date. A December 31 balance sheet should have a December 31 WIP schedule. If the dates don&apos;t match, the surety will notice.
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">What construction lenders need (vs. sureties)</h2>
          <p>Construction lenders (banks funding a construction loan) have slightly different priorities than sureties:</p>
          <ul className="space-y-2 ml-4 list-disc">
            <li>They care most about <strong>current liquidity</strong> — can the contractor pay their subs and suppliers?</li>
            <li>They want to see <strong>underbillings as an asset</strong> — earned revenue not yet billed demonstrates work in the pipeline</li>
            <li>They often want a <strong>backlog schedule</strong> alongside the WIP — what new contracts are signed but not yet started</li>
            <li>They want the WIP to <strong>tie to the tax return</strong> — if the CPA adjusted WIP differently on the tax return, you need to be able to explain the difference</li>
          </ul>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">How to produce the WIP schedule your clients need</h2>
          <p>Historically, producing a WIP schedule meant exporting data from QBO into Excel and manually building the schedule — entering contract amounts, calculating percent complete, computing over/under billings for every active project. For a contractor with 10–20 active jobs, this takes 2–4 hours every time it&apos;s needed.</p>

          <div className="bg-slate-900 rounded-2xl p-8 my-10">
            <h3 className="text-xl font-extrabold text-white mb-3">Generate the full WIP schedule in seconds</h3>
            <p className="text-slate-400 mb-6">ReconcileBook connects to QuickBooks Online and automatically builds the complete WIP schedule — every project, every column, tied directly to your QBO data. No Excel. No manual calculations. Ready for bonding companies and lenders in the format they expect.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://reconcilebook.com/login" className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors text-sm text-center">
                Try free for 14 days →
              </a>
              <a href="https://reconcilebook.com/pricing" className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors text-sm text-center">
                See pricing
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-10">WIP schedule checklist for bonding and lending</h2>
          <ul className="space-y-2">
            {[
              'All active projects listed (nothing missing)',
              'Contract amounts include all approved change orders',
              'Estimated total costs are current and realistic',
              'Percent complete calculated using cost-to-cost method',
              'Over/under billings calculated correctly for each job',
              'Retainage tracked separately for each project',
              'WIP schedule date matches financial statement date',
              'Total underbillings ties to balance sheet (Costs in Excess of Billings)',
              'Total overbillings ties to balance sheet (Billings in Excess of Costs)',
              'Completed jobs removed or clearly marked as complete',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-sm mt-8 pt-8 border-t border-slate-100">
            Questions about WIP reporting?{' '}
            <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">Email us</a> or{' '}
            <Link href="/blog" className="text-amber-600 hover:underline">browse more guides</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
