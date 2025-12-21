/**
 * Hero Data Server Actions
 * Admin-only write operations
 */

'use server';

import { requireAuth } from '@/lib/auth';
import { query, transaction, queryWithClient } from '@/lib/db';
import type { HeroData, HeroService, Locale } from '@/lib/db/types';

export async function updateHeroData(
  locale: Locale,
  data: Partial<Omit<HeroData, 'id' | 'created_at' | 'updated_at' | 'locale'>>
) {
  await requireAuth();
  
  return await transaction(async (client) => {
    const query = queryWithClient(client);
    
    const existing = await query<{ id: string }>(
      'SELECT id FROM hero_data WHERE locale = $1',
      [locale]
    );
    
    if (existing.length > 0) {
      const result = await query<HeroData>(
        `UPDATE hero_data SET 
          status_text = $1, slogan_code = $2, slogan_learn = $3, 
          slogan_innovate = $4, slogan_grow = $5, cta_text = $6, 
          contact_text = $7, scroll_text = $8
        WHERE locale = $9
        RETURNING *`,
        [
          data.status_text,
          data.slogan_code,
          data.slogan_learn,
          data.slogan_innovate,
          data.slogan_grow,
          data.cta_text,
          data.contact_text,
          data.scroll_text,
          locale,
        ]
      );
      return result[0];
    } else {
      const result = await query<HeroData>(
        `INSERT INTO hero_data (locale, status_text, slogan_code, slogan_learn, slogan_innovate, slogan_grow, cta_text, contact_text, scroll_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          locale,
          data.status_text,
          data.slogan_code,
          data.slogan_learn,
          data.slogan_innovate,
          data.slogan_grow,
          data.cta_text,
          data.contact_text,
          data.scroll_text,
        ]
      );
      return result[0];
    }
  });
}

export async function upsertHeroService(
  locale: Locale,
  service: Omit<HeroService, 'id' | 'created_at' | 'updated_at' | 'locale'>
) {
  await requireAuth();
  
  return await query(
    `INSERT INTO hero_services (locale, title, icon, gradient, href, order_index)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      icon = EXCLUDED.icon,
      gradient = EXCLUDED.gradient,
      href = EXCLUDED.href,
      order_index = EXCLUDED.order_index
    RETURNING *`,
    [locale, service.title, service.icon, service.gradient, service.href, service.order_index]
  );
}

export async function deleteHeroService(id: string) {
  await requireAuth();
  
  return await query('DELETE FROM hero_services WHERE id = $1 RETURNING *', [id]);
}

