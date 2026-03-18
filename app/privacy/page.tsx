import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — ReconcileBook',
  description: 'How ReconcileBook collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900">ReconcileBook</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to home</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: March 18, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Who We Are</h2>
            <p>ReconcileBook ("we", "us", or "our") is a software-as-a-service tool built for construction bookkeepers. We provide WIP schedule generation, job costing reports, and multi-client management by connecting to QuickBooks Online accounts via secure OAuth. Our website is <strong>reconcilebook.com</strong> and you can contact us at <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">alex@reconcilebookapp.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Account Information</h3>
            <p>When you create an account, we collect your email address and password (stored securely via Supabase Auth).</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">QuickBooks Data</h3>
            <p>When you connect a client's QuickBooks Online account, we receive and store OAuth access tokens to retrieve financial data on your behalf. We access: customers, invoices, estimates, bills, and expenses. We do not store raw financial records permanently — data is fetched live when you open a report.</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">Payment Information</h3>
            <p>Subscription payments are processed by Stripe. We do not store your credit card details. Stripe's privacy policy applies to payment data.</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">Usage Data</h3>
            <p>We may collect anonymized usage data (pages visited, features used) to improve the product. We use Vercel Analytics for this purpose.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>To provide and operate the ReconcileBook service</li>
              <li>To generate WIP schedules, job costing reports, and financial summaries from your clients' QuickBooks data</li>
              <li>To process subscription payments via Stripe</li>
              <li>To send you product-related emails (account confirmation, billing receipts, important updates)</li>
              <li>To improve and debug the product based on usage patterns</li>
            </ul>
            <p className="mt-4">We do not sell your data or your clients' financial data to any third party. We do not use your QuickBooks data for advertising.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. QuickBooks OAuth & Data Access</h2>
            <p>ReconcileBook connects to QuickBooks Online via Intuit's official OAuth 2.0 flow. By connecting a QuickBooks account, you authorize us to read the financial data necessary to generate reports. You can disconnect any QuickBooks account at any time from your ReconcileBook dashboard, which revokes our access to that account's data.</p>
            <p className="mt-3">We comply with Intuit's developer terms and do not access any QuickBooks data beyond what is necessary to operate the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Storage & Security</h2>
            <p>Your account data and QuickBooks OAuth tokens are stored securely in Supabase (hosted on AWS). All data is encrypted in transit (TLS) and at rest. We follow industry best practices for access control and security.</p>
            <p className="mt-3">We retain your data for as long as your account is active. If you cancel your account and request deletion, we will delete your data within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Third-Party Services</h2>
            <p>We use the following third-party services to operate ReconcileBook:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-700">
              <li><strong>Supabase</strong> — authentication and database</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Intuit / QuickBooks Online</strong> — financial data access via OAuth</li>
              <li><strong>Vercel</strong> — hosting and analytics</li>
            </ul>
            <p className="mt-3">Each service has its own privacy policy governing how they handle data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-700">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Disconnect any QuickBooks account at any time</li>
              <li>Cancel your subscription at any time — no penalties</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">alex@reconcilebookapp.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p>ReconcileBook uses only functional cookies required for authentication (session tokens). We do not use advertising cookies or third-party tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Children's Privacy</h2>
            <p>ReconcileBook is a professional business tool and is not directed at children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by a notice in the app. Continued use of ReconcileBook after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-3 bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="font-semibold text-slate-900">ReconcileBook</p>
              <p className="text-slate-600 mt-1">Email: <a href="mailto:alex@reconcilebookapp.com" className="text-amber-600 hover:underline">alex@reconcilebookapp.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} ReconcileBook. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors font-medium text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
