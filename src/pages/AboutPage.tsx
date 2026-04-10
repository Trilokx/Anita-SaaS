import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly, openWhatsApp } from '../lib/contact';
import { Calendar, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand selection:text-[#050505]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-16">
            <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Who We Are
            </h1>
            <p className="text-xl text-brand font-semibold">
              Digital Marketing &amp; Google Visibility Specialist
            </p>
          </div>

          {/* Section 1 — Background */}
          <section className="mb-16">
            <div className="prose-custom space-y-5 text-gray-300 leading-relaxed text-base">
              <p>
                With a background in biomedical and pharmaceutical sciences, I developed a strong analytical and results-driven mindset — working in environments where precision, data, and performance are essential.
              </p>
              <p>
                Over time, my passion evolved into digital marketing, where I discovered the power of combining data, strategy, and AI to help businesses grow.
              </p>
              <p>
                Today, I focus on helping small businesses become visible online and turn that visibility into real customers.
              </p>
              <p>
                Many businesses lose opportunities simply because they are not properly set up on platforms like Google Business Profile or lack a strong digital presence. That's exactly where I help.
              </p>
            </div>
          </section>

          <div className="border-t border-white/5 mb-16" />

          {/* Section 2 — Partnership */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">In Partnership With <a href="https://velko.io/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Velko</a></h2>
            <div className="space-y-5 text-gray-300 leading-relaxed text-base">
              <p>
                Through my collaboration with <a href="https://velko.io/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Velko</a>, I combine strategic insight with technical execution — ensuring that every solution is not only effective but also scalable and future-proof.
              </p>
              <p>
                This partnership allows us to deliver a complete approach, from visibility to conversion and automation.
              </p>
            </div>
          </section>

          <div className="border-t border-white/5 mb-16" />

          {/* Section 3 — What We Do */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">What We Do</h2>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">We help small businesses grow through:</p>
            <ul className="space-y-4">
              {[
                'Google Business Profile optimization (visibility & ranking)',
                'High-converting website creation',
                'Stronger presence on Google and social media',
                'AI-powered automated response systems (so no customer is missed)',
                'Turning online searches into real leads and bookings',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-white/5 mb-16" />

          {/* Section 4 — Why It Matters */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Why It Matters</h2>
            <div className="space-y-5 text-gray-300 leading-relaxed text-base">
              <p>
                Every day, potential customers search for services like yours.
              </p>
              <p>
                If your business isn't visible, optimized, or responding quickly — those customers go to your competitors.
              </p>
              <p className="text-white font-medium">
                We make sure they find you first.
              </p>
            </div>
          </section>

          <div className="border-t border-white/5 mb-16" />

          {/* Section 5 — Certified & Data-Driven */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Certified &amp; Data-Driven</h2>
            <div className="space-y-5 text-gray-300 leading-relaxed text-base">
              <p>
                By combining a scientific background with hands-on digital marketing expertise, I approach business growth in a structured and results-focused way.
              </p>
              <p>
                Using AI and proven Google strategies, we help businesses grow with clarity, efficiency, and measurable results.
              </p>
            </div>
            <div className="mt-8">
              <img src="/images/google-certified.png" alt="Google Certified" className="h-16 object-contain" />
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to grow your business?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Book a free consultation and let's build a strategy tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openCalendly}
                className="bg-brand text-[#050505] px-8 py-3 rounded-full font-semibold hover:bg-[#9DDF00] transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Book a Free Call
              </button>
              <button
                onClick={() => openWhatsApp("Hi! I've read about Elevate and would like to learn more.")}
                className="bg-transparent border border-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="text-brand" /> WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
