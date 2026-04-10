import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Bot,
  Megaphone,
  Target,
  Check,
  MessageCircle,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { SERVICES, BUNDLES, SETUP_FEE } from '../data/pricing';

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

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  globe: <Globe size={20} />,
  bot: <Bot size={20} />,
  megaphone: <Megaphone size={20} />,
  target: <Target size={20} />
};

export default function PricingBuilder() {
  const [selections, setSelections] = useState<Record<string, number | 'custom' | null>>({
    website: null,
    aiChat: null,
    social: null,
    ads: null
  });
  const [activeBundle, setActiveBundle] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const { min, max, hasPercentage } = useMemo(() => {
    let min = 0;
    let max = 0;
    let hasPercentage = false;

    for (const [id, tierIdx] of Object.entries(selections)) {
      if (tierIdx === null || tierIdx === 'custom') continue;
      const service = SERVICES.find(s => s.id === id);
      if (!service) continue;
      const tier = service.tiers[tierIdx as number];
      if (tier.isPercentage) {
        hasPercentage = true;
        continue;
      }
      min += tier.priceMin;
      max += tier.priceMax;
    }

    return { min, max, hasPercentage };
  }, [selections]);

  const selectedCount = Object.values(selections).filter(v => v !== null).length;

  const selectTier = (serviceId: string, tierIdx: number | 'custom') => {
    setSelections(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === tierIdx ? null : tierIdx
    }));
    setActiveBundle(null);
  };

  const selectBundle = (bundleId: string) => {
    const bundle = BUNDLES.find(b => b.id === bundleId);
    if (!bundle) return;

    if (activeBundle === bundleId) {
      // Deselect bundle
      setActiveBundle(null);
      setSelections({ website: null, aiChat: null, social: null, ads: null });
      return;
    }

    setActiveBundle(bundleId);
    setSelections({
      website: null,
      aiChat: null,
      social: null,
      ads: null,
      ...bundle.selections
    });
  };

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    for (const [id, tierIdx] of Object.entries(selections)) {
      if (tierIdx === null) continue;
      const service = SERVICES.find(s => s.id === id);
      if (!service) continue;
      if (tierIdx === 'custom') {
        lines.push(`• ${service.name}: Custom solution`);
        continue;
      }
      const tier = service.tiers[tierIdx as number];
      if (tier.isPercentage) {
        lines.push(`• ${service.name}: ${tier.name} (${tier.label})`);
      } else {
        lines.push(`• ${service.name}: ${tier.name} ($${tier.priceMin.toLocaleString()}–$${tier.priceMax.toLocaleString()}/mo)`);
      }
    }

    if (lines.length === 0) {
      return "Hi! I'd like to get a custom quote for Elevate's services. Can we schedule a call?";
    }

    let msg = `Hi! I'd like a quote for the following Elevate services:\n\n${lines.join('\n')}`;
    if (min > 0 || max > 0) {
      msg += `\n\nEstimated: $${min.toLocaleString()}–$${max.toLocaleString()}/mo`;
      if (hasPercentage) msg += ' + ad spend %';
    }
    msg += '\n\nPlease get in touch so we can get started!';
    return msg;
  };

  const formatPrice = (v: number) => `$${v.toLocaleString()}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
          Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Build Your <span className="text-brand">Growth Package</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Select the services you need. Mix and match — or pick a bundle. All prices are monthly retainers.
        </p>
      </div>

      {/* Bundle Presets */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {BUNDLES.map((bundle) => (
          <motion.button
            key={bundle.id}
            onClick={() => selectBundle(bundle.id)}
            whileHover={{ y: -2 }}
            className={`relative p-6 rounded-2xl border text-left transition-all ${
              activeBundle === bundle.id
                ? 'border-brand bg-brand/10 shadow-lg shadow-brand/10'
                : bundle.highlight
                ? 'border-brand/30 bg-[#111] hover:border-brand/50'
                : 'border-white/10 bg-[#111] hover:border-white/20'
            }`}
          >
            {bundle.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-[#050505] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={12} /> Most Popular
              </span>
            )}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-white text-lg">{bundle.name}</h3>
              {activeBundle === bundle.id && (
                <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#050505]" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-4">{bundle.tagline}</p>
            <div className="text-brand font-bold text-xl">
              {formatPrice(bundle.priceMin)}–{formatPrice(bundle.priceMax)}
              <span className="text-sm font-normal text-gray-400">/mo</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Service Cards — 2-col grid inside the 2/3 space */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 mb-6 lg:mb-0">
          {SERVICES.map((service) => {
            const selected = selections[service.id];
            const isExpanded = expandedService === service.id;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all ${
                  selected !== null
                    ? 'border-brand/40 bg-brand/5'
                    : 'border-white/10 bg-[#111]'
                }`}
              >
                {/* Card Header */}
                <button
                  className="w-full p-5 flex items-center justify-between"
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      selected !== null ? 'bg-brand/20 text-brand' : 'bg-white/5 text-gray-400'
                    }`}>
                      {SERVICE_ICONS[service.icon]}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">{service.name}</p>
                      {selected !== null && selected !== 'custom' && (
                        <p className="text-xs text-brand">
                          {service.tiers[selected as number]?.isPercentage
                            ? service.tiers[selected as number].label
                            : `${service.tiers[selected as number]?.name} — ${formatPrice(service.tiers[selected as number]?.priceMin)}–${formatPrice(service.tiers[selected as number]?.priceMax)}/mo`
                          }
                        </p>
                      )}
                      {selected === 'custom' && (
                        <p className="text-xs text-brand">Custom solution</p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>

                {/* Tier Options */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {service.tiers.map((tier, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectTier(service.id, idx)}
                            className={`w-full p-3 rounded-xl border text-left transition-all ${
                              selections[service.id] === idx
                                ? 'border-brand bg-brand/10 shadow-sm shadow-brand/10'
                                : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-sm text-white">{tier.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-brand">
                                  {tier.isPercentage ? tier.label : `${formatPrice(tier.priceMin)}–${formatPrice(tier.priceMax)}/mo`}
                                </span>
                                {selections[service.id] === idx && (
                                  <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center shrink-0">
                                    <Check size={10} className="text-[#050505]" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <ul className="space-y-0.5">
                              {tier.features.map((f, i) => (
                                <li key={i} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </button>
                        ))}

                        {/* Custom option */}
                        <button
                          onClick={() => selectTier(service.id, 'custom')}
                          className={`w-full p-3 rounded-xl border text-left transition-all ${
                            selections[service.id] === 'custom'
                              ? 'border-brand bg-brand/10'
                              : 'border-white/5 bg-[#0a0a0a] hover:border-white/15'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-sm text-white/60">Enterprise / Custom</span>
                            <span className="text-xs text-gray-500">Let's talk</span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Sticky Estimate Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-white text-lg mb-1">Your Estimate</h3>
            <p className="text-xs text-gray-500 mb-6">
              {selectedCount === 0 ? 'Select services to see your estimate' : `${selectedCount} service${selectedCount > 1 ? 's' : ''} selected`}
            </p>

            {/* Price Display */}
            <div className="mb-6">
              {selectedCount > 0 && (min > 0 || max > 0) ? (
                <>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatPrice(min)}
                    <span className="text-xl text-gray-400">–{formatPrice(max)}</span>
                  </div>
                  <p className="text-sm text-gray-400">estimated / month</p>
                  {hasPercentage && (
                    <p className="text-xs text-gray-500 mt-1">+ ad management fee (10–15% of spend)</p>
                  )}
                </>
              ) : selectedCount > 0 ? (
                <>
                  <div className="text-2xl font-bold text-brand mb-1">Custom Quote</div>
                  <p className="text-sm text-gray-400">We'll tailor a package for you</p>
                </>
              ) : (
                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
              )}
            </div>

            {/* Setup Fee Note */}
            {selectedCount > 0 && (
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 mb-6 text-xs text-gray-400">
                <span className="font-semibold text-white">+ One-time setup fee:</span> {formatPrice(SETUP_FEE.min)}–{formatPrice(SETUP_FEE.max)}<br />
                Covers onboarding, setup & integration
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  const msg = buildWhatsAppMessage();
                  const encoded = encodeURIComponent(msg);
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
                }}
                className="w-full bg-brand text-[#050505] py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#9DDF00] transition-colors"
              >
                <MessageCircle size={16} />
                {selectedCount > 0 ? 'Request This Package' : 'Request Custom Quote'}
              </button>

              <button
                onClick={openCalendly}
                className="w-full bg-transparent border border-white/10 text-white py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
              >
                <PhoneCall size={16} className="text-brand" />
                Book a Free Call
              </button>
            </div>

            <p className="text-center text-xs text-gray-600 mt-4">
              All packages require a 3-month minimum.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111]/95 backdrop-blur-md border-t border-white/10 p-4"
          >
            <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
              <div>
                <p className="text-xs text-gray-400">{selectedCount} service{selectedCount > 1 ? 's' : ''} selected</p>
                {min > 0 && (
                  <p className="font-bold text-white text-lg">{formatPrice(min)}–{formatPrice(max)}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                )}
                {min === 0 && selectedCount > 0 && (
                  <p className="font-bold text-brand">Custom Quote</p>
                )}
              </div>
              <button
                onClick={() => {
                  const msg = buildWhatsAppMessage();
                  const encoded = encodeURIComponent(msg);
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
                }}
                className="bg-brand text-[#050505] px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shrink-0 hover:bg-[#9DDF00] transition-colors"
              >
                <MessageCircle size={16} /> Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
