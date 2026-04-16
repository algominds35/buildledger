import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — ReconcileBook | Construction Bookkeeping Guides',
  description: 'Free guides on WIP reports, job costing, retainage tracking, and QuickBooks Online for construction bookkeepers.',
}

const posts = [
  {
    slug: 'wip-report-excel-template-construction-free',
    title: 'WIP Report Excel Template for Construction — Free + How to Use It',
    description: 'The exact columns, formulas, and QuickBooks Online data sources you need to build a construction WIP schedule in Excel — plus a faster alternative if you manage multiple clients.',
    date: 'April 2026',
    readTime: '9 min read',
    tag: 'WIP Reports',
  },
  {
    slug: 'foundation-software-vs-quickbooks-online-construction-bookkeeping',
    title: 'Foundation Software vs QuickBooks Online for Construction Bookkeeping',
    description: 'WIP reports, job costing, retainage, certified payroll, pricing — a straight comparison of Foundation Software and QuickBooks Online for construction bookkeepers.',
    date: 'April 2026',
    readTime: '10 min read',
    tag: 'Software Comparison',
  },
  {
    slug: 'construction-accounting-software-comparison-wip-job-costing',
    title: 'Construction Accounting Software Compared: QBO, Sage, Foundation, Procore',
    description: 'How QuickBooks Online, Sage 100 Contractor, Foundation, and Procore each handle WIP reports and job costing — and which is right for your contractor clients.',
    date: 'April 2026',
    readTime: '12 min read',
    tag: 'Software Comparison',
  },
  {
    slug: 'wip-report-quickbooks-online-construction',
    title: 'How to Create a WIP Report in QuickBooks Online for Construction',
    description: 'A step-by-step guide to building a WIP schedule using QuickBooks Online data — the cost-to-cost method explained for construction bookkeepers.',
    date: 'March 2026',
    readTime: '8 min read',
    tag: 'WIP Reports',
  },
  {
    slug: 'job-costing-contractors-qbo-guide',
    title: 'Job Costing for Contractors in QBO — Complete Guide',
    description: 'How to set up and run accurate job costing reports in QuickBooks Online for construction contractors. Materials, labor, subcontractors — all in one place.',
    date: 'March 2026',
    readTime: '10 min read',
    tag: 'Job Costing',
  },
  {
    slug: 'retainage-tracking-quickbooks-online',
    title: 'Retainage Tracking in QuickBooks Online',
    description: "Everything you need to know about tracking retainage receivable and payable in QuickBooks Online for construction projects — and why it matters for your contractor clients.",
    date: 'March 2026',
    readTime: '7 min read',
    tag: 'Retainage',
  },
  {
    slug: 'over-under-billings-quickbooks-calculate',
    title: 'Over/Under Billings in QuickBooks — How to Calculate',
    description: 'What over and under billings mean, how to calculate them using QuickBooks data, and why banks and bonding companies require this on every construction project.',
    date: 'March 2026',
    readTime: '9 min read',
    tag: 'Billings',
  },
  {
    slug: 'percent-complete-billing-construction',
    title: 'Percent Complete Billing in Construction — How It Works',
    description: 'What percent complete billing is, how to calculate it using the cost-to-cost method, and why it matters for construction bookkeepers managing WIP schedules.',
    date: 'March 2026',
    readTime: '8 min read',
    tag: 'WIP Reports',
  },
  {
    slug: 'monthly-close-checklist-construction-bookkeeper',
    title: 'Monthly Close Checklist for Construction Bookkeepers',
    description: 'The complete month-end close checklist for construction bookkeepers: WIP reports, retainage, job costing reconciliation, journal entries, and QuickBooks cleanup — step by step.',
    date: 'March 2026',
    readTime: '9 min read',
    tag: 'Month-End Close',
  },
  {
    slug: 'aia-billing-g702-g703-quickbooks-online',
    title: 'AIA Billing (G702/G703) in QuickBooks Online — Complete Guide',
    description: 'How to track AIA progress billing using G702/G703 forms in QuickBooks Online. Schedule of values, retainage, stored materials, and how it ties into the WIP schedule.',
    date: 'March 2026',
    readTime: '10 min read',
    tag: 'Billing',
  },
  {
    slug: 'how-to-price-construction-bookkeeping-services',
    title: 'How to Price Construction Bookkeeping Services',
    description: 'How much to charge for construction bookkeeping clients. Pricing models, what services to include at each tier, and how to justify premium rates for WIP and job costing work.',
    date: 'March 2026',
    readTime: '8 min read',
    tag: 'Practice Growth',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
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
            <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/pricing" className="text-slate-500 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/login" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Construction Bookkeeping</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Free Guides for Bookkeepers</h1>
          <p className="text-slate-400 text-lg">WIP reports, job costing, retainage, and QuickBooks Online — everything you need to serve construction contractor clients.</p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="border border-slate-200 rounded-2xl p-7 hover:border-amber-400 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">{post.tag}</span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <span className="text-xs text-slate-400">· {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{post.description}</p>
                <div className="mt-4 text-amber-600 text-sm font-semibold">Read article →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 py-16 mt-8">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Stop doing WIP reports manually</h2>
          <p className="text-slate-400 mb-8">ReconcileBook pulls everything from QuickBooks automatically. Job costing, WIP schedules, retainage — done in 30 seconds.</p>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors">
            Start for $99/month →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} ReconcileBook</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
            <a href="mailto:alex@reconcilebookapp.com" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
