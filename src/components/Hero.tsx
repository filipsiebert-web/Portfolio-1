import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TOKENS } from '../data';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [timeString, setTimeString] = useState('');
  const containerRef = useRef<HTMLElement>(null);

  // Parallax for portrait card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  // Live Warsaw Local Time
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Warsaw',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeString(`${formatted} CET`);
      } catch {
        const now = new Date();
        setTimeString(`${now.toLocaleTimeString()} WARSAW`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants for line-mask reveal
  const maskEase = [0.22, 1, 0.36, 1];
  const lineVariant = {
    hidden: { y: '115%' },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.1 + 0.1,
        ease: maskEase,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-8 md:px-12 max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Top Meta Row */}
      <div className="w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] pt-2 pb-6 border-b border-[#E4E1DA]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#111110]" />
          <span>PORTFOLIO 2026 — {TOKENS.city}</span>
        </div>
        <div className="tabular-nums font-medium text-[#111110]">
          {timeString || 'WARSAW, PL'}
        </div>
      </div>

      {/* Main Content Area: Headline + Floating Portrait */}
      <div className="my-auto py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* H1 with Line-Mask Reveals */}
        <div className="lg:col-span-8 flex flex-col">
          <h1
            id="hero-title"
            className="text-[clamp(3.5rem,9.5vw,8.5rem)] leading-[0.92] tracking-[-0.03em] font-serif uppercase font-normal text-[#111110] select-none"
          >
            {/* Line 1 */}
            <span className="block overflow-hidden py-1">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariant}
                className="block"
              >
                CREATIVE
              </motion.span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-hidden py-1">
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariant}
                className="block"
              >
                DEVELOPER <span className="font-serif italic font-normal text-[#FF4D00] lowercase tracking-normal px-1">&amp;</span>
              </motion.span>
            </span>

            {/* Line 3 */}
            <span className="block overflow-hidden py-1">
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={lineVariant}
                className="block font-serif italic lowercase tracking-normal text-[#111110]"
              >
                AI educator
              </motion.span>
            </span>
          </h1>

          {/* Intro Paragraph on Large screens */}
          <p className="mt-8 max-w-[46ch] font-sans text-base sm:text-lg text-[#6E6B66] leading-relaxed">
            I design and build fast, expressive web experiences — then teach teenagers to build their own with AI.
          </p>

          {/* Magnetic CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work" variant="solid" id="hero-work-cta">
              View selected work ↓
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" id="hero-contact-cta">
              Get in touch
            </MagneticButton>
          </div>
        </div>

        {/* Floating Portrait Card */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
          <motion.div
            style={{ y: portraitY }}
            className="relative group w-[280px] sm:w-[320px] lg:rotate-[-3deg] transition-transform duration-700 hover:rotate-0"
          >
            <div
              data-cursor="view"
              className="relative aspect-[4/5] w-full rounded-[6px] overflow-hidden border border-[#E4E1DA] bg-[#E4E1DA] shadow-sm"
            >
              <img
                src={TOKENS.portrait}
                alt="Adam X portrait"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
            {/* Caption */}
            <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] text-center lg:text-left">
              fig. 01 — the human behind the pixels
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row & Scroll Cue */}
      <div className="w-full flex items-end justify-between pt-6 border-t border-[#E4E1DA]">
        <div className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66]">
          EST. 2023 · WARSAW ARCHIVES
        </div>

        {/* Animated Scroll Cue */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6E6B66]">
            scroll
          </span>
          <div className="w-[1px] h-10 bg-[#111110]/20 overflow-hidden relative">
            <motion.div
              animate={{
                y: [-40, 40],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full bg-[#FF4D00]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
