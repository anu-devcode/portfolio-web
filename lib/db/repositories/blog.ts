/**
 * Blog Repository
 */

import { query, transaction, queryWithClient } from '../index';
import { BlogPost, BlogTag, Locale } from '../types';

export class BlogRepository {
  static async getAll(locale: Locale, publishedOnly: boolean = true, limit?: number): Promise<BlogPost[]> {
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

    for (const post of posts) {
      post.tags = await query<BlogTag>(
        'SELECT * FROM blog_tags WHERE post_id = $1',
        [post.id]
      );
    }

    return posts;
  }

  static async getById(id: string): Promise<BlogPost | null> {
    const results = await query<BlogPost>(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id]
    );
    
    if (results.length === 0) return null;
    
    const post = results[0];
    post.tags = await query<BlogTag>(
      'SELECT * FROM blog_tags WHERE post_id = $1',
      [post.id]
    );
    return post;
  }

  static async getBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
    const results = await query<BlogPost>(
      'SELECT * FROM blog_posts WHERE slug = $1 AND locale = $2',
      [slug, locale]
    );
    
    if (results.length === 0) return null;
    
    const post = results[0];
    post.tags = await query<BlogTag>(
      'SELECT * FROM blog_tags WHERE post_id = $1',
      [post.id]
    );
    return post;
  }

  static async create(locale: Locale, post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'locale' | 'tags'>, tags: string[] = []): Promise<BlogPost> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      const result = await q<BlogPost>(
        `INSERT INTO blog_posts (locale, title, slug, excerpt, content, cover_image, author, published, published_at, reading_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [locale, post.title, post.slug, post.excerpt, post.content, post.cover_image, post.author, post.published, post.published_at, post.reading_time]
      );
      
      const newPost = result[0];
      
      for (const tag of tags) {
        await q(
          'INSERT INTO blog_tags (post_id, tag_name) VALUES ($1, $2)',
          [newPost.id, tag]
        );
      }
      
      return await this.getById(newPost.id) as BlogPost;
    });
  }

  static async update(id: string, post: Partial<BlogPost>, tags?: string[]): Promise<BlogPost> {
    return await transaction(async (client) => {
      const q = queryWithClient(client);
      
      await q(
        `UPDATE blog_posts SET
          title = COALESCE($1, title),
          slug = COALESCE($2, slug),
          excerpt = COALESCE($3, excerpt),
          content = COALESCE($4, content),
          cover_image = COALESCE($5, cover_image),
          author = COALESCE($6, author),
          published = COALESCE($7, published),
          published_at = COALESCE($8, published_at),
          reading_time = COALESCE($9, reading_time)
        WHERE id = $10`,
        [post.title, post.slug, post.excerpt, post.content, post.cover_image, post.author, post.published, post.published_at, post.reading_time, id]
      );
      
      if (tags !== undefined) {
        await q('DELETE FROM blog_tags WHERE post_id = $1', [id]);
        for (const tag of tags) {
          await q(
            'INSERT INTO blog_tags (post_id, tag_name) VALUES ($1, $2)',
            [id, tag]
          );
        }
      }
      
      return await this.getById(id) as BlogPost;
    });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM blog_posts WHERE id = $1', [id]);
    return result.length > 0;
  }
}

// Legacy exports for backward compatibility
export const getBlogPosts = BlogRepository.getAll;
export const getBlogPostBySlug = BlogRepository.getBySlug;

