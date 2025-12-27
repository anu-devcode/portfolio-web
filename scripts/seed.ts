/**
 * Comprehensive Database Seeding Script
 * Populate database with professional portfolio data in multiple languages
 */

import { hashPassword } from '../lib/auth';
import { query } from '../lib/db';
import { defaultConfig } from '../config/site.config';

async function seed() {
  try {
    console.log('🌱 Starting comprehensive database seeding...');

    // 1. Admin User
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hashPassword(adminPassword);

    await query(
      `INSERT INTO users (email, password_hash, name, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING`,
      ['admin@example.com', hashedPassword, 'Anwar Hussen', 'admin']
    );

    // 2. Clear existing entries to avoid duplicates
    console.log('🧹 Cleaning old data...');
    await query('DELETE FROM work_experiences');
    await query('DELETE FROM project_technologies');
    await query('DELETE FROM projects');
    await query('DELETE FROM service_features');
    await query('DELETE FROM service_technologies');
    await query('DELETE FROM services');
    await query('DELETE FROM skills');
    await query('DELETE FROM hero_services');
    await query('DELETE FROM hero_data');
    await query('DELETE FROM site_settings');
    await query('DELETE FROM site_metadata');
    await query('DELETE FROM profile');

    // 2.1 Site Settings & Metadata
    console.log('⚙️ Seeding site settings and metadata...');
    const settings = [
      {
        locale: 'en',
        feature_ai_chatbot: defaultConfig.features.aiChatbot,
        feature_projects: defaultConfig.features.projects,
        feature_blog: defaultConfig.features.blog,
        feature_contact: defaultConfig.features.contact,
        theme_primary_color: defaultConfig.theme.primaryColor,
        theme_accent_color: defaultConfig.theme.accentColor
      },
      {
        locale: 'am',
        feature_ai_chatbot: defaultConfig.features.aiChatbot,
        feature_projects: defaultConfig.features.projects,
        feature_blog: defaultConfig.features.blog,
        feature_contact: defaultConfig.features.contact,
        theme_primary_color: defaultConfig.theme.primaryColor,
        theme_accent_color: defaultConfig.theme.accentColor
      }
    ];

    for (const s of settings) {
      await query(
        `INSERT INTO site_settings (locale, feature_ai_chatbot, feature_projects, feature_blog, feature_contact, theme_primary_color, theme_accent_color)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [s.locale, s.feature_ai_chatbot, s.feature_projects, s.feature_blog, s.feature_contact, s.theme_primary_color, s.theme_accent_color]
      );
    }

    const metadata = [
      {
        locale: 'en',
        title: defaultConfig.seo.title,
        description: defaultConfig.seo.description,
        keywords: defaultConfig.seo.keywords,
        author: defaultConfig.seo.author
      },
      {
        locale: 'am',
        title: 'የአንዋር ሁሴን ፕሮፌሽናል ፖርትፎሊዮ',
        description: 'የአንዋር ሁሴን የሶፍትዌር ኢንጂነሪንግ ስራዎች እና ፕሮጀክቶች ማሳያ።',
        keywords: ['ፖርትፎሊዮ', 'ሶፍትዌር', 'ኢንጂነሪንግ'],
        author: 'አንዋር ሁሴን'
      }
    ];

    for (const m of metadata) {
      await query(
        `INSERT INTO site_metadata (locale, title, description, keywords, author)
        VALUES ($1, $2, $3, $4, $5)`,
        [m.locale, m.title, m.description, m.keywords, m.author]
      );
    }

    // 3. Profile Seeding
    console.log('👤 Seeding profiles...');
    const profiles = [
      {
        locale: 'en',
        name: defaultConfig.personalInfo.name,
        title: 'Backend Engineer & AI Specialist',
        bio: defaultConfig.personalInfo.bio,
        email: defaultConfig.personalInfo.email,
        phone: defaultConfig.personalInfo.phone,
        location: defaultConfig.personalInfo.location,
        social_links: JSON.stringify(defaultConfig.social),
        status: 'available'
      },
      {
        locale: 'am',
        name: 'አንዋር ሁሴን',
        title: 'ባለሙያ ሶፍትዌር መሃንዲስ',
        bio: 'በሶፍትዌር ልማት እና አርቴፊሻል ኢንተለጀንስ ላይ ያተኮርኩ መሃንዲስ። ውስብስብ ችግሮችን የሚፈቱ ስራዎችን እሰራለሁ።',
        email: defaultConfig.personalInfo.email,
        phone: defaultConfig.personalInfo.phone,
        location: 'አዲስ አበባ፣ ኢትዮጵያ',
        social_links: JSON.stringify(defaultConfig.social),
        status: 'available'
      }
    ];

    for (const p of profiles) {
      await query(
        `INSERT INTO profile (locale, name, title, bio, email, phone, location, social_links, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [p.locale, p.name, p.title, p.bio, p.email, p.phone, p.location, p.social_links, p.status]
      );
    }

    // 4. Hero Data
    console.log('🎭 Seeding hero data...');
    const heroData = [
      {
        locale: 'en',
        status_text: 'Open to new opportunities',
        slogan_code: 'Code with',
        slogan_innovate: 'Purpose',
        slogan_grow: 'Connect',
        cta_text: 'View Projects',
        contact_text: 'Hire Me',
        scroll_text: 'Explore'
      },
      {
        locale: 'am',
        status_text: 'ለአዳዲስ ስራዎች ዝግጁ ነኝ',
        slogan_code: 'በጥበብ',
        slogan_innovate: 'መስራት',
        slogan_grow: 'መፍጠር',
        cta_text: 'ፕሮጀክቶችን እይ',
        contact_text: 'አግኘኝ',
        scroll_text: 'ተጨማሪ እይ'
      }
    ];

    for (const h of heroData) {
      await query(
        `INSERT INTO hero_data (locale, status_text, slogan_code, slogan_innovate, slogan_grow, cta_text, contact_text, scroll_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [h.locale, h.status_text, h.slogan_code, h.slogan_innovate, h.slogan_grow, h.cta_text, h.contact_text, h.scroll_text]
      );
    }

    // 5. Hero Services (Preview cards)
    console.log('🃏 Seeding hero services...');
    const hServices = [
      { locale: 'en', title: 'Backend', icon: 'Database', gradient: 'from-blue-600 to-indigo-600', href: '#services', order: 0 },
      { locale: 'en', title: 'AI Solutions', icon: 'Bot', gradient: 'from-purple-600 to-pink-600', href: '#services', order: 1 },
      { locale: 'en', title: 'Full Stack', icon: 'Code', gradient: 'from-cyan-600 to-teal-600', href: '#services', order: 2 },
      { locale: 'am', title: 'ባክ-ኤንድ', icon: 'Database', gradient: 'from-blue-600 to-indigo-600', href: '#services', order: 0 },
      { locale: 'am', title: 'ሰው ሰራሽ ብልሃት', icon: 'Bot', gradient: 'from-purple-600 to-pink-600', href: '#services', order: 1 },
      { locale: 'am', title: 'ሙሉ ልማት', icon: 'Code', gradient: 'from-cyan-600 to-teal-600', href: '#services', order: 2 }
    ];

    for (const hs of hServices) {
      await query(
        `INSERT INTO hero_services (locale, title, icon, gradient, href, order_index)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [hs.locale, hs.title, hs.icon, hs.gradient, hs.href, hs.order]
      );
    }

    // 6. Main Services
    console.log('🛠️ Seeding services...');
    const mainServices = [
      {
        locale: 'en',
        title: 'Backend Development',
        description: 'Building robust, scalable server-side systems with modern technologies.',
        icon: 'Server',
        section_id: 'backend-en',
        features: ['API Design', 'Microservices', 'Auth Systems'],
        tech: ['Node.js', 'PostgreSQL', 'Docker']
      },
      {
        locale: 'en',
        title: 'AI & Automation',
        description: 'Integrating intelligent features and automating complex workflows.',
        icon: 'Cpu',
        section_id: 'ai-automation-en',
        features: ['NLP Integration', 'Custom Bots', 'Workflow Optimization'],
        tech: ['OpenAI', 'Python', 'LangChain']
      },
      {
        locale: 'am',
        title: 'የባክ-ኤንድ ልማት',
        description: 'ዘመናዊ ቴክኖሎጂዎችን በመጠቀም ጠንካራ እና ሊሰፉ የሚችሉ የአገልጋይ ሲስተሞችን መገንባት።',
        icon: 'Server',
        section_id: 'backend-am',
        features: ['የኤፒአይ ዲዛይን', 'ማይክሮ ሰርቪስ', 'የደህንነት ሲስተሞች'],
        tech: ['Node.js', 'PostgreSQL', 'Docker']
      },
      {
        locale: 'am',
        title: 'ሰው ሰራሽ ብልሃት እና አውቶሜሽን',
        description: 'ብልህ ባህሪያትን ማቀናጀት እና ውስብስብ የስራ ሂደቶችን በራስ-ሰር መስራት።',
        icon: 'Cpu',
        section_id: 'ai-automation-am',
        features: ['የቋንቋ ሞዴል ቅንጅት', 'ብጁ ቦቶች', 'የስራ ሂደት ማሻሻል'],
        tech: ['OpenAI', 'Python', 'LangChain']
      }
    ];

    // Seed English services and their nested items
    for (const s of mainServices) {
      const result = await query(
        `INSERT INTO services (locale, title, description, icon, section_id, order_index)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [s.locale, s.title, s.description, s.icon, s.section_id, 0]
      );
      const serviceId = result[0].id;

      for (const f of s.features) {
        await query(`INSERT INTO service_features (service_id, feature_text) VALUES ($1, $2)`, [serviceId, f]);
      }
      for (const t of s.tech) {
        await query(`INSERT INTO service_technologies (service_id, technology_name) VALUES ($1, $2)`, [serviceId, t]);
      }
    }

    // 7. Skills
    console.log('⚡ Seeding skills...');
    const skills = [
      { locale: 'en', name: 'TypeScript', category: 'Frontend', icon: 'Code', color: '#3178C6', level: 90 },
      { locale: 'en', name: 'React', category: 'Frontend', icon: 'Layout', color: '#61DAFB', level: 85 },
      { locale: 'en', name: 'Node.js', category: 'Backend', icon: 'Server', color: '#339933', level: 88 },
      { locale: 'en', name: 'PostgreSQL', category: 'Database', icon: 'Database', color: '#336791', level: 85 },
      { locale: 'am', name: 'TypeScript', category: 'Frontend', icon: 'Code', color: '#3178C6', level: 90 },
      { locale: 'am', name: 'React', category: 'Frontend', icon: 'Layout', color: '#61DAFB', level: 85 },
      { locale: 'am', name: 'Node.js', category: 'Backend', icon: 'Server', color: '#339933', level: 88 },
      { locale: 'am', name: 'PostgreSQL', category: 'Database', icon: 'Database', color: '#336791', level: 85 }
    ];

    for (const sk of skills) {
      await query(
        `INSERT INTO skills (locale, name, category, icon, color, level)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [sk.locale, sk.name, sk.category, sk.icon, sk.color, sk.level]
      );
    }

    // 8. Projects
    console.log('💻 Seeding projects...');
    const projects = [
      {
        locale: 'en',
        title: 'Professional Portfolio',
        description: 'A multilingual portfolio with 3D elements and AI chat.',
        live_url: 'https://portfolio.example.com',
        github_url: 'https://github.com/anu-devcode/portfolio-web',
        featured: true,
        tech: ['Next.js', 'Three.js', 'PostgreSQL']
      },
      {
        locale: 'am',
        title: 'ፕሮፌሽናል ፖርትፎሊዮ',
        description: 'ባለብዙ ቋንቋ፣ 3D ክፍሎች እና አርቴፊሻል ኢንተለጀንስ ቻት ያለው ፖርትፎሊዮ።',
        live_url: 'https://portfolio.example.com',
        github_url: 'https://github.com/anu-devcode/portfolio-web',
        featured: true,
        tech: ['Next.js', 'Three.js', 'PostgreSQL']
      }
    ];

    for (const pr of projects) {
      const result = await query(
        `INSERT INTO projects (locale, title, description, live_url, github_url, featured)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [pr.locale, pr.title, pr.description, pr.live_url, pr.github_url, pr.featured]
      );
      const projectId = result[0].id;
      for (const pt of pr.tech) {
        await query(`INSERT INTO project_technologies (project_id, technology_name) VALUES ($1, $2)`, [projectId, pt]);
      }
    }

    // 9. Work Experience
    console.log('🏢 Seeding work experiences...');
    await query(
      `INSERT INTO work_experiences (locale, company, position, description, start_date, current)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      ['en', 'Freelance', 'Full Stack Developer', 'Developing custom web applications and AI integrations.', '2023-01-01', true]
    );

    await query(
      `INSERT INTO work_experiences (locale, company, position, description, start_date, current)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      ['am', 'ፍሪላንስ', 'ሙሉ ሶፍትዌር አልሚ', 'ብጁ የድር መተግበሪያዎችን እና የሰው ሰራሽ ብልሃት ቅንጅቶችን ማልማት።', '2023-01-01', true]
    );

    console.log('✅ All data seeded successfully!');
    console.log('📧 Admin: admin@example.com / ' + adminPassword);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
