import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { openCalendly, openWhatsApp } from '../lib/contact';
import { Calendar, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQ_ITEMS = [
  {
    question: 'What does Elevate do exactly?',
    answer: 'We help small businesses grow online. That includes building professional websites, optimizing your Google Business Profile, managing social media, setting up AI chatbots, and running ad campaigns — all tailored to your specific business goals.'
  },
  {
    question: 'Who is this for?',
    answer: 'Our services are designed for small to mid-sized businesses — especially service-based companies like clinics, salons, restaurants, consultancies, and local shops — that want to attract more clients online but don\'t have the time or expertise to do it themselves.'
  },
  {
    question: 'What is the Founding Client offer?',
    answer: 'As a new agency, we\'re offering our first clients 50% off for the first 3 months. In return, we ask for an honest review or testimonial after working together. After 3 months, regular pricing applies. It\'s a win-win: you get premium services at half price, and we build our portfolio.'
  },
  {
    question: 'How long before I see results?',
    answer: 'It depends on the service. A website can be live within 1-2 weeks. Google Business Profile improvements often show results within 2-4 weeks. Social media and ad campaigns typically need 4-8 weeks to gain traction. We set clear expectations during your free consultation.'
  },
  {
    question: 'Do I need to sign a long-term contract?',
    answer: 'No. Our Founding Client offer runs for 3 months at the discounted rate. After that, you can continue month-to-month at regular pricing or cancel anytime with 30 days notice. Plus, we offer a 30-day money-back guarantee if you\'re not satisfied.'
  },
  {
    question: 'What if I already have a website?',
    answer: 'That\'s fine! We can audit your current website and either optimize it or build a new one if needed. During your free consultation, we\'ll review what you have and recommend the best path forward — no pressure.'
  },
  {
    question: 'How does the free audit work?',
    answer: 'Enter your business name or URL on our homepage, and we\'ll personally review your online presence — Google visibility, website performance, social media, and more. We\'ll reach out via WhatsApp with a clear overview of opportunities. No obligations, no sales pitch.'
  },
  {
    question: 'Are you based in Dubai?',
    answer: 'Yes, we\'re based in Dubai, UAE. We work with businesses locally and internationally. All communication happens via WhatsApp, video calls, and email — so location is never a barrier.'
  },
  {
    question: 'What makes Elevate different from other agencies?',
    answer: 'Three things: we combine a data-driven, scientific approach with hands-on digital marketing expertise. We use AI and automation to deliver more for less. And as a boutique agency, you get personal attention — not a ticket number in a queue.'
  },
  {
    question: 'Can I just start with one service?',
    answer: 'Absolutely. While our bundles offer the best value, we can customize a plan around a single service — like just a website, or just Google Business optimization. Let\'s discuss what makes sense for your goals during a free call.'
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left gap-4"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-brand" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 leading-relaxed pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand selection:text-[#050505]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-16 text-center">
            <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
              FAQ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Everything you need to know about working with Elevate. Can't find your answer? Reach out directly.
            </p>
          </div>

          {/* FAQ List */}
          <div className="mb-16">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Book a free consultation or send us a message — we're happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openCalendly}
                className="bg-brand text-[#050505] px-8 py-3 rounded-full font-semibold hover:bg-[#9DDF00] transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Book a Free Call
              </button>
              <button
                onClick={() => openWhatsApp("Hi! I have a question that's not covered in the FAQ.")}
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
