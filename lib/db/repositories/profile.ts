/**
 * Profile Repository
 */

import { query } from '../index';
import type { Profile, Locale } from '../types';

export class ProfileRepository {
  static async getByLocale(locale: Locale): Promise<Profile | null> {
    const result = await query<Profile>(
      'SELECT * FROM profile WHERE locale = $1',
      [locale]
    );
    return result[0] || null;
  }

  static async upsert(locale: Locale, data: Partial<Profile>): Promise<Profile> {
    const existing = await this.getByLocale(locale);
    
    if (existing) {
      const result = await query<Profile>(
        `UPDATE profile SET 
          name = $1, title = $2, bio = $3, email = $4, phone = $5, 
          location = $6, avatar_url = $7, social_links = $8, status = $9
        WHERE locale = $10
        RETURNING *`,
        [
          data.name || existing.name,
          data.title || existing.title,
          data.bio || existing.bio,
          data.email || existing.email,
          data.phone || existing.phone,
          data.location || existing.location,
          data.avatar_url || existing.avatar_url,
          JSON.stringify(data.social_links || existing.social_links),
          data.status || existing.status,
          locale,
        ]
      );
      return result[0];
    } else {
      const result = await query<Profile>(
        `INSERT INTO profile (locale, name, title, bio, email, phone, location, avatar_url, social_links, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          locale,
          data.name || '',
          data.title,
          data.bio,
          data.email,
          data.phone,
          data.location,
          data.avatar_url,
          JSON.stringify(data.social_links || {}),
          data.status || 'available',
        ]
      );
      return result[0];
    }
  }
}