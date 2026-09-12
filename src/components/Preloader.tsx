import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOKENS } from '../data';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [showName, setShowName] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('adamx_portfolio_visited');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasVisited || prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    sessionStorage.setItem('adamx_portfolio_visited', 'true');

    // 0 to 100 counter over ~600ms
    const startTime = performance.now();
    const duration = 550; // ms

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out progress for organic counter feeling
      const currentVal = Math.floor(progress * 100);
      setCount(currentVal);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(100);
        setShowName(true);

        // Curtain wipe after name reveal
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 400);
        }, 450);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="preloader-curtain"
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        exit={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }}
        className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#111110] text-[#F7F6F3] select-none"
      >
        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-[0.15em] text-[#6E6B66]">
          <span>INDEX // 00</span>
          <span>{TOKENS.city}</span>
        </div>

        <div className="flex flex-col items-center justify-center my-auto">
          <div className="overflow-hidden mb-3">
            <AnimatePresence mode="wait">
              {showName ? (
                <motion.div
                  key="name"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#F7F6F3]"
                >
                  {TOKENS.name}
                </motion.div>
              ) : (
                <motion.div
                  key="loading-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-mono tracking-[0.2em] text-[#6E6B66] uppercase"
                >
                  INITIALIZING RUNTIME
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="font-mono text-6xl sm:text-7xl md:text-8xl font-light tracking-tighter tabular-nums text-[#F7F6F3]">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-[0.12em] text-[#6E6B66]">
          <span>{TOKENS.role}</span>
          <span className="tabular-nums">2026</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
