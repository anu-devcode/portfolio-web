/**
 * Certificates Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { Certificate } from '../types';
import type { Locale } from '../types';

export async function getCertificates(locale: Locale = 'en'): Promise<Certificate[]> {
  return await query<Certificate>(
    'SELECT * FROM certificates WHERE locale = $1 ORDER BY order_index ASC, issue_date DESC',
    [locale]
  );
}

