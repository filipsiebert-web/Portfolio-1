import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import GridGuides from './components/GridGuides';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import StackStrip from './components/StackStrip';
import Testimonials from './components/Testimonials';
import Lab from './components/Lab';
import Contact from './components/Contact';
import GameModal from './components/GameModal';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [gameModalOpen, setGameModalOpen] = useState(false);

  // Initialize Lenis Smooth Scroll (lerp 0.1)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F7F6F3] text-[#111110] selection:bg-[#FF4D00] selection:text-[#F7F6F3]">
      {/* 1. Global Experience Layers */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />
      <CustomCursor />
      <GrainOverlay />
      <GridGuides />
      <ScrollProgress />
      <Navbar />

      {/* 2. Structured Editorial Sections */}
      <main id="main-content">
        <Hero />
        <Marquee />
        <SelectedWork onOpenGame={() => setGameModalOpen(true)} />
        <About />
        <StackStrip />
        <Testimonials />
        <Lab />
        <Contact />
      </main>

      {/* 3. Interactive Highway Rush 60fps Arcade Dodger Modal */}
      <GameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
      />
    </div>
  );
}
