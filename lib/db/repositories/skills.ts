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

export async function createSkill(locale: Locale, skill: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'locale'>): Promise<Skill> {
  const result = await query<Skill>(
    `INSERT INTO skills (locale, name, category, level, color, icon, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [locale, skill.name, skill.category, skill.level, skill.color, skill.icon, skill.order_index]
  );
  return result[0];
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
  const result = await query<Skill>(
    `UPDATE skills SET
      name = COALESCE($1, name),
      category = COALESCE($2, category),
      level = COALESCE($3, level),
      color = COALESCE($4, color),
      icon = COALESCE($5, icon),
      order_index = COALESCE($6, order_index)
    WHERE id = $7
    RETURNING *`,
    [skill.name, skill.category, skill.level, skill.color, skill.icon, skill.order_index, id]
  );
  return result[0];
}

export async function deleteSkill(id: string): Promise<boolean> {
  const result = await query('DELETE FROM skills WHERE id = $1', [id]);
  return result.length > 0;
}

