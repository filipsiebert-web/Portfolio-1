import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Springs for smooth follow
  const springConfig = { stiffness: 300, damping: 30 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Check if pointer is fine (mouse, trackpad) and not touch
    const fineMatch = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!fineMatch.matches || reducedMotion) {
      setIsPointerFine(false);
      return;
    }

    setIsPointerFine(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewElement = target.closest('[data-cursor="view"]');
      if (viewElement) {
        setCursorState('view');
        return;
      }

      const interactiveElement = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');
      if (interactiveElement) {
        setCursorState('hover');
        return;
      }

      setCursorState('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerFine || !isVisible) return null;

  const isView = cursorState === 'view';
  const isHover = cursorState === 'hover';

  const ringSize = isView ? 96 : isHover ? 58 : 36;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* 6px Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FF4D00] pointer-events-none z-10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isView ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          backgroundColor: isView ? 'rgba(255, 77, 0, 0.92)' : 'transparent',
          borderColor: isView ? 'transparent' : isHover ? '#FF4D00' : 'rgba(17, 17, 16, 0.45)',
          borderWidth: isView ? 0 : 1.5,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 320,
          damping: 26,
        }}
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#F7F6F3] font-semibold select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
