import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MessageCircle, Menu, X } from 'lucide-react';
import { openCalendly, openWhatsApp } from '../lib/contact';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-[#050505] rounded-full" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Elevate</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="/#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="/#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it Works</a>
            <a href="/#audit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Free Audit</a>
            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About Us</Link>
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-white/5 px-4 py-6 space-y-4 shadow-xl"
          >
            <a href="/#features" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="/#pricing" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="/#how-it-works" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
            <a href="/#audit" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Free Audit</a>
            <Link to="/about" className="block text-base font-medium text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
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
  );
}
