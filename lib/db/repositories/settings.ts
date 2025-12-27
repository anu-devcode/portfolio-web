/**
 * Settings Repository
 * Manage site-wide configurations and SEO metadata
 */

import { query } from '../index';
import type { SiteSettings, SiteMetadata, Locale } from '../types';

export class SettingsRepository {
    /**
     * Get site settings by locale
     */
    static async getSettings(locale: Locale): Promise<SiteSettings | null> {
        const result = await query<SiteSettings>(
            'SELECT * FROM site_settings WHERE locale = $1',
            [locale]
        );
        return result[0] || null;
    }

    /**
     * Get site metadata by locale
     */
    static async getMetadata(locale: Locale): Promise<SiteMetadata | null> {
        const result = await query<SiteMetadata>(
            'SELECT * FROM site_metadata WHERE locale = $1',
            [locale]
        );
        return result[0] || null;
    }

    /**
     * Update or create site settings
     */
    static async upsertSettings(locale: Locale, data: Partial<SiteSettings>): Promise<SiteSettings> {
        const existing = await this.getSettings(locale);

        if (existing) {
            const result = await query<SiteSettings>(
                `UPDATE site_settings SET 
          feature_ai_chatbot = $1, feature_projects = $2, 
          feature_blog = $3, feature_contact = $4,
          theme_primary_color = $5, theme_accent_color = $6,
          hero_3d_scene = $7, chatbot_system_prompt = $8, chatbot_model = $9
        WHERE locale = $10
        RETURNING *`,
                [
                    data.feature_ai_chatbot ?? existing.feature_ai_chatbot,
                    data.feature_projects ?? existing.feature_projects,
                    data.feature_blog ?? existing.feature_blog,
                    data.feature_contact ?? existing.feature_contact,
                    data.theme_primary_color || existing.theme_primary_color,
                    data.theme_accent_color || existing.theme_accent_color,
                    data.hero_3d_scene || existing.hero_3d_scene,
                    data.chatbot_system_prompt ?? existing.chatbot_system_prompt,
                    data.chatbot_model || existing.chatbot_model,
                    locale,
                ]
            );
            return result[0];
        } else {
            const result = await query<SiteSettings>(
                `INSERT INTO site_settings (locale, feature_ai_chatbot, feature_projects, feature_blog, feature_contact, theme_primary_color, theme_accent_color, hero_3d_scene, chatbot_system_prompt, chatbot_model)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
                [
                    locale,
                    data.feature_ai_chatbot ?? true,
                    data.feature_projects ?? true,
                    data.feature_blog ?? true,
                    data.feature_contact ?? true,
                    data.theme_primary_color || 'blue',
                    data.theme_accent_color || 'cyan',
                    data.hero_3d_scene || 'abstract',
                    data.chatbot_system_prompt,
                    data.chatbot_model || 'gpt-3.5-turbo',
                ]
            );
            return result[0];
        }
    }

    /**
     * Update or create site metadata
     */
    static async upsertMetadata(locale: Locale, data: Partial<SiteMetadata>): Promise<SiteMetadata> {
        const existing = await this.getMetadata(locale);

        if (existing) {
            const result = await query<SiteMetadata>(
                `UPDATE site_metadata SET 
          title = $1, description = $2, keywords = $3, author = $4, og_image = $5
        WHERE locale = $6
        RETURNING *`,
                [
                    data.title || existing.title,
                    data.description || existing.description,
                    data.keywords || existing.keywords,
                    data.author || existing.author,
                    data.og_image || existing.og_image,
                    locale,
                ]
            );
            return result[0];
        } else {
            const result = await query<SiteMetadata>(
                `INSERT INTO site_metadata (locale, title, description, keywords, author, og_image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
                [
                    locale,
                    data.title || '',
                    data.description,
                    data.keywords || [],
                    data.author,
                    data.og_image,
                ]
            );
            return result[0];
        }
    }
}
