import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      aria-label="Client & Workshop Testimonials"
      className="w-full bg-[#F7F6F3] border-t border-[#E4E1DA] py-24 sm:py-32 px-6 sm:px-8 md:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2 mb-16 pb-6 border-b border-[#E4E1DA]">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
            EVIDENCE // TESTIMONIALS
          </span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[#111110]">
            What collaborators say
          </h2>
        </div>

        {/* 3 cards: grid desktop / horizontal scroll-snap mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 sm:pb-0 sm:grid sm:grid-cols-3 no-scrollbar"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="flex-shrink-0 w-[85vw] sm:w-auto snap-center flex flex-col justify-between p-8 rounded-[6px] bg-white border border-[#E4E1DA] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#FF4D00] transition-colors duration-300"
            >
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#111110] leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-[#E4E1DA]/80 flex flex-col font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-[#111110] font-semibold">{t.author}</span>
                <span className="text-[#6E6B66] mt-0.5">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
