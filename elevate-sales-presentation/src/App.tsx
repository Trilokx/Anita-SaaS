import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Modality } from "@google/genai";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle,
  Globe,
  Smartphone,
  MessageSquare,
  Zap,
  Star,
  Bot,
  User,
  Calendar,
  Play,
  Pause,
  Volume2,
  Loader2
} from 'lucide-react';
import { SLIDES } from './constants';
import { Slide } from './types';

function SlideIllustration({ slide }: { slide: Slide }) {
  const { illustration } = slide;

  if (illustration.type === 'roi') {
    return (
      <div classname="h-full w-full p-12 bg-[#0a0a0a] flex flex-col justify-center items-center overflow-hidden">
        <div classname="relative w-full h-64">
          <svg viewbox="0 0 400 200" classname="w-full h-full">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key="{i}" x1="0" y1="{i" *="" 50}="" x2="400" y2="{i" *="" 50}="" stroke="white" strokeopacity="0.05" strokewidth="1"/>
            ))}
            
            {/* ROI Curve */}
            <motion.path d="M 0 180 Q 100 170, 200 100 T 400 20" fill="none" stroke="url(#roiGradient)" strokewidth="6" strokelinecap="round" initial="{{" pathlength:="" 0,="" opacity:="" 0="" }}="" animate="{{" pathlength:="" 1,="" opacity:="" 1="" }}="" transition="{{" duration:="" 2,="" ease:="" "easeout",="" delay:="" 0.5="" }}=""/>
            
            {/* Glow effect for the line */}
            <motion.path d="M 0 180 Q 100 170, 200 100 T 400 20" fill="none" stroke="#A855F7" strokewidth="12" strokelinecap="round" classname="blur-xl opacity-30" initial="{{" pathlength:="" 0="" }}="" animate="{{" pathlength:="" 1="" }}="" transition="{{" duration:="" 2,="" ease:="" "easeout",="" delay:="" 0.5="" }}=""/>

            <defs>
              <lineargradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopcolor="#FF3131"/>
                <stop offset="50%" stopcolor="#BF40BF"/>
                <stop offset="100%" stopcolor="#B2FF05"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Floating labels */}
          <motion.div initial="{{" opacity:="" 0,="" scale:="" 0.5="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1="" }}="" transition="{{" delay:="" 2.2="" }}="" classname="absolute top-0 right-0 bg-[#B2FF05] text-black px-4 py-2 rounded-full font-bold text-lg shadow-lg shadow-[#B2FF05]/40 flex items-center gap-2">
            <trendingup classname="w-5 h-5"/>
            ROI +340%
          </motion.div>

          <motion.div initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 0.4="" }}="" transition="{{" delay:="" 1="" }}="" classname="absolute bottom-0 left-0 text-[10px] uppercase tracking-widest font-bold">
            Before Elevate
          </motion.div>
        </div>

        <div classname="mt-12 grid grid-cols-3 gap-8 w-full">
          {[
            { label: 'Leads', value: '+120%' },
            { label: 'Sales', value: '+85%' },
            { label: 'Trust', value: '5.0 ⭐' }
          ].map((stat, idx) => (
            <motion.div key="{idx}" initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 2.5="" +="" idx="" *="" 0.2="" }}="" classname="text-center">
              <p classname="text-2xl font-bold text-white">{stat.value}</p>
              <p classname="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (illustration.type === 'reviews' && illustration.beforeAfter) {
    return (
      <div classname="h-full w-full grid grid-cols-2 gap-px bg-white/10">
        <div classname="relative h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
          <span classname="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Low Rank</span>
          <div classname="space-y-4 w-full">
            <div classname="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div classname="flex gap-1">
                <star classname="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                <star classname="w-4 h-4 text-white/10"/>
                <star classname="w-4 h-4 text-white/10"/>
                <star classname="w-4 h-4 text-white/10"/>
                <star classname="w-4 h-4 text-white/10"/>
              </div>
              <div classname="h-2 w-3/4 bg-white/10 rounded"/>
              <div classname="h-2 w-1/2 bg-white/10 rounded"/>
            </div>
            <p classname="text-center text-xs text-white/40 italic">"No one answers the phone..."</p>
          </div>
        </div>
        <div classname="relative h-full flex flex-col items-center justify-center p-6 bg-[#B2FF05]/5">
          <span classname="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#B2FF05] font-bold">High Rank</span>
          <div classname="space-y-4 w-full">
            <div classname="p-4 rounded-xl bg-white/10 border border-[#B2FF05]/30 space-y-2 shadow-lg shadow-[#B2FF05]/10">
              <div classname="flex gap-1">
                {[1,2,3,4,5].map(i => <star key="{i}" classname="w-4 h-4 text-yellow-500 fill-yellow-500"/>)}
              </div>
              <div classname="h-2 w-full bg-white/20 rounded"/>
              <div classname="h-2 w-3/4 bg-white/20 rounded"/>
              <div classname="flex gap-2 pt-2">
                <div classname="w-8 h-8 rounded bg-white/10"/>
                <div classname="w-8 h-8 rounded bg-white/10"/>
              </div>
            </div>
            <p classname="text-center text-xs text-white/80 font-medium">"Amazing service! Highly recommend."</p>
          </div>
        </div>
      </div>
    );
  }

  if (illustration.type === 'bot') {
    return (
      <div classname="h-full w-full p-8 bg-[#0a0a0a] flex flex-col gap-6">
        <div classname="flex items-center justify-between border-b border-white/10 pb-4">
          <div classname="flex items-center gap-3">
            <div classname="w-10 h-10 rounded-full bg-[#B2FF05] flex items-center justify-center">
              <bot classname="w-6 h-6 text-black"/>
            </div>
            <div>
              <p classname="text-sm font-bold">Elevate AI Agent</p>
              <p classname="text-[10px] text-[#B2FF05] flex items-center gap-1">
                <span classname="w-1.5 h-1.5 rounded-full bg-[#B2FF05] animate-pulse"/>
                Active 24/7
              </p>
            </div>
          </div>
          <div classname="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
            v2.4.0
          </div>
        </div>

        <div classname="flex-1 space-y-4 overflow-hidden">
          <div classname="flex gap-3">
            <div classname="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <user classname="w-4 h-4 text-white/40"/>
            </div>
            <div classname="p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-xs text-white/70">
              "Hi, do you have any openings for tomorrow afternoon?"
            </div>
          </div>

          <motion.div initial="{{" opacity:="" 0,="" x:="" 20="" }}="" animate="{{" opacity:="" 1,="" x:="" 0="" }}="" transition="{{" delay:="" 0.5="" }}="" classname="flex gap-3 justify-end">
            <div classname="p-3 rounded-2xl rounded-tr-none bg-[#BF40BF] text-white text-xs font-medium shadow-lg max-w-[80%]">
              "Yes! We have slots at 2:00 PM and 4:30 PM. Would you like me to book one for you?"
            </div>
            <div classname="w-8 h-8 rounded-full bg-[#BF40BF] flex items-center justify-center shrink-0">
              <bot classname="w-4 h-4 text-white"/>
            </div>
          </motion.div>

          <motion.div initial="{{" opacity:="" 0,="" y:="" 10="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 1="" }}="" classname="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div classname="flex items-center gap-3">
              <calendar classname="w-5 h-5 text-[#B2FF05]"/>
              <div>
                <p classname="text-[10px] text-white/40 uppercase font-bold">Appointment Confirmed</p>
                <p classname="text-xs">Tomorrow @ 2:00 PM</p>
              </div>
            </div>
            <div classname="w-6 h-6 rounded-full bg-[#B2FF05]/20 flex items-center justify-center">
              <checkcircle2 classname="w-4 h-4 text-[#B2FF05]"/>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (illustration.type === 'comparison' && illustration.beforeAfter) {
    return (
      <div classname="h-full w-full grid grid-cols-2 gap-px bg-white/10">
        <div classname="relative h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a]">
          <span classname="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Before</span>
          <div classname="text-center space-y-4">
            <div classname="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <alertcircle classname="w-8 h-8 text-red-500"/>
            </div>
            <p classname="font-medium text-white/60">{illustration.beforeAfter.before}</p>
          </div>
        </div>
        <div classname="relative h-full flex flex-col items-center justify-center p-6 bg-purple-900/10">
          <span classname="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-purple-400 font-bold">After</span>
          <div classname="text-center space-y-4">
            <div classname="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <zap classname="w-8 h-8 text-purple-400"/>
            </div>
            <p classname="font-bold text-white">{illustration.beforeAfter.after}</p>
          </div>
        </div>
      </div>
    );
  }

  if (illustration.type === 'chat') {
    return (
      <div classname="h-full w-full p-8 flex flex-col gap-4 bg-[#0a0a0a]">
        <div classname="self-start max-w-[80%] p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-sm text-white/80">
          "Are you open today? I'd like to book a session."
        </div>
        <motion.div initial="{{" opacity:="" 0,="" y:="" 10="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.8="" }}="" classname="self-end max-w-[80%] p-4 rounded-2xl rounded-tr-none bg-purple-600 text-sm font-medium shadow-lg">
          "Yes! We're open until 8 PM. You can book instantly here: elevate.com/book"
        </motion.div>
        <motion.div initial="{{" opacity:="" 0,="" scale:="" 0.9="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1="" }}="" transition="{{" delay:="" 1.2="" }}="" classname="self-end p-2 rounded-lg bg-white/10 text-[10px] text-white/40 italic">
          Replied instantly by Elevate AI
        </motion.div>
      </div>
    );
  }

  if (illustration.type === 'grid') {
    return (
      <div classname="h-full w-full grid grid-cols-3 gap-4 p-8 bg-[#0a0a0a]">
        {[Globe, Smartphone, MessageSquare].map((Icon, idx) => (
          <div key="{idx}" classname="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 group hover:bg-white/10 transition-colors">
            <icon classname="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors"/>
            <div classname="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
              <div classname="w-1/3 h-full bg-red-500/50"/>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div classname="h-full w-full relative">
      <img src="{illustration.imageUrl}" alt="{illustration.description}" classname="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" referrerpolicy="no-referrer"/>
      <div classname="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent mix-blend-overlay"/>
      
      {illustration.type === 'mockup' && (
        <div classname="absolute inset-4 border border-white/20 rounded-lg pointer-events-none flex flex-col">
          <div classname="h-6 border-b border-white/20 bg-white/5 flex items-center px-2 gap-1">
            <div classname="w-1.5 h-1.5 rounded-full bg-white/20"/>
            <div classname="w-1.5 h-1.5 rounded-full bg-white/20"/>
            <div classname="w-1.5 h-1.5 rounded-full bg-white/20"/>
          </div>
        </div>
      )}
    </div>
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function playAudio(base64Data: string) {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }

  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const float32Array = new Float32Array(len / 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < float32Array.length; i++) {
    float32Array[i] = view.getInt16(i * 2, true) / 32768;
  }
  
  const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
  audioBuffer.getChannelData(0).set(float32Array);
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
  
  return new Promise<void>((resolve) => {
    source.onended = () => {
      audioCtx.close();
      resolve();
    };
  });
}

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const autoPlayTimerRef = useRef<nodejs.timeout |="" null="">(null);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Auto-play logic with Voiceover
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    const playSlideVoiceover = async () => {
      setIsLoadingAudio(true);
      const slide = SLIDES[currentSlideIndex];
      const script = `Slide ${slide.id}: ${slide.title}. ${slide.content.join('. ')}`;
      
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Read this content in a professional, warm female voice: ${script}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        setIsLoadingAudio(false);
        
        if (base64Audio && isAutoPlaying) {
          setIsSpeaking(true);
          await playAudio(base64Audio);
          setIsSpeaking(false);
          
          // Wait 1.5 seconds before next slide
          if (isAutoPlaying) {
            autoPlayTimerRef.current = setTimeout(() => {
              if (isAutoPlaying) nextSlide();
            }, 1500);
          }
        }
      } catch (error) {
        console.error("TTS Error:", error);
        setIsLoadingAudio(false);
        // Fallback to timer if TTS fails
        autoPlayTimerRef.current = setTimeout(() => {
          if (isAutoPlaying) nextSlide();
        }, 5000);
      }
    };

    playSlideVoiceover();

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentSlideIndex, isAutoPlaying]);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div classname="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B2FF05]/30 overflow-hidden flex flex-col">
      {/* Header / Progress */}
      <header classname="p-6 flex justify-between items-center z-20">
        <div classname="flex items-center gap-2">
          <div classname="w-8 h-8 bg-[#B2FF05] rounded-lg flex items-center justify-center">
            <trendingup classname="w-5 h-5 text-black"/>
          </div>
          <span classname="font-bold text-xl tracking-tight">ELEVATE</span>
        </div>
        <div classname="flex gap-1">
          {SLIDES.map((_, idx) => (
            <div key="{idx}" classname="{`h-1" rounded-full="" transition-all="" duration-300="" ${="" idx="==" currentslideindex="" ?="" 'w-8="" bg-[#b2ff05]'="" :="" 'w-2="" bg-white="" 10'="" }`}=""/>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main classname="flex-1 relative flex items-center justify-center p-8 md:p-16">
        <animatepresence mode="wait" custom="{direction}">
          <motion.div key="{currentSlideIndex}" custom="{direction}" initial="{{" opacity:="" 0,="" x:="" direction="" *="" 100="" }}="" animate="{{" opacity:="" 1,="" x:="" 0="" }}="" exit="{{" opacity:="" 0,="" x:="" direction="" *="" -100="" }}="" transition="{{" type:="" 'spring',="" damping:="" 25,="" stiffness:="" 200="" }}="" classname="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div classname="space-y-8">
              <motion.div initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.2="" }}="">
                <h1 classname="{`text-4xl" md:text-6xl="" font-bold="" leading-[1.1]="" tracking-tight="" ${currentslide.accentcolor="" ||="" 'text-white'}`}="">
                  {currentSlide.title}
                </h1>
              </motion.div>

              <motion.ul classname="space-y-6" initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" delay:="" 0.4="" }}="">
                {currentSlide.content.map((item, idx) => (
                  <motion.li key="{idx}" initial="{{" opacity:="" 0,="" x:="" -20="" }}="" animate="{{" opacity:="" 1,="" x:="" 0="" }}="" transition="{{" delay:="" 0.5="" +="" idx="" *="" 0.1="" }}="" classname="flex items-start gap-4 group">
                    <div classname="mt-1.5 p-1 rounded-full bg-white/5 group-hover:bg-[#B2FF05]/20 transition-colors">
                      <checkcircle2 classname="w-5 h-5 text-[#B2FF05]"/>
                    </div>
                    <span classname="text-lg md:text-xl text-white/70 leading-relaxed group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Right Side: Illustration */}
            <motion.div initial="{{" opacity:="" 0,="" scale:="" 0.9,="" rotatey:="" direction="" *="" 10="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1,="" rotatey:="" 0="" }}="" transition="{{" delay:="" 0.3,="" type:="" 'spring',="" damping:="" 20="" }}="" classname="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group">
              <slideillustration slide="{currentSlide}"/>
              
              <div classname="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p classname="text-xs text-white/60 italic">{currentSlide.illustration.description}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <footer classname="p-8 flex justify-between items-center z-20">
        <div classname="flex items-center gap-4">
          <button onclick="{prevSlide}" disabled="{currentSlideIndex" =="=" 0}="" classname="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10" title="Previous Slide">
            <chevronleft classname="w-6 h-6"/>
          </button>

          <button onclick="{nextSlide}" disabled="{currentSlideIndex" =="=" slides.length="" -="" 1}="" classname="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10" title="Next Slide">
            <chevronright classname="w-6 h-6"/>
          </button>
        </div>

        <div classname="flex items-center gap-8">
          <button onclick="{()" ==""> setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              isAutoPlaying 
                ? 'bg-[#B2FF05]/10 border-[#B2FF05] text-[#B2FF05]' 
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {isLoadingAudio ? (
              <loader2 classname="w-4 h-4 animate-spin"/>
            ) : isAutoPlaying ? (
              <pause classname="w-4 h-4"/>
            ) : (
              <play classname="w-4 h-4"/>
            )}
            <span classname="text-xs font-bold uppercase tracking-wider">
              {isLoadingAudio ? 'Generating Voice...' : isAutoPlaying ? 'Stop Auto-Play' : 'Play with Voice'}
            </span>
            {isSpeaking && <volume2 classname="w-4 h-4 animate-pulse"/>}
          </button>

          <div classname="hidden md:flex items-center gap-4 text-white/40 text-sm font-medium">
            <span classname="flex items-center gap-1"><kbd classname="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px]">SPACE</kbd> NEXT</span>
            <span classname="flex items-center gap-1"><kbd classname="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px]">←</kbd> PREV</span>
            <span classname="flex items-center gap-1"><kbd classname="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px]">→</kbd> NEXT</span>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div classname="fixed inset-0 pointer-events-none z-0">
        <div classname="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#B2FF05]/10 blur-[120px] rounded-full"/>
        <div classname="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BF40BF]/10 blur-[120px] rounded-full"/>
        <div classname="absolute inset-0 bg-[url(&#39;https://grainy-gradients.vercel.app/noise.svg&#39;)] opacity-20 mix-blend-overlay"/>
      </div>
    </div>
  );
}
