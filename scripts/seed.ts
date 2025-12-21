/**
 * Database Seeding Script
 * Populate database with initial data
 */

import { hashPassword } from '../lib/auth';
import { query } from '../lib/db';
import { defaultConfig } from '../config/site.config';

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    
    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hashPassword(adminPassword);
    
    await query(
      `INSERT INTO users (email, password_hash, name, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING`,
      ['admin@example.com', hashedPassword, 'Admin User', 'admin']
    );
    
    // Seed profile
    await query(
      `INSERT INTO profile (locale, name, title, bio, email, location, social_links, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (locale) DO UPDATE SET
        name = EXCLUDED.name,
        title = EXCLUDED.title,
        bio = EXCLUDED.bio,
        email = EXCLUDED.email,
        location = EXCLUDED.location,
        social_links = EXCLUDED.social_links`,
      [
        'en',
        defaultConfig.personalInfo.name,
        defaultConfig.personalInfo.title,
        defaultConfig.personalInfo.bio,
        defaultConfig.personalInfo.email,
        defaultConfig.personalInfo.location,
        JSON.stringify(defaultConfig.social),
        'available',
      ]
    );
    
    // Seed hero data
    await query(
      `INSERT INTO hero_data (locale, status_text, cta_text, contact_text, scroll_text)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (locale) DO NOTHING`,
      [
        'en',
        'Available for work',
        'View My Work',
        'Get In Touch',
        'Scroll to explore',
      ]
    );
    
    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin credentials:');
    console.log('   Email: admin@example.com');
    console.log(`   Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();

