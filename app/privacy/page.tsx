'use client'
import Link from 'next/link'

export default function PrivacyPage() {
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
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to home</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview</h2>
            <p>ReconcileBook ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our service at reconcilebook.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account information:</strong> Email address and password when you create an account.</li>
              <li><strong>QuickBooks data:</strong> We access your QuickBooks Online data (customers, invoices, bills, estimates) solely to generate reports. We do not permanently store your financial transaction data.</li>
              <li><strong>Billing information:</strong> Payment is processed by Stripe. We do not store credit card numbers — only your Stripe customer ID and subscription status.</li>
              <li><strong>Usage data:</strong> Page views and basic analytics via Vercel Analytics to improve the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and operate the ReconcileBook service</li>
              <li>To generate job costing and WIP reports from your QuickBooks data</li>
              <li>To process payments and manage your subscription</li>
              <li>To send transactional emails (account confirmation, password reset)</li>
              <li>To improve and develop the product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. QuickBooks Data</h2>
            <p>ReconcileBook connects to QuickBooks Online via the official Intuit API using OAuth 2.0. We only read your data to generate reports — we never modify, delete, or sell your QuickBooks data. OAuth tokens are stored securely and used only to fetch data on your request.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information. We share data only with trusted third-party services necessary to operate ReconcileBook:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Vercel</strong> — hosting and analytics</li>
              <li><strong>Intuit/QuickBooks</strong> — data access via API</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
            <p>We implement industry-standard security measures including encrypted connections (HTTPS), secure token storage, and row-level security in our database. No method of transmission over the internet is 100% secure, but we take reasonable precautions to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. If you cancel your subscription and delete your account, your data will be removed within 30 days. QuickBooks financial data is fetched live and not stored permanently.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To request data deletion or export, contact us at <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">alex@reconcilebookapp.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Cookies</h2>
            <p>We use essential cookies for authentication (keeping you logged in). We do not use advertising cookies or sell data to advertisers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p>Questions about this Privacy Policy? Email us at <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">alex@reconcilebookapp.com</a>.</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between text-sm text-slate-400">
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
