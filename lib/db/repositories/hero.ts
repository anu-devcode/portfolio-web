/**
 * Hero Data Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { HeroData, HeroService } from '../types';
import type { Locale } from '../types';

export async function getHeroData(locale: Locale = 'en'): Promise<HeroData | null> {
  const results = await query<HeroData>(
    'SELECT * FROM hero_data WHERE locale = $1 LIMIT 1',
    [locale]
  );
  return results[0] || null;
}

export async function getHeroServices(locale: Locale = 'en'): Promise<HeroService[]> {
  return await query<HeroService>(
    'SELECT * FROM hero_services WHERE locale = $1 ORDER BY order_index ASC',
    [locale]
  );
}

