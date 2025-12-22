/**
 * Hero Repository
 */

import { query, transaction, queryWithClient } from '../index';
import type { HeroData, HeroService, Locale } from '../types';

export class HeroRepository {
  static async getHeroData(locale: Locale): Promise<HeroData | null> {
    const result = await query<HeroData>(
      'SELECT * FROM hero_data WHERE locale = $1',
      [locale]
    );
    return result[0] || null;
  }

  static async getHeroServices(locale: Locale): Promise<HeroService[]> {
    return await query<HeroService>(
      'SELECT * FROM hero_services WHERE locale = $1 ORDER BY order_index ASC',
      [locale]
    );
  }

  static async upsertHeroData(locale: Locale, data: Partial<HeroData>): Promise<HeroData> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      const existing = await q<{ id: string }>(
        'SELECT id FROM hero_data WHERE locale = $1',
        [locale]
      );
      
      if (existing.length > 0) {
        const result = await q<HeroData>(
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
        const result = await q<HeroData>(
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

  static async createHeroService(locale: Locale, service: Omit<HeroService, 'id' | 'created_at' | 'updated_at' | 'locale'>): Promise<HeroService> {
    const result = await query<HeroService>(
      `INSERT INTO hero_services (locale, title, icon, gradient, href, order_index)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [locale, service.title, service.icon, service.gradient, service.href, service.order_index]
    );
    return result[0];
  }

  static async updateHeroService(id: string, service: Partial<HeroService>): Promise<HeroService> {
    const result = await query<HeroService>(
      `UPDATE hero_services SET
        title = COALESCE($1, title),
        icon = COALESCE($2, icon),
        gradient = COALESCE($3, gradient),
        href = COALESCE($4, href),
        order_index = COALESCE($5, order_index)
      WHERE id = $6
      RETURNING *`,
      [service.title, service.icon, service.gradient, service.href, service.order_index, id]
    );
    return result[0];
  }

  static async deleteHeroService(id: string): Promise<boolean> {
    const result = await query('DELETE FROM hero_services WHERE id = $1', [id]);
    return result.length > 0;
  }
}