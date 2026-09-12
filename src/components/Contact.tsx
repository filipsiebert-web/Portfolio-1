import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TOKENS } from '../data';
import MagneticButton from './MagneticButton';
import { ArrowUpRight, Check } from 'lucide-react';

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'X (Twitter)', href: 'https://x.com' },
  { name: 'Instagram', href: 'https://instagram.com' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TOKENS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Warsaw time in footer
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
        setTimeString(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const maskEase = [0.22, 1, 0.36, 1];
  const lineVariant = {
    hidden: { y: '115%' },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.12,
        ease: maskEase,
      },
    }),
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Collaborations"
      className="w-full bg-[#111110] text-[#F7F6F3] pt-28 pb-12 px-6 sm:px-8 md:px-12 border-t border-hairline-dark"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col justify-between min-h-[70vh]">
        <div>
          {/* Tag */}
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
              04 — CONTACT // INQUIRIES
            </span>
          </div>

          {/* Serif giant with line-mask reveal */}
          <div className="mb-16">
            <h2 className="font-serif text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.94] tracking-tight text-[#F7F6F3]">
              <span className="block overflow-hidden py-1">
                <motion.span
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={lineVariant}
                  className="block"
                >
                  Let&apos;s make something
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={lineVariant}
                  className="block font-serif italic text-[#F7F6F3]"
                >
                  people remember.
                </motion.span>
              </span>
            </h2>
          </div>

          {/* CTA & Email Row */}
          <div className="flex flex-wrap items-center gap-6 pb-20 border-b border-hairline-dark">
            <MagneticButton
              id="copy-email-btn"
              variant="accent"
              onClick={copyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <span className="flex items-center gap-2 text-[#F7F6F3]">
                  <Check className="w-3.5 h-3.5" />
                  Copied ✓
                </span>
              ) : (
                'Copy email'
              )}
            </MagneticButton>

            <a
              href={`mailto:${TOKENS.email}`}
              className="font-mono text-xs uppercase tracking-[0.16em] text-[#6E6B66] hover:text-[#FF4D00] transition-colors underline underline-offset-4"
            >
              {TOKENS.email}
            </a>
          </div>

          {/* Socials Row */}
          <div className="py-12 border-b border-hairline-dark">
            <div className="flex flex-wrap gap-8 sm:gap-14">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[#6E6B66] hover:text-[#FF4D00] transition-colors"
                >
                  <span>{soc.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Hairline Row */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6E6B66]">
          <div>
            © 2026 {TOKENS.name} — designed &amp; built by me · Next.js · Framer Motion · Vercel
          </div>

          <div className="flex items-center gap-8">
            <div className="tabular-nums">
              {timeString}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#FF4D00] transition-colors cursor-pointer select-none"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
