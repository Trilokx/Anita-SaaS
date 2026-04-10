import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Star,
  MessageSquare,
  Megaphone,
  PhoneCall,
  BarChart3,
  X,
  Send,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Calendar
} from 'lucide-react';
import PresentationSection from './components/PresentationSection';
import PricingCards, { Plan } from './components/PricingCards';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CredibilityBar from './components/CredibilityBar';
import { openCalendly, openWhatsApp } from './lib/contact';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
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
        content: 'Sorry, I\'m having trouble connecting right now. For instant help, reach us via WhatsApp — we respond quickly!'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand selection:text-[#050505]">
      <Navbar />

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
                We Build Your <span className="text-brand">Digital Presence</span> — You Focus on Your Clients
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Expert digital marketing for small businesses in Dubai and beyond. We handle your website, Google visibility, social media, and AI automation — so you can focus on what you do best.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={openCalendly}
                  className="bg-brand hover:bg-brand-dark text-[#050505] px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={20} /> Book a Free Call
                </button>
                <button
                  onClick={() => openWhatsApp("Hi! I'd like to learn more about Elevate's digital marketing services.")}
                  className="bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} className="text-brand" />
                  WhatsApp Us
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Web Design', 'Google Reviews', 'Social Media', 'AI Chatbots', 'Lead Generation'].map((tag) => (
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
                  <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div className="bg-white/30 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 text-[#050505]">
                    5.0 <Star size={14} className="fill-[#050505]" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-[#050505]/10 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-[#050505]/10 rounded-full"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#050505]/10">
                  <div className="text-[10px] uppercase tracking-wider text-[#050505]/40 mb-2">Example Dashboard</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-[#050505]/80">New Leads</div>
                    <div className="text-xl font-bold text-[#050505]">+142%</div>
                  </div>
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

      {/* Credibility Bar */}
      <CredibilityBar />

      {/* Presentation Section */}
      <PresentationSection />

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-brand/20">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
              Achieve <span className="text-brand">digital clarity</span> and take control of your future with expertise designed to simplify, streamline, and personalize your <span className="text-brand">online marketing</span>.
            </h2>
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

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#050505]">
        <PricingCards
          selectedPlanId={selectedPlan?.id ?? null}
          onSelectPlan={(plan) => setSelectedPlan(prev => prev?.id === plan.id ? null : plan)}
        />
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand/20">
              How it Works
            </div>
          </div>
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
                  onClick={() => openWhatsApp("Hi! I'd like more information about your services and pricing.")}
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
            Enter your business name or URL and we'll personally reach out via WhatsApp to walk you through your growth opportunities. Free, no strings attached.
          </p>
          
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (!auditBusiness.trim()) return;
              openWhatsApp(`Hi! I'd like to request a free audit for: ${auditBusiness.trim()}`);
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

      <Footer />

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
                  onClick={() => openWhatsApp("Hi! I'd like to speak with someone from Elevate.")}
                  className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-brand transition-colors bg-[#111] px-3 py-1.5 rounded-full shadow-sm border border-white/5"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <button
                  onClick={openCalendly}
                  className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-brand transition-colors bg-[#111] px-3 py-1.5 rounded-full shadow-sm border border-white/5"
                >
                  <Calendar size={14} /> Book a Call
                </button>
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

      {/* Sticky Plan Bar */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#111]/95 backdrop-blur-md border-t border-white/10 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 pr-24 sm:pr-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 bg-brand rounded-full animate-pulse shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 font-medium">Selected plan</div>
                  <div className="font-bold text-white truncate">
                    {selectedPlan.name}{' '}
                    <span className="text-gray-500 line-through text-sm">${selectedPlan.originalPrice.toLocaleString()}</span>{' '}
                    <span className="text-brand">${selectedPlan.price.toLocaleString()}<span className="text-xs font-normal text-gray-400">/mo</span></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openWhatsApp(selectedPlan.ctaMsg)}
                  className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
                >
                  <MessageCircle size={15} className="text-brand" /> WhatsApp
                </button>
                <button
                  onClick={openCalendly}
                  className="bg-brand text-[#050505] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#9DDF00] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Calendar size={15} /> Book a Call
                </button>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
