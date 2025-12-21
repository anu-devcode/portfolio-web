/**
 * Database Types
 * Type-safe database models
 */

export type Locale = 'en' | 'am';

// User types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  role: string;
  created_at: Date;
  updated_at: Date;
}

// Profile types
export interface Profile {
  id: string;
  locale: Locale;
  name: string;
  title: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  social_links: Record<string, string>;
  status: string;
  created_at: Date;
  updated_at: Date;
}

// Hero data types
export interface HeroData {
  id: string;
  locale: Locale;
  status_text: string | null;
  slogan_code: string | null;
  slogan_learn: string | null;
  slogan_innovate: string | null;
  slogan_grow: string | null;
  cta_text: string | null;
  contact_text: string | null;
  scroll_text: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface HeroService {
  id: string;
  locale: Locale;
  title: string;
  icon: string | null;
  gradient: string | null;
  href: string | null;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

// Service types
export interface Service {
  id: string;
  locale: Locale;
  title: string;
  description: string | null;
  icon: string | null;
  section_id: string;
  gradient: string | null;
  border_color: string | null;
  glow_color: string | null;
  icon_gradient: string | null;
  order_index: number;
  created_at: Date;
  updated_at: Date;
  features?: ServiceFeature[];
  technologies?: ServiceTechnology[];
}

export interface ServiceFeature {
  id: string;
  service_id: string;
  feature_text: string;
  order_index: number;
  created_at: Date;
}

export interface ServiceTechnology {
  id: string;
  service_id: string;
  technology_name: string;
  order_index: number;
  created_at: Date;
}

// Skill types
export interface Skill {
  id: string;
  locale: Locale;
  name: string;
  category: string | null;
  icon: string | null;
  color: string | null;
  level: number;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

// Project types
export interface Project {
  id: string;
  locale: Locale;
  title: string;
  description: string | null;
  image_url: string | null;
  gradient: string | null;
  border_color: string | null;
  glow_color: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
  technologies?: ProjectTechnology[];
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  technology_name: string;
  order_index: number;
  created_at: Date;
}

// Work experience types
export interface WorkExperience {
  id: string;
  locale: Locale;
  company: string;
  position: string;
  description: string | null;
  start_date: Date | null;
  end_date: Date | null;
  current: boolean;
  location: string | null;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

// Certificate types
export interface Certificate {
  id: string;
  locale: Locale;
  title: string;
  issuer: string | null;
  issue_date: Date | null;
  expiry_date: Date | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

// Blog types
export interface BlogPost {
  id: string;
  locale: Locale;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: Date | null;
  author_id: string | null;
  views: number;
  created_at: Date;
  updated_at: Date;
  tags?: BlogTag[];
}

export interface BlogTag {
  id: string;
  post_id: string;
  tag_name: string;
  created_at: Date;
}

// Contact types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  ip_address: string | null;
  read: boolean;
  created_at: Date;
}

// Chat types
export interface ChatSession {
  id: string;
  session_id: string;
  ip_address: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
}

