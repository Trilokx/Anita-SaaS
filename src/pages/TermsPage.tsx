import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  const lastUpdated = 'April 2025';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand selection:text-[#050505]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
              Legal
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="space-y-12 text-gray-300 leading-relaxed text-base">

            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Agreement &amp; Acceptance</h2>
              <p>
                These Terms of Service ("Terms") govern the use of services provided by Elevate ("we", "our", or "us"), a digital marketing agency based in Dubai, UAE. By engaging our services, signing a service agreement, or making a payment, you ("Client") confirm that you have read, understood, and agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Services</h2>
              <p className="mb-4">Elevate provides digital marketing services including, but not limited to:</p>
              <ul className="space-y-2 mb-4">
                {[
                  'Website design and development',
                  'Google Business Profile optimisation',
                  'Social media management and content creation',
                  'AI chatbot setup and management',
                  'Paid advertising campaign management',
                  'Lead generation and sales outreach',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                The specific services, scope, and deliverables applicable to your engagement are confirmed in a written service agreement or proposal prior to the commencement of work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Payment Terms</h2>
              <ul className="space-y-4">
                {[
                  { title: 'Minimum commitment', desc: 'All service packages require a minimum engagement of 3 months. This ensures sufficient time to deliver measurable results.' },
                  { title: 'Setup fee', desc: 'A one-time setup fee applies to all packages and is due prior to the commencement of work.' },
                  { title: 'Monthly retainer', desc: 'The monthly service fee is invoiced in advance at the beginning of each billing period.' },
                  { title: 'Payment method', desc: 'Accepted payment methods are confirmed in the service agreement. Late payments may result in a suspension of services.' },
                  { title: 'Custom pricing', desc: 'For bespoke or enterprise engagements, pricing is agreed upon in writing before project kick-off.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span><span className="text-white font-medium">{item.title}:</span> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Client Responsibilities</h2>
              <p className="mb-4">To enable us to deliver our services effectively, you agree to:</p>
              <ul className="space-y-2">
                {[
                  'Provide accurate and complete information about your business',
                  'Supply necessary assets (logos, photos, brand materials) in a timely manner',
                  'Grant access to relevant accounts (website, Google Business Profile, ad accounts) as required',
                  'Review and approve content or deliverables within the agreed timelines',
                  'Designate a point of contact for communication and approvals',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Delays caused by the Client's failure to provide required materials or approvals may impact timelines and are not the responsibility of Elevate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                Upon full payment of all fees owed, the Client receives ownership of the final deliverables (e.g., website files, custom content) created specifically for their project, excluding:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Third-party assets (stock imagery, licensed fonts, plugins) which remain subject to their original licences',
                  'Proprietary tools, templates, or frameworks developed by Elevate',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Elevate retains the right to display completed work in its portfolio and marketing materials unless the Client expressly requests otherwise in writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary or sensitive information disclosed during the engagement. This obligation continues after the termination of the service agreement. Neither party will disclose the other's confidential information to any third party without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                Elevate provides services on a best-efforts basis. We do not guarantee specific outcomes such as a defined number of leads, a particular search ranking, or a specific return on investment, as results depend on multiple factors outside our control (market conditions, competition, algorithm changes, etc.).
              </p>
              <p>
                To the maximum extent permitted by applicable law, Elevate's total liability arising from or related to the provision of services shall not exceed the total fees paid by the Client in the three months preceding the claim. We shall not be liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Termination</h2>
              <ul className="space-y-4">
                {[
                  { title: 'Notice period', desc: 'Either party may terminate the engagement after the 3-month minimum period by providing 30 days\' written notice.' },
                  { title: 'Early termination', desc: 'Termination before the end of the minimum commitment period does not entitle the Client to a refund of fees already paid.' },
                  { title: 'Termination for cause', desc: 'Either party may terminate immediately in cases of material breach that is not remedied within 14 days of written notice.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span><span className="text-white font-medium">{item.title}:</span> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from or related to these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">10. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. The revised version will be posted on this page with an updated date. Continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">11. Contact</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-4 bg-[#111] border border-white/10 rounded-2xl p-6 space-y-2">
                <p><span className="text-white font-medium">Company:</span> Elevate</p>
                <p><span className="text-white font-medium">Location:</span> Dubai, United Arab Emirates</p>
                <p><span className="text-white font-medium">Contact:</span> Via WhatsApp (link in navigation) or through our website contact form</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
