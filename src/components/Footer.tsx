import { Link } from 'react-router-dom';
import { MessageCircle, Globe, Phone } from 'lucide-react';
import { openWhatsApp } from '../lib/contact';

export default function Footer() {
  return (
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
              <li><a href="/#features" className="hover:text-brand transition-colors">Web Design</a></li>
              <li><a href="/#features" className="hover:text-brand transition-colors">Google Reviews</a></li>
              <li><a href="/#features" className="hover:text-brand transition-colors">Social Media</a></li>
              <li><a href="/#features" className="hover:text-brand transition-colors">AI Chatbots</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>
                <button
                  onClick={() => openWhatsApp("Hi! I have a question about Elevate's services.")}
                  className="hover:text-brand transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Us
                </button>
              </li>
              <li>
                <a href="tel:+971525510676" className="hover:text-brand transition-colors flex items-center gap-2">
                  <Phone size={18} /> +971 52 551 0676
                </a>
              </li>
              <li className="flex items-center gap-2"><Globe size={18} /> Dubai, UAE</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Elevate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
