# Quick Deployment Checklist

Use this checklist to deploy your portfolio to Vercel with Supabase.

## ☐ Pre-Deployment

- [ ] Code is committed and pushed to GitHub
- [ ] All TypeScript errors resolved (`npm run build` succeeds locally)
- [ ] Admin credentials chosen (username + strong password)

## ☐ Supabase Setup

- [ ] Created Supabase account at [supabase.com](https://supabase.com)
- [ ] Created new project
- [ ] Saved database password securely
- [ ] Copied connection string from Settings → Database
- [ ] Ran database schema via SQL Editor or migration script
- [ ] Verified all tables created in Table Editor

## ☐ Vercel Setup

- [ ] Created Vercel account at [vercel.com](https://vercel.com)
- [ ] Connected GitHub repository
- [ ] Added environment variables:
  - [ ] `DATABASE_URL` (with `?sslmode=require`)
  - [ ] `DB_SSL=true`
  - [ ] `ADMIN_USERNAME`
  - [ ] `ADMIN_PASSWORD`
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `OPENAI_API_KEY` (optional)
  - [ ] `OPENAI_MODEL` (optional)

## ☐ First Deployment

- [ ] Triggered deployment (auto or manual)
- [ ] Build completed successfully
- [ ] Site is accessible at Vercel URL
- [ ] No runtime errors in Vercel logs

## ☐ Post-Deployment

- [ ] Accessed admin panel: `https://your-domain.vercel.app/admin/login`
- [ ] Logged in successfully
- [ ] Added initial content (profile, services, projects)
- [ ] Tested chatbot (if OpenAI key configured)
- [ ] Verified all pages load correctly
- [ ] Tested language switching (EN/AM/AR)
- [ ] Checked mobile responsiveness

## ☐ Optional Enhancements

- [ ] Configured custom domain in Vercel
- [ ] Set up Vercel Analytics
- [ ] Enabled Supabase Row Level Security
- [ ] Set up database backups
- [ ] Added monitoring/error tracking

## Environment Variables Reference

### Production (Vercel)
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres?sslmode=require
DB_SSL=true
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_strong_password
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
OPENAI_API_KEY=sk-... (optional)
OPENAI_MODEL=gpt-3.5-turbo (optional)
```

### Development (Local)
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_db
DB_SSL=false
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OPENAI_API_KEY=sk-... (optional)
OPENAI_MODEL=gpt-3.5-turbo (optional)
```

## Useful Commands

```bash
# Build locally to check for errors
npm run build

# Deploy to Vercel
vercel --prod

# Check Vercel logs
vercel logs

# Pull environment variables from Vercel
vercel env pull
```

## Common Issues & Solutions

**Build fails:** Check all environment variables are set in Vercel

**Database connection error:** Verify `?sslmode=require` is in DATABASE_URL

**Admin login fails:** Double-check ADMIN_USERNAME and ADMIN_PASSWORD

**Chatbot not working:** Ensure OPENAI_API_KEY is valid and has credits

---

**✅ Deployment Complete!**

Your portfolio is live at: `https://your-domain.vercel.app`
