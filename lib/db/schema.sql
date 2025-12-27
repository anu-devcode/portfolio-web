-- PostgreSQL Schema for Portfolio Website
-- Feature-based, maintainable architecture

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profile table (personal info, bio, etc.)
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  bio TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  avatar_url TEXT,
  social_links JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(locale)
);

-- Site settings for feature flags and theme
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  feature_ai_chatbot BOOLEAN DEFAULT true,
  feature_projects BOOLEAN DEFAULT true,
  feature_blog BOOLEAN DEFAULT true,
  feature_contact BOOLEAN DEFAULT true,
  theme_primary_color VARCHAR(50) DEFAULT 'blue',
  theme_accent_color VARCHAR(50) DEFAULT 'cyan',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(locale)
);

-- SEO Metadata
CREATE TABLE IF NOT EXISTS site_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  keywords TEXT[],
  author VARCHAR(255),
  og_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(locale)
);

-- Hero section data
CREATE TABLE IF NOT EXISTS hero_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  status_text VARCHAR(255),
  slogan_code VARCHAR(255),
  slogan_learn VARCHAR(255),
  slogan_innovate VARCHAR(255),
  slogan_grow VARCHAR(255),
  cta_text VARCHAR(255),
  contact_text VARCHAR(255),
  scroll_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(locale)
);

-- Hero service cards
CREATE TABLE IF NOT EXISTS hero_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(100),
  gradient VARCHAR(100),
  href VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  section_id VARCHAR(100) UNIQUE NOT NULL,
  gradient VARCHAR(100),
  border_color VARCHAR(100),
  glow_color VARCHAR(100),
  icon_gradient VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service features
CREATE TABLE IF NOT EXISTS service_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service technologies
CREATE TABLE IF NOT EXISTS service_technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  technology_name VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  icon VARCHAR(100),
  color VARCHAR(50),
  level INTEGER DEFAULT 0 CHECK (level >= 0 AND level <= 100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  gradient VARCHAR(100),
  border_color VARCHAR(100),
  glow_color VARCHAR(100),
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project technologies
CREATE TABLE IF NOT EXISTS project_technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology_name VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Work experience table
CREATE TABLE IF NOT EXISTS work_experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  location VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url VARCHAR(500),
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  author_id UUID REFERENCES users(id),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog post tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions (keep existing structure)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profile_locale ON profile(locale);
CREATE INDEX IF NOT EXISTS idx_hero_data_locale ON hero_data(locale);
CREATE INDEX IF NOT EXISTS idx_hero_services_locale ON hero_services(locale);
CREATE INDEX IF NOT EXISTS idx_services_locale ON services(locale);
CREATE INDEX IF NOT EXISTS idx_services_section_id ON services(section_id);
CREATE INDEX IF NOT EXISTS idx_skills_locale ON skills(locale);
CREATE INDEX IF NOT EXISTS idx_projects_locale ON projects(locale);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_work_experiences_locale ON work_experiences(locale);
CREATE INDEX IF NOT EXISTS idx_certificates_locale ON certificates(locale);
CREATE INDEX IF NOT EXISTS idx_blog_posts_locale ON blog_posts(locale);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id, created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_metadata_updated_at BEFORE UPDATE ON site_metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_data_updated_at BEFORE UPDATE ON hero_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_services_updated_at BEFORE UPDATE ON hero_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_experiences_updated_at BEFORE UPDATE ON work_experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

