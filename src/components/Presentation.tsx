import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Play,
  Pause,
  Volume2,
  TrendingUp
} from 'lucide-react';
import { SLIDES } from '../data/slides';
import SlideIllustration from './slides/SlideIllustration';

interface PresentationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Presentation({ isOpen, onClose }: PresentationProps) {
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

  // Reset to first slide when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setDirection(0);
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Keyboard navigation — only when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  // Audio playback using pre-recorded WAV files
  useEffect(() => {
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (!isPlaying || !isOpen) return;

    const audio = new Audio(`/audio/slide-${currentSlideIndex + 1}.wav`);
    audioRef.current = audio;

    audio.play().catch(() => {
      // Audio file not yet generated — fallback: auto-advance after 6s
      const timer = setTimeout(nextSlide, 6000);
      return () => clearTimeout(timer);
    });

    audio.onended = () => {
      setTimeout(nextSlide, 1500);
    };

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentSlideIndex, isPlaying, isOpen]);

  // Cleanup audio on close
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
  }, [isOpen]);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#050505]/98 backdrop-blur-sm flex flex-col overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#B2FF05]/8 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#BF40BF]/8 blur-[120px] rounded-full" />
          </div>

          {/* Header: Logo + Progress Dots */}
          <header className="relative z-10 px-6 py-5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#B2FF05] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">ELEVATE</span>
            </div>
            <div className="flex gap-1.5 items-center">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > currentSlideIndex ? 1 : -1); setCurrentSlideIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex ? 'w-8 bg-[#B2FF05]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="text-sm text-white/40 font-medium tabular-nums w-20 text-right">
              {currentSlideIndex + 1} / {SLIDES.length}
            </div>
          </header>

          {/* Main Slide Content */}
          <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-16 pb-4 min-h-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlideIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Left: Text Content */}
                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className={`text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight ${currentSlide.accentColor || 'text-white'}`}
                  >
                    {currentSlide.title}
                  </motion.h1>

                  <motion.ul
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentSlide.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="mt-1 p-1 rounded-full bg-white/5 group-hover:bg-[#B2FF05]/20 transition-colors shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#B2FF05]" />
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
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring', damping: 20 }}
                  className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group"
                >
                  <SlideIllustration slide={currentSlide} />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white/50 italic">{currentSlide.illustration.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer: Nav Controls */}
          <footer className="relative z-10 px-6 pb-6 pt-2 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
                title="Previous (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === SLIDES.length - 1}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
                title="Next (→ / Space)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isPlaying
                    ? 'bg-[#B2FF05]/10 border-[#B2FF05] text-[#B2FF05]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isPlaying ? 'Stop' : 'Play with Voice'}
                </span>
                {isPlaying && <Volume2 className="w-4 h-4 animate-pulse" />}
              </button>

              <div className="hidden md:flex items-center gap-3 text-white/30 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[10px]">SPACE</kbd> Next
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[10px]">←</kbd>
                  <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[10px]">→</kbd> Nav
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[10px]">ESC</kbd> Close
                </span>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
