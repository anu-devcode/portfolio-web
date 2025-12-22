/**
 * Contact Repository
 */

import { query } from '../index';
import type { ContactSubmission } from '../types';

export class ContactRepository {
  static async create(data: Omit<ContactSubmission, 'id' | 'created_at' | 'read'>): Promise<ContactSubmission> {
    const result = await query<ContactSubmission>(
      `INSERT INTO contact_submissions (name, email, message, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [data.name, data.email, data.message, data.ip_address]
    );
    return result[0];
  }

  static async getAll(limit = 50, offset = 0): Promise<ContactSubmission[]> {
    return await query<ContactSubmission>(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  }

  static async markAsRead(id: string): Promise<boolean> {
    const result = await query(
      'UPDATE contact_submissions SET read = true WHERE id = $1',
      [id]
    );
    return result.length > 0;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM contact_submissions WHERE id = $1', [id]);
    return result.length > 0;
  }
}