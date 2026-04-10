import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="space-y-12 text-gray-300 leading-relaxed text-base">

            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Elevate ("we", "our", or "us") is a digital marketing agency based in Dubai, UAE. We are committed to protecting the personal information of our clients, website visitors, and contacts. This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data.
              </p>
              <p className="mt-4">
                By using our website or engaging our services, you agree to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect the following categories of information:</p>
              <ul className="space-y-3">
                {[
                  { title: 'Contact details', desc: 'Name, email address, phone number, and business name — provided when you fill in a form, contact us via WhatsApp, or book a consultation.' },
                  { title: 'Business information', desc: 'Website URL, industry, and goals shared during consultations or audits.' },
                  { title: 'Chat data', desc: 'Messages submitted through our AI chatbot widget. These are used to respond to your queries and improve our service.' },
                  { title: 'Usage data', desc: 'Anonymous data about how visitors interact with our website, including pages viewed and session duration. Collected via standard server logs.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span><span className="text-white font-medium">{item.title}:</span> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="space-y-2">
                {[
                  'Deliver and manage our digital marketing services',
                  'Respond to inquiries and consultation requests',
                  'Send relevant updates about your project or our services (with your consent)',
                  'Improve the quality and functionality of our website and AI assistant',
                  'Comply with applicable legal obligations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                We do not sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Data Storage &amp; Security</h2>
              <p>
                Your data is stored on secure servers. Our website is hosted via Vercel, which applies industry-standard security measures. We implement appropriate technical and organisational safeguards to protect your information against unauthorised access, loss, or misuse.
              </p>
              <p className="mt-4">
                We retain personal data only as long as necessary for the purpose it was collected, or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
              <p className="mb-4">Our website and services integrate with the following third-party platforms. Each operates under its own privacy policy:</p>
              <ul className="space-y-3">
                {[
                  { name: 'Google', purpose: 'Business Profile optimisation, analytics, and AI processing (Gemini API).' },
                  { name: 'WhatsApp (Meta)', purpose: 'Direct client communication via the WhatsApp Business platform.' },
                  { name: 'Calendly', purpose: 'Scheduling consultation calls. When you book via Calendly, their privacy policy applies to the data you provide there.' },
                  { name: 'Vercel', purpose: 'Website hosting and serverless function execution.' },
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span><span className="text-white font-medium">{item.name}:</span> {item.purpose}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="space-y-2">
                {[
                  'Access the personal data we hold about you',
                  'Request correction of inaccurate data',
                  'Request deletion of your data',
                  'Object to or restrict certain processing activities',
                  'Withdraw consent at any time (where processing is based on consent)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us via WhatsApp or email. We will respond within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Cookies</h2>
              <p>
                Our website does not use tracking or advertising cookies. We may use essential technical cookies solely to ensure the website functions correctly (e.g., session handling). No personal data is stored through cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last revised. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
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
