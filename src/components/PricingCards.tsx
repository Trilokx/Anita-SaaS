import { motion } from 'motion/react';
import { Check, MessageCircle, PhoneCall, Sparkles, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

const WHATSAPP_NUMBER = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '31612345678';
const CALENDLY_URL = (import.meta as any).env?.VITE_CALENDLY_URL || 'https://calendly.com/anita-elevate/consult';

function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}

function openWhatsApp(msg: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  setupFee: number;
  highlight: boolean;
  features: string[];
  cta: string;
  ctaMsg: string;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Bundle',
    tagline: 'Get your business online and visible',
    price: 1500,
    setupFee: 800,
    highlight: false,
    features: [
      'Professional website (up to 5 pages)',
      '1 social media platform',
      '3 posts per week + graphics',
      'Basic AI chatbot on your site',
      'Monthly performance report',
      'WhatsApp & email support',
    ],
    cta: 'Get Started',
    ctaMsg: "Hi! I'm interested in the Starter Bundle ($1,500/mo). Can we schedule a call to get started?"
  },
  {
    id: 'growth',
    name: 'Growth Bundle',
    tagline: 'Scale your presence and capture more leads',
    price: 3000,
    setupFee: 1500,
    highlight: true,
    features: [
      'Standard website + landing pages',
      '2 social media platforms (daily posts)',
      'Custom AI chatbot + lead capture',
      'Google Business optimization',
      'Starter ad campaign management',
      'Bi-weekly strategy calls',
      'Detailed analytics dashboard',
    ],
    cta: 'Start Growing',
    ctaMsg: "Hi! I'm interested in the Growth Bundle ($3,000/mo). Can we schedule a call to get started?"
  },
  {
    id: 'fullstack',
    name: 'Full-Stack',
    tagline: 'Your entire digital presence, fully managed',
    price: 5000,
    setupFee: 2000,
    highlight: false,
    features: [
      'Premium website + ongoing redesigns',
      'All social platforms — full management',
      'Enterprise AI — multi-channel, CRM sync',
      'Full ad management ($10k+ spend)',
      'Outreach & sales automation',
      'Dedicated account manager',
      'Weekly reports + priority support',
    ],
    cta: 'Go Full-Stack',
    ctaMsg: "Hi! I'm interested in the Full-Stack package ($5,000/mo). Can we schedule a call to get started?"
  }
];

export default function PricingCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
          Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Simple, <span className="text-brand">Transparent Pricing</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          No hidden fees. Pick the package that fits your ambitions — and upgrade any time.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 items-start mb-10">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-[2rem] p-8 flex flex-col transition-transform hover:-translate-y-1 ${
              plan.highlight
                ? 'bg-brand text-[#050505] shadow-2xl shadow-brand/20'
                : 'bg-[#111] text-white border border-white/10 hover:border-brand/20'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#050505] text-brand border border-brand/30 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles size={12} /> Most Popular
              </div>
            )}

            {/* Plan Name + Tagline */}
            <div className="mb-8">
              <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-[#050505]' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-[#050505]/70' : 'text-gray-400'}`}>
                {plan.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className={`text-5xl font-bold mb-1 ${plan.highlight ? 'text-[#050505]' : 'text-white'}`}>
                ${plan.price.toLocaleString()}
              </div>
              <div className={`text-sm font-medium ${plan.highlight ? 'text-[#050505]/60' : 'text-gray-500'}`}>
                per month
              </div>
              <div className={`mt-2 text-xs ${plan.highlight ? 'text-[#050505]/50' : 'text-gray-600'}`}>
                + ${plan.setupFee.toLocaleString()} one-time setup fee
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    plan.highlight ? 'bg-[#050505]/15' : 'bg-brand/10'
                  }`}>
                    <Check size={12} className={plan.highlight ? 'text-[#050505]' : 'text-brand'} />
                  </div>
                  <span className={`text-sm leading-relaxed ${plan.highlight ? 'text-[#050505]/80' : 'text-gray-300'}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => openWhatsApp(plan.ctaMsg)}
              className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                plan.highlight
                  ? 'bg-[#050505] text-brand hover:bg-[#111]'
                  : 'bg-brand text-[#050505] hover:bg-[#9DDF00]'
              }`}
            >
              {plan.cta} <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom strip: Custom Enterprise */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <p className="font-bold text-white text-lg">Need something fully custom?</p>
          <p className="text-gray-400 text-sm">
            Enterprise solutions, white-label, or specific industries — let's build it together.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => openWhatsApp("Hi! I'm looking for a custom enterprise solution from Elevate. Can we discuss options?")}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            <MessageCircle size={16} className="text-brand" /> WhatsApp
          </button>
          <button
            onClick={openCalendly}
            className="flex items-center gap-2 bg-brand text-[#050505] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#9DDF00] transition-colors"
          >
            <PhoneCall size={16} /> Book a Call
          </button>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-600 mt-6">
        All packages require a 3-month minimum. Prices are indicative — final pricing confirmed after consultation.
      </p>
    </div>
  );
}
