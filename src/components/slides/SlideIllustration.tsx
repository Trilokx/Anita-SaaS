import { motion } from 'motion/react';
import {
  Globe,
  Smartphone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Zap,
  TrendingUp,
  Star,
  Bot,
  User,
  Calendar
} from 'lucide-react';
import { Slide } from '../../types/slide';

export default function SlideIllustration({ slide }: { slide: Slide }) {
  const { illustration } = slide;

  if (illustration.type === 'roi') {
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
            { label: 'Trust', value: '5.0 ⭐' }
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

  if (illustration.type === 'reviews' && illustration.beforeAfter) {
    return (
      <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
        <div className="relative h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Low Rank</span>
          <div className="space-y-4 w-full">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-white/10" />
                <Star className="w-4 h-4 text-white/10" />
                <Star className="w-4 h-4 text-white/10" />
                <Star className="w-4 h-4 text-white/10" />
              </div>
              <div className="h-2 w-3/4 bg-white/10 rounded" />
              <div className="h-2 w-1/2 bg-white/10 rounded" />
            </div>
            <p className="text-center text-xs text-white/40 italic">"No one answers the phone..."</p>
          </div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center p-6 bg-[#B2FF05]/5">
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold">High Rank</span>
          <div className="space-y-4 w-full">
            <div className="p-4 rounded-xl bg-white/10 border border-[#B2FF05]/30 space-y-2 shadow-lg shadow-[#B2FF05]/10">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
              <div className="h-2 w-full bg-white/20 rounded" />
              <div className="h-2 w-3/4 bg-white/20 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="w-8 h-8 rounded bg-white/10" />
                <div className="w-8 h-8 rounded bg-white/10" />
              </div>
            </div>
            <p className="text-center text-xs text-white/80 font-medium">"Amazing service! Highly recommend."</p>
          </div>
        </div>
      </div>
    );
  }

  if (illustration.type === 'bot') {
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
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
            v2.4.0
          </div>
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

  if (illustration.type === 'comparison' && illustration.beforeAfter) {
    return (
      <div className="h-full w-full grid grid-cols-2 gap-px bg-white/10">
        <div className="relative h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Before</span>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="font-medium text-white/60">{illustration.beforeAfter.before}</p>
          </div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center p-6 bg-purple-900/10">
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-purple-400 font-bold">After</span>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <p className="font-bold text-white">{illustration.beforeAfter.after}</p>
          </div>
        </div>
      </div>
    );
  }

  if (illustration.type === 'chat') {
    return (
      <div className="h-full w-full p-8 flex flex-col gap-4 bg-[#0a0a0a]">
        <div className="self-start max-w-[80%] p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-sm text-white/80">
          "Are you open today? I'd like to book a session."
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="self-end max-w-[80%] p-4 rounded-2xl rounded-tr-none bg-purple-600 text-sm font-medium shadow-lg"
        >
          "Yes! We're open until 8 PM. You can book instantly here: elevate.com/book"
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="self-end p-2 rounded-lg bg-white/10 text-[10px] text-white/40 italic"
        >
          Replied instantly by Elevate AI
        </motion.div>
      </div>
    );
  }

  if (illustration.type === 'grid') {
    return (
      <div className="h-full w-full grid grid-cols-3 gap-4 p-8 bg-[#0a0a0a]">
        {[Globe, Smartphone, MessageSquare].map((Icon, idx) => (
          <div key={idx} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 group hover:bg-white/10 transition-colors">
            <Icon className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" />
            <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-red-500/50" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: image (mockup / diagram)
  return (
    <div className="h-full w-full relative">
      <img
        src={illustration.imageUrl}
        alt={illustration.description}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent mix-blend-overlay" />
      {illustration.type === 'mockup' && (
        <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none flex flex-col">
          <div className="h-6 border-b border-white/20 bg-white/5 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      )}
    </div>
  );
}
