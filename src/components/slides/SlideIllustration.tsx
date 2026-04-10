import { motion } from 'motion/react';
import {
  Star,
  Bot,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  MapPin,
  Phone,
  Globe,
  Instagram,
  MessageCircle,
  Search,
  ArrowRight,
  Eye,
  Heart,
  ShoppingCart,
  AlertTriangle,
  BarChart2,
  Zap,
} from 'lucide-react';
import { Slide } from '../../types/slide';

// ─── Slide 11: ROI Curve ────────────────────────────────────────────────────
function RoiIllustration() {
  return (
    <div className="h-full w-full p-12 bg-[#0a0a0a] flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-64">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
          ))}
          <motion.path
            d="M 0 180 Q 100 170, 200 100 T 400 20"
            fill="none"
            stroke="url(#roiGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          <motion.path
            d="M 0 180 Q 100 170, 200 100 T 400 20"
            fill="none"
            stroke="#A855F7"
            strokeWidth="12"
            strokeLinecap="round"
            className="blur-xl opacity-30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3131" />
              <stop offset="50%" stopColor="#BF40BF" />
              <stop offset="100%" stopColor="#B2FF05" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute top-0 right-0 bg-[#B2FF05] text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg shadow-[#B2FF05]/40 flex items-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          ROI +340%
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-0 text-[10px] uppercase tracking-widest font-bold"
        >
          Before Elevate
        </motion.div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-8 w-full">
        {[
          { label: 'Leads', value: '+120%' },
          { label: 'Sales', value: '+85%' },
          { label: 'Trust', value: '5.0 ⭐' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 + idx * 0.2 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Slide 9: AI Bot Chat ───────────────────────────────────────────────────
function BotIllustration() {
  return (
    <div className="h-full w-full p-8 bg-[#0a0a0a] flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#B2FF05] flex items-center justify-center">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="text-sm font-bold">Elevate AI Agent</p>
            <p className="text-[10px] text-[#B2FF05] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B2FF05] animate-pulse" />
              Active 24/7
            </p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">v2.4.0</div>
      </div>
      <div className="flex-1 space-y-4 overflow-hidden">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-white/40" />
          </div>
          <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-xs text-white/70">
            "Hi, do you have any openings for tomorrow afternoon?"
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 justify-end"
        >
          <div className="p-3 rounded-2xl rounded-tr-none bg-[#BF40BF] text-white text-xs font-medium shadow-lg max-w-[80%]">
            "Yes! We have slots at 2:00 PM and 4:30 PM. Would you like me to book one for you?"
          </div>
          <div className="w-8 h-8 rounded-full bg-[#BF40BF] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#B2FF05]" />
            <div>
              <p className="text-[10px] text-white/40 uppercase font-bold">Appointment Confirmed</p>
              <p className="text-xs">Tomorrow @ 2:00 PM</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#B2FF05]/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#B2FF05]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Slide 1: Google Invisible — search results mockup ──────────────────────
function GoogleSearchIllustration() {
  return (
    <div className="h-full w-full bg-[#0a0a0a] p-6 flex flex-col gap-4 overflow-hidden">
      {/* Search bar */}
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
        <Search className="w-4 h-4 text-white/30 shrink-0" />
        <span className="text-xs text-white/40 truncate">"best salon near me Dubai"</span>
      </div>

      {/* Competitor result — winning */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-white/5 border border-[#B2FF05]/30 shadow-lg shadow-[#B2FF05]/5"
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm font-bold text-white">Glamour Studio Dubai</p>
            <div className="flex items-center gap-1 mt-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
              <span className="text-[10px] text-white/50 ml-1">4.9 (312 reviews)</span>
            </div>
          </div>
          <span className="text-[10px] bg-[#B2FF05]/20 text-[#B2FF05] px-2 py-0.5 rounded-full font-bold">#1</span>
        </div>
        <div className="flex gap-3 mt-2">
          <div className="flex items-center gap-1 text-[10px] text-white/40">
            <MapPin className="w-3 h-3" /> 0.3 km away
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#B2FF05]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B2FF05]" /> Open now
          </div>
        </div>
      </motion.div>

      {/* Your business — invisible */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-50"
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm font-bold text-white/40">Your Business</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-white/10" />
              <span className="text-[10px] text-white/20 ml-1">No reviews yet</span>
            </div>
          </div>
          <span className="text-[10px] bg-white/5 text-white/20 px-2 py-0.5 rounded-full">Unclaimed</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/20 mt-2">
          <AlertTriangle className="w-3 h-3" /> Incomplete profile
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[10px] text-red-400/80 font-medium"
      >
        Your customers are going to your competitors right now
      </motion.p>
    </div>
  );
}

// ─── Slide 2: Leaking Funnel ────────────────────────────────────────────────
function LeakingFunnelIllustration() {
  const steps = [
    { label: '1,000 Searches', width: 'w-full', color: 'bg-white/10', value: '1,000' },
    { label: 'Found your listing', width: 'w-3/4', color: 'bg-white/10', value: '320' },
    { label: 'Clicked your profile', width: 'w-1/2', color: 'bg-white/10', value: '90' },
    { label: 'Actually called you', width: 'w-1/4', color: 'bg-red-500/30', value: '12' },
  ];

  return (
    <div className="h-full w-full bg-[#0a0a0a] p-8 flex flex-col justify-center gap-3 overflow-hidden">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Where your customers go</p>
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
          className="flex items-center gap-3"
        >
          <div className={`h-9 ${step.width} ${step.color} rounded-lg flex items-center px-3 transition-all`}>
            <span className="text-xs text-white/50 truncate">{step.label}</span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.3 }}
            className={`text-sm font-bold shrink-0 ${i === steps.length - 1 ? 'text-red-400' : 'text-white/60'}`}
          >
            {step.value}
          </motion.span>
          {i < steps.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.4 }}
              className="text-[10px] text-red-400/60 shrink-0"
            >
              ← leaked
            </motion.span>
          )}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2"
      >
        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
        <p className="text-xs text-red-300">98.8% of searches don't reach you</p>
      </motion.div>
    </div>
  );
}

// ─── Slide 3: 3 Broken Platforms ────────────────────────────────────────────
function BrokenPlatformsIllustration() {
  const platforms = [
    {
      Icon: Globe,
      name: 'Google',
      status: 'Not Found',
      detail: '0 reviews',
      color: 'text-white/15',
      bg: 'bg-white/[0.03]',
    },
    {
      Icon: Instagram,
      name: 'Instagram',
      status: 'Inactive',
      detail: '3 posts, 2 followers',
      color: 'text-white/15',
      bg: 'bg-white/[0.03]',
    },
    {
      Icon: MessageCircle,
      name: 'WhatsApp',
      status: 'No Replies',
      detail: 'Last seen 4 days ago',
      color: 'text-white/15',
      bg: 'bg-white/[0.03]',
    },
  ];

  return (
    <div className="h-full w-full bg-[#0a0a0a] p-8 flex flex-col justify-center gap-4">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-2">Your digital presence today</p>
      {platforms.map(({ Icon, name, status, detail, color, bg }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`flex items-center gap-4 p-4 rounded-xl ${bg} border border-white/5`}
        >
          <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/30">{name}</p>
            <p className="text-[10px] text-white/20 truncate">{detail}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] text-red-400 font-medium">{status}</span>
          </div>
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-[10px] text-white/20 mt-2"
      >
        Customers can't find you → they go elsewhere
      </motion.p>
    </div>
  );
}

// ─── Slide 4: Chaos vs Content Calendar ────────────────────────────────────
function MarketingChaosIllustration() {
  const randomPosts = [
    { w: 'w-16', color: 'bg-pink-500/40', mt: 'mt-0' },
    { w: 'w-10', color: 'bg-blue-500/30', mt: 'mt-4' },
    { w: 'w-20', color: 'bg-yellow-500/30', mt: 'mt-1' },
    { w: 'w-8', color: 'bg-green-500/20', mt: 'mt-6' },
    { w: 'w-14', color: 'bg-purple-500/30', mt: 'mt-2' },
    { w: 'w-12', color: 'bg-red-500/30', mt: 'mt-5' },
  ];

  const calendarDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const scheduled = [0, 2, 4]; // which days have posts

  return (
    <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
      {/* Before: Chaos */}
      <div className="relative h-full flex flex-col p-6 bg-[#0a0a0a]">
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Before</span>
        <div className="flex flex-wrap gap-2 items-end flex-1">
          {randomPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${post.w} h-8 ${post.color} rounded-md ${post.mt}`}
            />
          ))}
        </div>
        <p className="text-[10px] text-white/30 italic mt-4">Random. Inconsistent. No strategy.</p>
      </div>

      {/* After: Content Calendar */}
      <div className="relative h-full flex flex-col p-6 bg-[#B2FF05]/5">
        <span className="text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold mb-4">After</span>
        <div className="grid grid-cols-7 gap-1 mb-3">
          {calendarDays.map((d, i) => (
            <div key={i} className="text-center text-[9px] text-white/30 font-bold">{d}</div>
          ))}
          {calendarDays.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={`aspect-square rounded flex items-center justify-center ${
                scheduled.includes(i)
                  ? 'bg-[#B2FF05]/30 border border-[#B2FF05]/50'
                  : 'bg-white/5'
              }`}
            >
              {scheduled.includes(i) && <CheckCircle2 className="w-3 h-3 text-[#B2FF05]" />}
            </motion.div>
          ))}
        </div>
        <div className="space-y-1.5 mt-2">
          {['Monday post — Tip', 'Wednesday post — Promo', 'Friday post — Story'].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#B2FF05] shrink-0" />
              <span className="text-[10px] text-white/60">{item}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-[#B2FF05]/70 italic mt-3">Planned. Consistent. On-brand.</p>
      </div>
    </div>
  );
}

// ─── Slide 5: Visibility → Engagement → Conversion flow ────────────────────
function VisibilityFlowIllustration() {
  const steps = [
    { icon: Eye, label: 'Visibility', sub: 'Google + Social', color: '#B2FF05', glow: 'shadow-[#B2FF05]/20' },
    { icon: Heart, label: 'Engagement', sub: 'Trust + Interaction', color: '#BF40BF', glow: 'shadow-[#BF40BF]/20' },
    { icon: ShoppingCart, label: 'Conversion', sub: 'Leads + Revenue', color: '#B2FF05', glow: 'shadow-[#B2FF05]/20' },
  ];

  return (
    <div className="h-full w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 gap-6">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">The Elevate System</p>
      <div className="flex items-center gap-2 w-full justify-center flex-wrap">
        {steps.map(({ icon: Icon, label, sub, color, glow }, i) => (
          <div key={label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border shadow-xl ${glow}`}
              style={{ borderColor: `${color}30` }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-[10px] text-white/40 text-center">{sub}</p>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: i * 0.3 + 0.2 }}
              >
                <ArrowRight className="w-5 h-5 text-white/20" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-6 mt-2"
      >
        {[
          { label: 'More Finds', val: '+340%' },
          { label: 'More Clicks', val: '+190%' },
          { label: 'More Sales', val: '+85%' },
        ].map(({ label, val }) => (
          <div key={label} className="text-center">
            <p className="text-base font-bold text-[#B2FF05]">{val}</p>
            <p className="text-[10px] text-white/30">{label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Slide 6: Reviews comparison ────────────────────────────────────────────
function ReviewsIllustration() {
  return (
    <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
      <div className="relative h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Before</span>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-white/20" />
            <span className="text-xs text-white/30">Your Business</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-white/10" />
              <Star className="w-4 h-4 text-white/10" />
              <Star className="w-4 h-4 text-white/10" />
              <Star className="w-4 h-4 text-white/10" />
              <span className="text-[10px] text-white/30 ml-1">1.2</span>
            </div>
            <div className="h-2 w-3/4 bg-white/10 rounded" />
            <div className="h-2 w-1/2 bg-white/10 rounded" />
          </div>
          <p className="text-center text-xs text-white/30 italic">"No one answers the phone..."</p>
          <div className="flex items-center gap-1 text-[10px] text-white/20">
            <Phone className="w-3 h-3" /> 2 calls / month
          </div>
        </div>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center p-6 bg-[#B2FF05]/5">
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold">After</span>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-[#B2FF05]" />
            <span className="text-xs text-white/60">Your Business</span>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-[#B2FF05]/30 space-y-2 shadow-lg shadow-[#B2FF05]/10">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              <span className="text-[10px] text-white/60 ml-1">4.9</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded" />
            <div className="h-2 w-3/4 bg-white/20 rounded" />
          </div>
          <p className="text-center text-xs text-white/80 font-medium">"Amazing service! Highly recommend."</p>
          <div className="flex items-center gap-1 text-[10px] text-[#B2FF05]">
            <Phone className="w-3 h-3" /> 47 calls / month
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 7: Website Mockup with CTAs ─────────────────────────────────────
function WebsiteMockupIllustration() {
  return (
    <div className="h-full w-full bg-[#0a0a0a] p-6 flex flex-col gap-3 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex-1 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
        {/* Browser bar */}
        <div className="bg-white/5 border-b border-white/10 px-3 py-2 flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            {['bg-red-500/50','bg-yellow-500/50','bg-green-500/50'].map((c,i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
            ))}
          </div>
          <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-[9px] text-white/30 text-center">
            yourbusiness.com
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-5 flex flex-col gap-3">
          {/* Nav */}
          <div className="flex items-center justify-between">
            <div className="w-12 h-2 bg-[#B2FF05]/40 rounded" />
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-1.5 bg-white/10 rounded" />)}
            </div>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 space-y-2"
          >
            <div className="w-3/4 h-3 bg-white/40 rounded" />
            <div className="w-1/2 h-3 bg-white/20 rounded" />
            <div className="w-2/3 h-2 bg-white/10 rounded mt-1" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 mt-1"
          >
            <div className="bg-[#B2FF05] text-[#050505] px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Phone className="w-3 h-3" /> Book Now
            </div>
            <div className="border border-white/20 text-white/60 px-4 py-1.5 rounded-full text-[10px] font-medium">
              Call Now
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-auto flex gap-3 border-t border-white/5 pt-3"
          >
            {[
              { label: 'Visitors', val: '2.4k' },
              { label: 'Leads', val: '143' },
              { label: 'Conv.', val: '6.1%' },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p className="text-[11px] font-bold text-[#B2FF05]">{val}</p>
                <p className="text-[9px] text-white/30">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 8: Instagram Grid Before/After ──────────────────────────────────
function InstagramGridIllustration() {
  const randomColors = [
    'bg-pink-400/50', 'bg-blue-400/30', 'bg-yellow-400/40',
    'bg-green-400/20', 'bg-red-400/40', 'bg-indigo-400/30',
    'bg-orange-400/30', 'bg-teal-400/20', 'bg-rose-400/40',
  ];
  const brandedColors = [
    'bg-[#B2FF05]/40', 'bg-[#0a0a0a]', 'bg-[#B2FF05]/20',
    'bg-[#0a0a0a]', 'bg-[#B2FF05]/60', 'bg-[#0a0a0a]',
    'bg-[#B2FF05]/30', 'bg-[#0a0a0a]', 'bg-[#B2FF05]/50',
  ];

  return (
    <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
      {/* Before */}
      <div className="relative h-full flex flex-col p-5 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 mb-3">
          <Instagram className="w-4 h-4 text-white/20" />
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Before</span>
        </div>
        <div className="grid grid-cols-3 gap-1 flex-1">
          {randomColors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`aspect-square rounded ${color}`}
            />
          ))}
        </div>
        <p className="text-[10px] text-white/20 italic mt-3 text-center">Random content, no theme</p>
        <div className="flex gap-3 mt-2 justify-center">
          <span className="text-[10px] text-white/20">12 followers</span>
          <span className="text-[10px] text-white/20">0.3% engagement</span>
        </div>
      </div>

      {/* After */}
      <div className="relative h-full flex flex-col p-5 bg-[#B2FF05]/5">
        <div className="flex items-center gap-2 mb-3">
          <Instagram className="w-4 h-4 text-[#B2FF05]" />
          <span className="text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold">After</span>
        </div>
        <div className="grid grid-cols-3 gap-1 flex-1">
          {brandedColors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`aspect-square rounded ${color} border border-[#B2FF05]/10 flex items-center justify-center`}
            >
              {i % 3 === 1 && <div className="w-3 h-3 rounded-full bg-[#B2FF05]/30" />}
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-[#B2FF05]/70 italic mt-3 text-center">Consistent. Branded. Professional.</p>
        <div className="flex gap-3 mt-2 justify-center">
          <span className="text-[10px] text-[#B2FF05]/60">2.4k followers</span>
          <span className="text-[10px] text-[#B2FF05]/60">8.7% engagement</span>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 10: Without vs With Elevate — metrics ────────────────────────────
function ElevateDifferenceIllustration() {
  return (
    <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
      {/* Without Elevate */}
      <div className="relative h-full flex flex-col p-6 bg-[#0a0a0a]">
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Without Elevate</span>
        <div className="flex-1 flex flex-col justify-center gap-4 mt-6">
          {[
            { label: 'Monthly leads', val: '3', color: 'text-red-400' },
            { label: 'Google ranking', val: '#47', color: 'text-red-400' },
            { label: 'Review score', val: '2.1 ⭐', color: 'text-red-400' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <p className="text-[10px] text-white/30">{label}</p>
                <p className={`text-lg font-bold ${color}`}>{val}</p>
              </div>
              <TrendingDown className="w-5 h-5 text-red-500/40" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 p-2 rounded-lg bg-red-500/10">
          <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
          <p className="text-[10px] text-red-300">Stagnant. Losing to competitors.</p>
        </div>
      </div>

      {/* With Elevate */}
      <div className="relative h-full flex flex-col p-6 bg-[#B2FF05]/5">
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold">With Elevate</span>
        <div className="flex-1 flex flex-col justify-center gap-4 mt-6">
          {[
            { label: 'Monthly leads', val: '47', color: 'text-[#B2FF05]' },
            { label: 'Google ranking', val: '#1–3', color: 'text-[#B2FF05]' },
            { label: 'Review score', val: '4.9 ⭐', color: 'text-[#B2FF05]' },
          ].map(({ label, val, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#B2FF05]/20"
            >
              <div>
                <p className="text-[10px] text-white/40">{label}</p>
                <p className={`text-lg font-bold ${color}`}>{val}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#B2FF05]/60" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 mt-4 p-2 rounded-lg bg-[#B2FF05]/10"
        >
          <Zap className="w-3 h-3 text-[#B2FF05] shrink-0" />
          <p className="text-[10px] text-[#B2FF05]/80">Growing. Winning. Automated.</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function SlideIllustration({ slide }: { slide: Slide }) {
  const { illustration } = slide;

  if (slide.id === 11 || illustration.type === 'roi') return <RoiIllustration />;
  if (slide.id === 9  || illustration.type === 'bot') return <BotIllustration />;
  if (slide.id === 1)  return <GoogleSearchIllustration />;
  if (slide.id === 2)  return <LeakingFunnelIllustration />;
  if (slide.id === 3)  return <BrokenPlatformsIllustration />;
  if (slide.id === 4)  return <MarketingChaosIllustration />;
  if (slide.id === 5)  return <VisibilityFlowIllustration />;
  if (slide.id === 6)  return <ReviewsIllustration />;
  if (slide.id === 7)  return <WebsiteMockupIllustration />;
  if (slide.id === 8)  return <InstagramGridIllustration />;
  if (slide.id === 10) return <ElevateDifferenceIllustration />;

  // Fallback
  return (
    <div className="h-full w-full relative">
      {illustration.imageUrl && (
        <img
          src={illustration.imageUrl}
          alt={illustration.description}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
