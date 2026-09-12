export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  liveUrl: string;
  image: string;
  caption: string;
  isPlayable?: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface LabExperiment {
  id: string;
  number: string;
  title: string;
  description: string;
  type: 'orb' | 'terminal' | 'cube';
}

export interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}
