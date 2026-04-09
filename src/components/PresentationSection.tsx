import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  TrendingUp
} from 'lucide-react';
import { SLIDES } from '../data/slides';
import SlideIllustration from './slides/SlideIllustration';

export default function PresentationSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Audio playback using pre-recorded WAV files
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (!isPlaying) return;

    const audio = new Audio(`/audio/slide-${currentSlideIndex + 1}.wav`);
    audioRef.current = audio;
    audio.play().catch(() => {
      // No audio file yet — fallback auto-advance
      const timer = setTimeout(nextSlide, 6000);
      return () => clearTimeout(timer);
    });
    audio.onended = () => setTimeout(nextSlide, 1200);
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentSlideIndex, isPlaying]);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <section id="presentation" className="py-0 bg-[#080808] border-y border-white/5 overflow-hidden">
      {/* Section Label Row */}
      <div className="text-center pt-16 pb-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-semibold border border-brand/20 mb-4">
          <TrendingUp size={14} />
          Why Businesses Choose Elevate
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Watch How We <span className="text-brand">Transform Businesses</span>
        </h2>
      </div>

      {/* Slide Area */}
      <div className="relative min-h-[520px] flex items-center">
        {/* Background glows */}
        <div className="absolute top-0 left-[-10%] w-[35%] h-full bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-[-10%] w-[35%] h-full bg-[#BF40BF]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Left: Content */}
              <div className="space-y-7">
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight ${currentSlide.accentColor || 'text-white'}`}
                >
                  {currentSlide.title}
                </motion.h3>

                <motion.ul
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {currentSlide.content.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 + idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1 p-1 rounded-full bg-white/5 group-hover:bg-brand/20 transition-colors shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-brand" />
                      </div>
                      <span className="text-base md:text-lg text-white/70 leading-relaxed group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Right: Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 22 }}
                className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group"
              >
                <SlideIllustration slide={currentSlide} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Progress dots */}
          <div className="flex gap-1.5 items-center order-2 sm:order-1">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > currentSlideIndex ? 1 : -1); setCurrentSlideIndex(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex ? 'w-8 bg-brand' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Nav + Play */}
          <div className="flex items-center gap-4 order-1 sm:order-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-semibold ${
                isPlaying
                  ? 'bg-brand/10 border-brand text-brand'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play with Voice'}
              {isPlaying && <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide counter */}
          <div className="text-sm text-white/30 font-medium tabular-nums order-3">
            {currentSlideIndex + 1} / {SLIDES.length}
          </div>
        </div>
      </div>
    </section>
  );
}
