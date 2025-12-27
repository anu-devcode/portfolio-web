const { Pool } = require('pg');

// Manually parse DATABASE_URL or use a fallback for local execution against docker
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/portfolio_db';

const pool = new Pool({
    connectionString: dbUrl,
});

async function run() {
    console.log('--- Database Schema Update ---');
    try {
        const client = await pool.connect();
        console.log('Connected to database.');

        await client.query(`
      ALTER TABLE site_settings 
      ADD COLUMN IF NOT EXISTS chatbot_system_prompt TEXT,
      ADD COLUMN IF NOT EXISTS chatbot_model VARCHAR(50) DEFAULT 'gpt-3.5-turbo';
    `);

        console.log('✅ Successfully added chatbot columns to site_settings.');
        client.release();
    } catch (err) {
        console.error('❌ Error updating schema:', err.message);
    } finally {
        await pool.end();
    }
}

run();
