/**
 * Skills Server Actions
 * Admin-only write operations
 */

'use server';

import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';
import type { Skill, Locale } from '@/lib/db/types';

export async function createSkill(
  locale: Locale,
  data: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'locale'>
) {
  await requireAuth();
  
  return await query(
    `INSERT INTO skills (locale, name, category, icon, color, level, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [locale, data.name, data.category, data.icon, data.color, data.level, data.order_index]
  );
}

export async function updateSkill(
  id: string,
  data: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'locale'>>
) {
  await requireAuth();
  
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  });
  
  if (updates.length === 0) {
    throw new Error('No fields to update');
  }
  
  values.push(id);
  return await query(
    `UPDATE skills SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
}

export async function deleteSkill(id: string) {
  await requireAuth();
  
  return await query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
}

