import { query } from '../lib/db';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function updateSchema() {
    try {
        console.log('🚀 Updating site_settings table schema...');

        // Check if columns exist and add them if not
        await query(`
      ALTER TABLE site_settings 
      ADD COLUMN IF NOT EXISTS chatbot_system_prompt TEXT,
      ADD COLUMN IF NOT EXISTS chatbot_model VARCHAR(50) DEFAULT 'gpt-3.5-turbo';
    `);

        console.log('✅ Schema update completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Schema update failed:', error);
        process.exit(1);
    }
}

updateSchema();
