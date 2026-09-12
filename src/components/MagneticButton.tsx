import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  href?: string;
  className?: string;
  variant?: 'solid' | 'outline' | 'accent' | 'text';
  target?: string;
  rel?: string;
  id?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'solid',
  target,
  rel,
  id,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for translation
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Constrain translation to maximum 12px
    const maxTranslate = 12;
    const normX = Math.max(-maxTranslate, Math.min(maxTranslate, distanceX * 0.35));
    const normY = Math.max(-maxTranslate, Math.min(maxTranslate, distanceY * 0.35));

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-mono text-[12px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 rounded-[999px] select-none cursor-pointer";

  let variantStyles = "";
  if (variant === 'solid') {
    variantStyles = "bg-[#111110] text-[#F7F6F3] hover:bg-[#FF4D00] hover:text-[#F7F6F3] px-7 py-3.5 border border-[#111110] hover:border-[#FF4D00]";
  } else if (variant === 'outline') {
    variantStyles = "bg-transparent text-[#111110] border border-[#111110] hover:border-[#FF4D00] hover:text-[#FF4D00] px-7 py-3.5";
  } else if (variant === 'accent') {
    variantStyles = "bg-[#FF4D00] text-[#F7F6F3] hover:bg-[#111110] hover:text-[#F7F6F3] px-7 py-3.5 border border-[#FF4D00]";
  } else if (variant === 'text') {
    variantStyles = "bg-transparent text-inherit px-2 py-1";
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <span className={`${baseStyles} ${variantStyles} ${className}`}>
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent p-0 border-none cursor-pointer"
    >
      {content}
    </button>
  );
}
