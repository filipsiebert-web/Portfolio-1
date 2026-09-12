import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { TOKENS, SERVICES, COUNTERS } from '../data';
import { ArrowUpRight } from 'lucide-react';

interface CounterItemViewProps {
  key?: string;
  target: number;
  suffix: string;
  label: string;
  inView: boolean;
}

function CounterItemView({
  target,
  suffix,
  label,
  inView,
}: CounterItemViewProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200; // 1.2s easeOut
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div className="flex flex-col border-t border-[#E4E1DA] pt-4">
      <div className="font-mono text-3xl sm:text-4xl font-light text-[#111110] tracking-tight tabular-nums">
        {count}
        <span className="text-[#FF4D00]">{suffix}</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E6B66] mt-1">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const countersRef = useRef<HTMLDivElement>(null);
  const countersInView = useInView(countersRef, { once: true, margin: '-40px' });

  return (
    <section
      id="about"
      aria-label="About Adam X"
      className="w-full bg-[#F7F6F3] text-[#111110] py-24 sm:py-32 px-6 sm:px-8 md:px-12 border-t border-[#E4E1DA]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Tag */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
            02 — PHILOSOPHY &amp; PEDAGOGY
          </span>
        </div>

        {/* Sticky Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-8">
            <div
              data-cursor="view"
              className="relative aspect-[4/5] w-full max-w-[420px] rounded-[6px] overflow-hidden border border-[#E4E1DA] bg-[#E4E1DA]"
            >
              <img
                src={TOKENS.portrait}
                alt="Adam X portrait"
                loading="lazy"
                className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-out hover:grayscale-0 hover:scale-105"
              />
            </div>

            {/* Animated Counters (Count up on first view, 1.2s) */}
            <div
              ref={countersRef}
              className="grid grid-cols-2 gap-6 max-w-[420px]"
            >
              {COUNTERS.map((c) => (
                <CounterItemView
                  key={c.label}
                  target={c.value}
                  suffix={c.suffix}
                  label={c.label}
                  inView={countersInView}
                />
              ))}
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            <div>
              <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none text-[#111110] mb-8">
                Behind the cursor
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-[#6E6B66] leading-relaxed max-w-[65ch]">
                <p>
                  I started building for the web before I could drive. What began as tweaking game mods became shipping real products — games, 3D experiences, tools people actually use.
                </p>
                <p>
                  Today I split my time between building and teaching: running workshops where teenagers discover that a good idea plus a good prompt beats memorized syntax.
                </p>
                <p>
                  My rule: taste first, tools second. Technology changes every month; knowing what feels right never expires.
                </p>
              </div>
            </div>

            {/* WHAT I DO Numbered Rows */}
            <div className="pt-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#111110] mb-6 pb-2 border-b border-[#E4E1DA]">
                WHAT I DO // CORE DISCIPLINES
              </h3>

              <div className="flex flex-col">
                {SERVICES.map((srv) => (
                  <div
                    key={srv.number}
                    className="group relative border-t border-[#E4E1DA] py-6 px-4 -mx-4 transition-all duration-300 hover:bg-[#111110] hover:text-[#F7F6F3] cursor-default rounded-[4px]"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs text-[#FF4D00] group-hover:text-[#FF4D00]">
                          {srv.number}
                        </span>
                        <div>
                          <h4 className="font-serif text-2xl sm:text-3xl text-[#111110] group-hover:text-[#F7F6F3] transition-colors">
                            {srv.title}
                          </h4>
                          <p className="font-sans text-sm text-[#6E6B66] group-hover:text-[#6E6B66] group-hover:text-white/70 mt-1">
                            {srv.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow appearing on hover */}
                      <div className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowUpRight className="w-5 h-5 text-[#FF4D00]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
