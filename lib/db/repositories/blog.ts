/**
 * Blog Repository
 * Server Component data fetching
 */

import { query } from '../index';
import { BlogPost, BlogTag } from '../types';
import type { Locale } from '../types';

export async function getBlogPosts(
  locale: Locale = 'en',
  publishedOnly: boolean = true,
  limit?: number
): Promise<BlogPost[]> {
  let sql = 'SELECT * FROM blog_posts WHERE locale = $1';
  const params: any[] = [locale];
  
  if (publishedOnly) {
    sql += ' AND published = $2 AND published_at IS NOT NULL';
    params.push(true);
  }
  
  sql += ' ORDER BY published_at DESC, created_at DESC';
  
  if (limit) {
    sql += ` LIMIT $${params.length + 1}`;
    params.push(limit);
  }
  
  const posts = await query<BlogPost>(sql, params);

  // Fetch tags for each post
  for (const post of posts) {
    post.tags = await query<BlogTag>(
      'SELECT * FROM blog_tags WHERE post_id = $1',
      [post.id]
    );
  }

  return posts;
}

export async function getBlogPostBySlug(slug: string, locale: Locale = 'en'): Promise<BlogPost | null> {
  const results = await query<BlogPost>(
    'SELECT * FROM blog_posts WHERE slug = $1 AND locale = $2 LIMIT 1',
    [slug, locale]
  );
  
  if (results[0]) {
    const post = results[0];
    post.tags = await query<BlogTag>(
      'SELECT * FROM blog_tags WHERE post_id = $1',
      [post.id]
    );
    return post;
  }
  
  return null;
}

