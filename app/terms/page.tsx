import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — ReconcileBook',
  description: 'Terms and conditions for using ReconcileBook.',
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: March 18, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By creating an account or using ReconcileBook ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service. These terms apply to all users, including bookkeepers, CPAs, and any other professionals who access the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>ReconcileBook is a software-as-a-service platform that connects to QuickBooks Online accounts via Intuit's OAuth API and generates WIP (Work-in-Progress) schedules, job costing reports, and over/under billing summaries for construction bookkeepers and their clients.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Account Registration</h2>
            <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access to your account. You must be at least 18 years old to use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Subscription & Payment</h2>
            <h3 className="text-base font-semibold text-slate-800 mb-2">Subscription Plans</h3>
            <p>ReconcileBook offers a monthly subscription at $99/month (or as otherwise listed on our pricing page). Your subscription gives you access to all features including unlimited client connections, WIP schedules, job costing reports, and PDF exports.</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">Free Trial</h3>
            <p>We may offer a free trial period. At the end of the trial, your subscription will automatically begin unless you cancel before the trial ends.</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">Billing</h3>
            <p>Subscriptions are billed monthly. Payments are processed securely by Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis until you cancel.</p>
            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">Cancellation & Refunds</h3>
            <p>You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period — you retain access until then. We do not offer refunds for partial months, but we will not charge you after cancellation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. QuickBooks Integration</h2>
            <p>By connecting a QuickBooks Online account to ReconcileBook, you confirm that you have authorization to access that account's data — either as the account owner or as an authorized accountant/bookkeeper. You are responsible for ensuring you have proper client authorization before connecting their QuickBooks account.</p>
            <p className="mt-3">We access QuickBooks data solely to provide the Service. We do not modify, delete, or write data to QuickBooks accounts — we are read-only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-700">
              <li>Use the Service for any unlawful purpose or in violation of any laws</li>
              <li>Connect QuickBooks accounts without proper authorization from the account owner</li>
              <li>Attempt to reverse-engineer, hack, or disrupt the Service</li>
              <li>Share your account credentials with others or resell access to the Service</li>
              <li>Use the Service to process data for clients without their knowledge or consent</li>
              <li>Upload or transmit malicious code or interfere with the Service's security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Data & Confidentiality</h2>
            <p>ReconcileBook processes your clients' QuickBooks financial data on your behalf. We treat all financial data as confidential and do not share it with third parties except as required to operate the Service (e.g., storing OAuth tokens in our secure database). See our <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link> for full details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Accuracy of Reports</h2>
            <p>ReconcileBook generates reports based on data retrieved from QuickBooks Online. The accuracy of reports depends on the accuracy of data entered in QuickBooks. We make no guarantees about the completeness or accuracy of any report, and reports should not be used as the sole basis for financial decisions without independent verification by a qualified accounting professional.</p>
            <p className="mt-3">ReconcileBook is a reporting and productivity tool, not a substitute for professional accounting advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Intellectual Property</h2>
            <p>ReconcileBook and its original content, features, and functionality are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without our written permission.</p>
            <p className="mt-3">You retain ownership of all data you bring into the Service (including your clients' QuickBooks data). We claim no ownership over your financial data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We do not warrant that reports generated by the Service are error-free or suitable for any particular purpose.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ReconcileBook shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service, including but not limited to loss of profits, data, or business opportunities. Our total liability to you for any claim arising from your use of the Service shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Termination</h2>
            <p>We reserve the right to suspend or terminate your account if you violate these Terms of Service, fail to pay your subscription, or engage in fraudulent activity. You may terminate your account at any time by cancelling your subscription and contacting us. Upon termination, your access to the Service will end and we will delete your data as described in our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">13. Changes to Terms</h2>
            <p>We may update these Terms of Service from time to time. We will notify you of significant changes by email or in-app notice. Continued use of the Service after changes constitutes your acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">14. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the United States. Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration or in a court of competent jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">15. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors font-medium text-slate-900">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
