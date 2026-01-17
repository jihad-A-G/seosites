export interface Project {
  _id: string;
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
  category: 'web' | 'mobile' | 'saas' | 'ecommerce';
  technologies: string[];
  client: string;
  duration: string;
  liveUrl: string;
  githubUrl?: string;
  image?: string;
  images: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  avatar: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Technology {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  icon: string;
  proficiency: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface Stat {
  _id: string;
  label: string;
  value: string;
  page: 'home' | 'about' | 'portfolio' | 'all';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroContent {
  _id: string;
  page: 'home' | 'about' | 'services' | 'portfolio' | 'contact';
  badge?: {
    icon?: string;
    text?: string;
  };
  title: string;
  highlightedText?: string;
  subtitle: string;
  description?: string;
  ctaButtons?: {
    text: string;
    link: string;
    variant: 'primary' | 'secondary' | 'outline';
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CompanyValue {
  icon?: string;
  title: string;
  description: string;
  order?: number;
}

export interface CompanyInfo {
  _id: string;
  name: string;
  tagline?: string;
  foundedYear: number;
  story?: string;
  mission?: string;
  vision?: string;
  values: CompanyValue[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  _id: string;
  step: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  admin: Admin;
}
