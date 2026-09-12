import { Project, ServiceItem, Testimonial, LabExperiment, CounterItem } from './types';

export const TOKENS = {
  name: "Adam X",
  role: "Creative Developer & AI Educator",
  email: "adam@edu.com",
  city: "Warsaw, PL",
  gameUrl: "#",
  portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
};

export const PROJECTS: Project[] = [
  {
    id: "highway-rush",
    number: "01",
    title: "Highway Rush",
    year: "2026",
    role: "Game Dev",
    description: "Arcade dodger with oncoming traffic and a fair-spawn director that guarantees an escape route. 60fps Canvas, keyboard + invisible touch zones.",
    tags: ["TypeScript", "Canvas", "Game Loop"],
    liveUrl: "#",
    isPlayable: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    caption: "fig. 02 — real-time canvas vehicle dodger with fair-spawn director",
  },
  {
    id: "aurelia-estates",
    number: "02",
    title: "Aurelia Estates",
    year: "2025",
    role: "Creative Dev",
    description: "A scroll-driven camera journey through a 3D villa: five chapters, one continuous take.",
    tags: ["Next.js", "Three.js", "Framer Motion"],
    liveUrl: "https://aurelia-estates-alpha-flame.vercel.app",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    caption: "fig. 03 — single continuous camera pass through architectural geometry",
  },
  {
    id: "real-or-artificial",
    number: "03",
    title: "Real or Artificial?",
    year: "2025",
    role: "Speaking",
    description: "A 40-minute AI-literacy workshop built on plot twists: four quiz rounds where every answer is 'both are AI'. Delivered to 100+ students.",
    tags: ["Curriculum", "AI Education", "Public Speaking"],
    liveUrl: "https://github.com",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    caption: "fig. 04 — interactive generative AI workshop format for young developers",
  },
  {
    id: "space-explorer",
    number: "04",
    title: "Space Explorer",
    year: "2025",
    role: "Web Experience",
    description: "An interactive scroll voyage through the solar system with pinned scenes and parallax depth.",
    tags: ["Next.js", "Scroll Animation"],
    liveUrl: "https://space-explorer-navy.vercel.app",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop",
    caption: "fig. 05 — multi-layer celestial parallax and pinned astronomical chapters",
  },
];

export const COUNTERS: CounterItem[] = [
  { value: 12, suffix: "+", label: "projects shipped" },
  { value: 8, suffix: "", label: "workshops led" },
  { value: 100, suffix: "+", label: "students taught" },
  { value: 3, suffix: " yrs", label: "writing code" },
];

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Web Engineering",
    description: "Fast, accessible products in Next.js and TypeScript.",
  },
  {
    number: "02",
    title: "Creative Development",
    description: "Scroll stories, WebGL moments, motion systems.",
  },
  {
    number: "03",
    title: "AI Education",
    description: "Workshops and curricula that turn consumers into creators.",
  },
  {
    number: "04",
    title: "Product Design",
    description: "From wireframe to design system in Figma.",
  },
];

export const STACK_ITEMS = [
  "TypeScript",
  "Next.js",
  "React",
  "Three.js",
  "Framer Motion",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "Git",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "He explains AI like a native speaker — because he is one.",
    author: "Teacher",
    role: "Workshop host",
  },
  {
    quote: "The scroll experience he built outperformed our agency prototype.",
    author: "Client",
    role: "Design director",
  },
  {
    quote: "Best session of the year. Students still talk about it.",
    author: "Event organizer",
    role: "Youth STEM summit",
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "generative-mesh",
    number: "EXP-01",
    title: "Pulsing Chromatic Orb",
    description: "Mathematical color drift modulated by CSS blend modes and non-linear harmonic scales.",
    type: "orb",
  },
  {
    id: "terminal-runtime",
    number: "EXP-02",
    title: "AI Prompt Synthesizer",
    description: "Autonomous pseudo-terminal compiling natural speech tokens into vector embeddings.",
    type: "terminal",
  },
  {
    id: "isometric-lattice",
    number: "EXP-03",
    title: "Rotational Wireframe Lattice",
    description: "Zero-dependency pure-CSS 3D polyhedron performing continuous 3-axis orbital projection.",
    type: "cube",
  },
];
