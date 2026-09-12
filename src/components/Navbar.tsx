import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOKENS } from '../data';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Lab', href: '#lab' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        id="main-navigation"
        className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-8 md:px-12 py-6 mix-blend-difference text-white pointer-events-none"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <a
            href="#"
            id="nav-logo"
            className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-white hover:text-[#FF4D00] transition-colors focus-visible:outline-[#FF4D00]"
          >
            {TOKENS.name}®
          </a>

          {/* Desktop Center Links with accent underline sweep */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-[0.14em] text-white py-1 transition-colors hover:text-white"
              >
                <span>{link.name}</span>
                {/* Accent underline sweep */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FF4D00] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Right Availability Pill */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              id="availability-pill"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/30 text-[11px] font-mono uppercase tracking-[0.14em] text-white hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]" />
              </span>
              <span>Open for projects</span>
            </a>
          </div>

          {/* Mobile Menu Burger Button */}
          <button
            id="mobile-menu-trigger"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="md:hidden flex items-center justify-center p-2 text-white hover:text-[#FF4D00] transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Fullscreen Ink Overlay Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] bg-[#111110] text-[#F7F6F3] flex flex-col justify-between p-8 sm:p-12"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-hairline-dark pb-6">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6E6B66]">
                {TOKENS.name}® — DIRECTORY
              </span>
              <button
                id="mobile-menu-close"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="p-2 text-[#F7F6F3] hover:text-[#FF4D00] transition-colors cursor-pointer"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Staggered Serif Links */}
            <div className="flex flex-col space-y-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline justify-between py-2 border-b border-hairline-dark hover:border-[#FF4D00] transition-colors"
                  >
                    <span className="font-serif text-4xl sm:text-5xl group-hover:italic group-hover:text-[#FF4D00] transition-all">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-[#6E6B66] group-hover:text-[#FF4D00]">
                      0{idx + 1}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Meta */}
            <div className="pt-6 border-t border-hairline-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#6E6B66] uppercase tracking-[0.12em]">
              <span>{TOKENS.role}</span>
              <a
                href={`mailto:${TOKENS.email}`}
                className="text-[#F7F6F3] hover:text-[#FF4D00] transition-colors"
              >
                {TOKENS.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
