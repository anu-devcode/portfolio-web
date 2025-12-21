/**
 * Skills Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { Skill } from '../types';
import type { Locale } from '../types';

export async function getSkills(locale: Locale = 'en'): Promise<Skill[]> {
  return await query<Skill>(
    'SELECT * FROM skills WHERE locale = $1 ORDER BY order_index ASC',
    [locale]
  );
}

export async function getSkillsByCategory(locale: Locale = 'en'): Promise<Record<string, Skill[]>> {
  const skills = await getSkills(locale);
  const grouped: Record<string, Skill[]> = {};
  
  for (const skill of skills) {
    const category = skill.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill);
  }
  
  return grouped;
}

