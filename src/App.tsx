import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Star,
  MessageSquare,
  Megaphone,
  PhoneCall,
  BarChart3,
  Menu,
  X,
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Calendar
} from 'lucide-react';

// Config — Anita vult hier haar eigen waarden in
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '31612345678';
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/anita-elevate/consult';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}

function openWhatsApp(message = 'Hallo! Ik ben geïnteresseerd in de diensten van Elevate.') {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [auditBusiness, setAuditBusiness] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am the Elevate AI assistant. How can I help you grow your business today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = { role: 'user', content: chatMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setChatMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Sorry, I am having trouble connecting right now. Please try again or contact us via WhatsApp.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand selection:text-[#050505]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-[#050505] rounded-full" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">Elevate</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#audit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Free Audit</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={openCalendly}
                className="bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-[#050505] px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Calendar size={16} /> Book a Call
              </button>
            </div>

            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0A] border-b border-white/5 px-4 py-6 space-y-4 shadow-xl"
            >
              <a href="#features" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
              <a href="#pricing" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
              <a href="#audit" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Free Audit</a>
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => { openCalendly(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-brand text-[#050505] px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> Book a Call
                </button>
                <button
                  onClick={() => { openWhatsApp(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-white/5 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Your Partner in Smarter <span className="text-brand">Digital Growth</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Take control of your online presence with tools designed to help you attract clients, rank higher, and grow — effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={openCalendly}
                  className="bg-brand hover:bg-brand-dark text-[#050505] px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={20} /> Book a Free Call
                </button>
                <button
                  onClick={() => openWhatsApp('Hallo! Ik wil graag meer weten over jullie diensten.')}
                  className="bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} className="text-brand" />
                  WhatsApp Us
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Web Design', 'Google Reviews', 'Social Media', 'AI Chatbots', 'Acquisition'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-400 bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero Graphic (Dynamic & Animated) */}
            <div className="relative lg:ml-auto w-full max-w-lg h-[500px] flex items-center justify-center">
              {/* Pulsing background rings */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-brand/30 rounded-full scale-[1.2] shadow-[0_0_40px_rgba(178,255,5,0.15)]"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 border border-brand/20 rounded-full scale-[0.9]"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 border border-brand/10 rounded-full scale-[0.6]"
              ></motion.div>
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-sm bg-brand rounded-3xl p-6 shadow-2xl shadow-brand/20 transform -rotate-2"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-[#050505] font-bold text-lg">Google Profile</div>
                  <div className="bg-white/30 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 text-[#050505]">
                    5.0 <Star size={14} className="fill-[#050505]" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-[#050505]/10 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-[#050505]/10 rounded-full"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#050505]/10 flex justify-between items-center">
                  <div className="text-sm font-medium text-[#050505]/80">New Leads</div>
                  <div className="text-xl font-bold text-[#050505]">+142%</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 z-20 w-64 bg-[#111] rounded-3xl p-5 shadow-2xl border border-white/10 transform rotate-3"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">AI Assistant</div>
                    <div className="text-xs text-brand">Active 24/7</div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-3 text-xs text-gray-300 border border-white/5">
                  "Hi! How can I help you today?"
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Achieve <span className="text-brand">digital clarity</span> and take control of your future with tools designed to simplify, streamline, and personalize your <span className="text-brand">online marketing</span>.
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Everything you need. Nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Web Design & Dev",
                desc: "Sleek, aesthetic websites built to convert. Fully optimized for mobile and search engines.",
                icon: <Globe size={28} />,
                isBrand: true
              },
              {
                title: "Google Business",
                desc: "We optimize your profile and implement automated systems to consistently gather 5-star reviews.",
                icon: <Star size={28} />,
                isBrand: true
              },
              {
                title: "Social Campaigns",
                desc: "Highly targeted ads on Facebook, Instagram, or LinkedIn to reach your exact ideal client.",
                icon: <Megaphone size={28} />,
                isBrand: true
              },
              {
                title: "AI Chatbots",
                desc: "Smart assistants on your site that answer questions 24/7 and qualify leads automatically.",
                icon: <MessageSquare size={28} />,
                isBrand: false
              },
              {
                title: "Outreach & Sales",
                desc: "We do the heavy lifting. Proactive calling and emailing to schedule qualified appointments.",
                icon: <PhoneCall size={28} />,
                isBrand: false
              },
              {
                title: "Data & Analytics",
                desc: "Complete transparency. We track every click and conversion to maximize your ROI.",
                icon: <BarChart3 size={28} />,
                isBrand: false
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-[2rem] h-full flex flex-col transition-transform hover:-translate-y-1 ${
                  feature.isBrand 
                    ? 'bg-brand text-[#050505]' 
                    : 'bg-[#111] text-white border border-white/5 hover:border-brand/30'
                }`}
              >
                <div className="mb-auto pb-12">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className={`text-sm leading-relaxed ${feature.isBrand ? 'text-[#050505]/80' : 'text-gray-400'}`}>
                    {feature.desc}
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mt-6 ${
                  feature.isBrand ? 'bg-white/30' : 'bg-white/5 text-brand'
                }`}>
                  {feature.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works / Pricing Section */}
      <section id="how-it-works" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Dark App UI Mockup */}
            <div className="bg-[#111] rounded-[2.5rem] p-8 shadow-2xl border border-white/5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[80px]"></div>
              
              <div className="flex justify-between items-center mb-12 relative z-10">
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full text-sm font-medium border border-white/5">
                  <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                  Custom Pricing
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="mb-12 relative z-10">
                <div className="text-brand text-sm font-medium mb-2">Tailored Investment</div>
                <div className="text-5xl font-bold text-white">Custom Built</div>
              </div>

              <div className="flex gap-4 relative z-10">
                <button
                  onClick={openCalendly}
                  className="flex-1 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 py-4 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} className="text-brand" /> Consult
                </button>
                <button
                  onClick={() => openWhatsApp('Hallo! Ik wil graag meer informatie over jullie diensten en prijzen.')}
                  className="flex-1 bg-[#1A1A1A] hover:bg-[#222] border border-white/5 py-4 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} className="text-brand" /> Request
                </button>
                <button
                  onClick={openCalendly}
                  className="w-14 bg-brand text-[#050505] rounded-2xl flex items-center justify-center hover:bg-brand-dark transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Right side: Steps */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
                Start Growing Your Business in 3 Easy Steps
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Personal Consultation",
                    desc: "We discuss your goals, current online presence, and where you want to be. No obligations.",
                    icon: <PhoneCall size={20} />
                  },
                  {
                    title: "Custom Strategy & Pricing",
                    desc: "We don't do one-size-fits-all. You receive a tailored plan and transparent pricing based on your needs.",
                    icon: <BarChart3 size={20} />
                  },
                  {
                    title: "Execution & Growth",
                    desc: "We build your foundation, launch campaigns, and set up automation. You focus on your clients.",
                    icon: <CheckCircle2 size={20} />
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 bg-brand/10 text-brand rounded-full flex items-center justify-center border border-brand/20">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Audit Section */}
      <section id="audit" className="py-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
            Free Audit
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Growth Potential
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Enter your business name or URL. We'll analyze your digital presence and send you a custom report within 24 hours. Try it free, no strings attached.
          </p>
          
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (!auditBusiness.trim()) return;
              openWhatsApp(`Hallo! Ik wil graag een gratis audit aanvragen voor: ${auditBusiness.trim()}`);
              setAuditBusiness('');
            }}
          >
            <input
              type="text"
              value={auditBusiness}
              onChange={(e) => setAuditBusiness(e.target.value)}
              placeholder="Your business name or URL..."
              className="flex-1 px-6 py-4 bg-[#111] border border-white/10 rounded-full focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder:text-gray-500 outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={!auditBusiness.trim()}
              className="bg-brand text-[#050505] px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Free Audit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-brand rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#050505] rounded-full" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">Elevate</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Your partner in smarter digital growth. We build the foundation so you can focus on your craft.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Services</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="#" className="hover:text-brand transition-colors">Web Design</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Google Reviews</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">AI Chatbots</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><a href="mailto:hello@elevatedigital.com" className="hover:text-brand transition-colors flex items-center gap-2"><Mail size={18}/> hello@elevatedigital.com</a></li>
                <li>
                  <button
                    onClick={() => openWhatsApp('Hallo! Ik heb een vraag over de diensten van Elevate.')}
                    className="hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={18}/> WhatsApp Us
                  </button>
                </li>
                <li className="flex items-center gap-2"><Globe size={18}/> Amsterdam, NL</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Elevate. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-[350px] bg-[#111] border border-white/10 shadow-2xl shadow-black rounded-3xl flex flex-col overflow-hidden"
              style={{ height: '500px' }}
            >
              {/* Chat Header */}
              <div className="bg-brand p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#050505] rounded-full animate-pulse"></div>
                  <span className="font-bold text-[#050505]">Elevate AI</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-[#050505] hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Quick Contact Links */}
              <div className="bg-[#0A0A0A] p-3 border-b border-white/5 flex justify-center gap-4">
                <button
                  onClick={() => openWhatsApp('Hallo! Ik wil graag direct contact opnemen met Elevate.')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-brand transition-colors bg-[#111] px-3 py-1.5 rounded-full shadow-sm border border-white/5"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <a href="mailto:hello@elevatedigital.com" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-brand transition-colors bg-[#111] px-3 py-1.5 rounded-full shadow-sm border border-white/5">
                  <Mail size={14} /> Email
                </a>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A0A]">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand text-[#050505] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
                        : 'bg-[#1A1A1A] text-white border border-white/5 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#1A1A1A] text-white border border-white/5 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl p-3">
                      <Loader2 size={16} className="animate-spin text-brand" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-[#111] border-t border-white/5">
                <div className="relative">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..." 
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder:text-gray-500 px-4 py-3 pr-12 rounded-full outline-none text-sm transition-all"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand text-[#050505] hover:bg-brand-dark transition-colors p-2 rounded-full disabled:opacity-50"
                    disabled={!chatMessage.trim() || isTyping}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-brand text-[#050505] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(178,255,5,0.3)] hover:scale-105 transition-transform"
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
}
