export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

