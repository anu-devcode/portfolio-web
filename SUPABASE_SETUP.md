# Supabase Database Setup Guide

Complete guide to set up your PostgreSQL database on Supabase and deploy to Vercel.

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. Click **"Start your project"** or **"New Project"**
3. Fill in project details:
   - **Name**: `portfolio-db` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient to start

4. Click **"Create new project"** (takes ~2 minutes)

## Step 2: Get Database Connection String

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"Database"** in the left menu
3. Scroll to **"Connection string"** section
4. Select **"URI"** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with your actual database password

## Step 3: Run Database Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. In Supabase dashboard, go to **"SQL Editor"**
2. Click **"New query"**
3. Copy the entire contents of `lib/db/schema.sql` from your project
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. Verify tables are created in **"Table Editor"**

### Option B: Using Local Script

```bash
# Set your Supabase connection string
$env:DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# Run migration
npm run migrate
```

## Step 4: Verify Database Setup

In Supabase **"Table Editor"**, you should see these tables:
- ✅ `profiles`
- ✅ `hero_data`
- ✅ `hero_services`
- ✅ `services`
- ✅ `skills`
- ✅ `projects`
- ✅ `work_experiences`
- ✅ `site_settings`
- ✅ `site_metadata`
- ✅ `chat_sessions`
- ✅ `chat_messages`
- ✅ `contact_messages`

## Step 5: Configure Vercel Environment Variables

### Go to Vercel Dashboard

1. Open your project in [vercel.com](https://vercel.com)
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Environment Variables

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require` | Production, Preview, Development |
| `DB_SSL` | `true` | Production, Preview, Development |
| `ADMIN_USERNAME` | Your admin username (e.g., `admin`) | Production, Preview, Development |
| `ADMIN_PASSWORD` | Strong password for admin panel | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-preview-url.vercel.app` | Preview |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Development |

### Optional Environment Variables (for AI Chatbot)

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `OPENAI_API_KEY` | `sk-...` (from [platform.openai.com](https://platform.openai.com/api-keys)) | Production, Preview, Development |
| `OPENAI_MODEL` | `gpt-3.5-turbo` or `gpt-4o` | Production, Preview, Development |

## Step 6: Important Notes

### Database URL Format

**✅ Correct format for Supabase:**
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
```

**Key points:**
- Must include `?sslmode=require` at the end
- Replace `[PASSWORD]` with your actual password
- Keep the `postgres` database name
- Port is `5432`

### Connection Pooling (Optional but Recommended)

For better performance on Vercel, use Supabase's connection pooler:

1. In Supabase, go to **Database** settings
2. Find **"Connection pooling"** section
3. Copy the **"Transaction"** mode connection string
4. Use this as your `DATABASE_URL` instead

**Pooler URL format:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

Benefits:
- Handles Vercel's serverless function connections better
- Prevents "too many connections" errors
- Faster cold starts

## Step 7: Deploy to Vercel

### First Deployment

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Or via GitHub

1. Push your code to GitHub
2. Import repository in Vercel
3. Vercel will auto-deploy on every push to main

## Step 8: Seed Initial Data (Optional)

After deployment, seed your database with initial content:

### Option A: Via Supabase SQL Editor

Run INSERT statements for initial data (profiles, services, etc.)

### Option B: Via Admin Panel

1. Go to `https://your-domain.vercel.app/admin/login`
2. Login with your `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Manually add content through the UI

## Troubleshooting

### "Connection timeout" error

**Solution:** Make sure you added `?sslmode=require` to the connection string

### "Too many connections" error

**Solution:** Use Supabase's connection pooler URL instead of direct connection

### "SSL required" error

**Solution:** Ensure `DB_SSL=true` is set in Vercel environment variables

### "Cannot connect to database"

**Solutions:**
1. Verify password is correct in connection string
2. Check Supabase project is not paused (free tier pauses after 7 days inactivity)
3. Ensure connection string format is correct

### Build fails on Vercel

**Solution:** Make sure all required environment variables are set for all environments (Production, Preview, Development)

## Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use strong passwords** for admin and database
3. **Rotate API keys** periodically
4. **Enable Row Level Security** in Supabase for production
5. **Monitor database usage** in Supabase dashboard

## Supabase Free Tier Limits

- ✅ 500 MB database space
- ✅ 2 GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ⚠️ Projects pause after 7 days of inactivity (just visit to wake up)

## Next Steps

1. ✅ Database created on Supabase
2. ✅ Schema migrated
3. ✅ Environment variables set on Vercel
4. ✅ Deployed to production
5. 🎯 Add initial content via admin panel
6. 🎯 Configure custom domain (optional)
7. 🎯 Set up monitoring and analytics

---

**🎉 Your portfolio is now live with Supabase + Vercel!**

Access your admin panel: `https://your-domain.vercel.app/admin/login`
