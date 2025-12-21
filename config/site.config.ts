export interface SiteConfig {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage?: string;
  };
  features: {
    aiChatbot: boolean;
    projects: boolean;
    blog: boolean;
    contact: boolean;
  };
}

export const defaultConfig: SiteConfig = {
  personalInfo: {
    name: "Anwar Hussen",
    title: "Software Engineer",
    email: "anwarhussen3683@gmail.com",
    location: "Addis Ababa, Ethiopia",
    bio: "Junior Software Engineer focused on backend systems and AI, building scalable solutions that solve real-world problems.",
  },
  social: {
    github: "https://github.com/anu-devcode",
    linkedin: "https://linkedin.com/in/anwar-hussen-3683",
    twitter: "https://twitter.com/anu_devcode",
  },
  theme: {
    primaryColor: "blue",
    accentColor: "cyan",
  },
  seo: {
    title: "Professional Portfolio",
    description: "A professional portfolio website showcasing my work and expertise.",
    keywords: ["portfolio", "software engineer", "web developer"],
    author: "Anwar Hussen",
  },
  features: {
    aiChatbot: true,
    projects: true,
    blog: true,
    contact: true,
  },
};

