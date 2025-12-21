/**
 * Profile Server Actions
 * Admin-only write operations
 */

'use server';

import { requireAuth } from '@/lib/auth';
import { transaction, queryWithClient } from '@/lib/db';
import type { Profile, Locale } from '@/lib/db/types';

export async function updateProfile(
  locale: Locale,
  data: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'locale'>>
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    const query = queryWithClient(client);
    
    // Check if profile exists
    const existing = await query<{ id: string }>(
      'SELECT id FROM profile WHERE locale = $1',
      [locale]
    );
    
    if (existing.length > 0) {
      // Update existing
      const result = await query<Profile>(
        `UPDATE profile SET 
          name = $1, title = $2, bio = $3, email = $4, phone = $5, 
          location = $6, avatar_url = $7, social_links = $8, status = $9
        WHERE locale = $10
        RETURNING *`,
        [
          data.name,
          data.title,
          data.bio,
          data.email,
          data.phone,
          data.location,
          data.avatar_url,
          JSON.stringify(data.social_links || {}),
          data.status || 'available',
          locale,
        ]
      );
      return result[0];
    } else {
      // Create new
      const result = await query<Profile>(
        `INSERT INTO profile (locale, name, title, bio, email, phone, location, avatar_url, social_links, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
          locale,
          data.name,
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
  });
}

