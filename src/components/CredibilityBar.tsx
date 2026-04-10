import { MapPin, Phone, Palette, BarChart3, Shield } from 'lucide-react';

const items = [
  { icon: <MapPin size={18} />, label: 'Based in Dubai, UAE' },
  { icon: <Phone size={18} />, label: 'Free Strategy Consultation' },
  { icon: <Palette size={18} />, label: 'Custom-Built Solutions' },
  { icon: <Shield size={18} />, label: 'Transparent Pricing' },
  { icon: <BarChart3 size={18} />, label: 'Data-Driven Approach' },
];

export default function CredibilityBar() {
  return (
    <section className="py-8 bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <span className="text-brand">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
