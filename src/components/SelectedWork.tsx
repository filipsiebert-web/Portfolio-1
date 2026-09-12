import { useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkProps {
  onOpenGame?: () => void;
}

interface WorkRowProps {
  key?: string;
  project: Project;
  index: number;
  onOpenGame?: () => void;
}

function WorkRow({
  project,
  index,
  onOpenGame,
}: WorkRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Parallax y ±40 on scroll
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  const isEven = index % 2 === 1;

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (project.isPlayable) {
      e.preventDefault();
      onOpenGame?.();
    }
  };

  return (
    <div
      ref={rowRef}
      id={`project-${project.id}`}
      className="py-12 sm:py-16 md:py-20 border-t border-hairline-dark last:border-b"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Media Block (7 cols desktop) */}
        <div
          className={`lg:col-span-7 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          } overflow-hidden`}
        >
          <motion.div
            style={{ y: mediaY }}
            data-cursor="view"
            onClick={project.isPlayable ? onOpenGame : undefined}
            className="group relative aspect-[16/10] w-full rounded-[6px] overflow-hidden bg-[#1c1c1b] border border-hairline-dark cursor-pointer select-none"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            {/* Dark duotone gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Mono caption that fades in bottom-left on hover */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
              <span className="inline-block px-3 py-1 rounded bg-[#111110]/90 border border-hairline-dark font-mono text-[11px] text-[#F7F6F3] tracking-[0.1em]">
                {project.caption}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Text Block (5 cols desktop) */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Index & Year/Role */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#6E6B66] mb-3">
            <span className="text-[#FF4D00] font-semibold">{project.number}</span>
            <span>{project.year} · {project.role}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#F7F6F3] mb-4">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-[#6E6B66] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tag Pills (Hairline border, hover invert) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[999px] border border-hairline-dark font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E6B66] hover:bg-[#F7F6F3] hover:text-[#111110] transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link with arrow sliding 6px on hover */}
          <div>
            <a
              href={project.liveUrl}
              onClick={handleLinkClick}
              target={project.isPlayable ? undefined : '_blank'}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#F7F6F3] hover:text-[#FF4D00] transition-colors"
            >
              <span>{project.isPlayable ? 'Launch Arcade Engine' : 'View live'}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[6px] group-hover:-translate-y-[6px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork({ onOpenGame }: SelectedWorkProps) {
  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="w-full bg-[#111110] text-[#F7F6F3] py-24 sm:py-32 px-6 sm:px-8 md:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 pb-6 border-b border-hairline-dark">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF4D00]">
              01 — SELECTED WORK
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#F7F6F3]">
              Things I've shipped
            </h2>
          </div>
          <div className="hidden sm:block font-mono text-xs uppercase tracking-[0.14em] text-[#6E6B66] mt-4 sm:mt-0">
            2025 — 2026 ARCHIVE
          </div>
        </div>

        {/* Alternating Project Rows */}
        <div className="flex flex-col">
          {PROJECTS.map((project, idx) => (
            <WorkRow
              key={project.id}
              project={project}
              index={idx}
              onOpenGame={onOpenGame}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-12 flex justify-end">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#6E6B66] hover:text-[#FF4D00] transition-colors"
          >
            <span>More experiments on GitHub</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
