# Professional Portfolio - AI-Enhanced Multilingual Website

A modern, high-performance portfolio website built with Next.js 14, featuring 3D graphics, AI-powered chatbot, and comprehensive admin panel.

## ✨ Features

- 🌍 **Multilingual Support** - English, Amharic, and Arabic
- 🤖 **AI Chatbot** - Context-aware assistant powered by OpenAI
- 🎨 **3D Graphics** - Interactive Three.js scenes
- ⚡ **High Performance** - Optimized with lazy loading and caching
- 📱 **Fully Responsive** - Mobile-first design
- 🔐 **Admin Panel** - Complete content management system
- 🌓 **Dark/Light Mode** - Theme switching with smooth transitions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **AI**: OpenAI API
- **Internationalization**: next-intl

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key (optional, for chatbot)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/anu-devcode/portfolio-web.git
cd portfolio-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
DB_SSL=false

# OpenAI (Optional - for AI chatbot)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Set up the database**

Run the migration script:
```bash
npm run migrate
```

Seed initial data (optional):
```bash
npm run seed
```

5. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment on Vercel

### Step 1: Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create PostgreSQL Database

You can use:
- **Vercel Postgres** (recommended)
- **Supabase**
- **Neon**
- **Railway**

Get your `DATABASE_URL` connection string.

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Step 4: Environment Variables on Vercel

Add these in **Project Settings → Environment Variables**:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Your PostgreSQL connection string | ✅ Yes |
| `DB_SSL` | `true` (for production) | ✅ Yes |
| `OPENAI_API_KEY` | Your OpenAI API key | ⚠️ Optional |
| `OPENAI_MODEL` | `gpt-3.5-turbo` or `gpt-4o` | ⚠️ Optional |
| `ADMIN_USERNAME` | Your admin username | ✅ Yes |
| `ADMIN_PASSWORD` | Strong password | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL | ✅ Yes |

### Step 5: Run Database Migration

After first deployment, run migrations:

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Or use Vercel CLI:
```bash
vercel env pull
npm run migrate
```

## 📁 Project Structure

```
portfolio-web/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── admin/          # Admin panel
│   │   ├── page.tsx        # Home page
│   │   └── layout.tsx      # Root layout
│   └── api/                # API routes
├── components/
│   ├── 3D/                 # Three.js components
│   ├── admin/              # Admin components
│   ├── chatbot/            # AI chatbot
│   ├── layout/             # Layout components
│   └── sections/           # Page sections
├── lib/
│   ├── db/                 # Database layer
│   │   ├── repositories/   # Data access
│   │   ├── cache.ts        # Caching utilities
│   │   └── schema.sql      # Database schema
│   └── validation.ts       # Input validation
├── messages/               # i18n translations
└── public/                 # Static assets
```

## 🔧 Configuration

### Admin Panel Access

Default credentials (change in production):
- URL: `/admin/login`
- Username: Set via `ADMIN_USERNAME`
- Password: Set via `ADMIN_PASSWORD`

### Chatbot Configuration

1. Log in to admin panel
2. Navigate to "Chatbot" section
3. Configure:
   - System prompt (AI personality)
   - Model selection (GPT-3.5/GPT-4)

### Theme Customization

Edit `app/[locale]/globals.css` for:
- Color schemes
- Typography
- Animations

## 🎯 Performance Optimizations

- ✅ React cache() for database queries
- ✅ Lazy loading for 3D scenes
- ✅ Code splitting (Three.js, framer-motion)
- ✅ Image optimization
- ✅ Font loading optimization
- ✅ Throttled scroll listeners

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
```

## 🐛 Troubleshooting

### Build Errors

**Missing environment variables:**
```bash
# Ensure all required env vars are set
vercel env pull
```

**Database connection issues:**
- Check `DATABASE_URL` format
- Ensure `DB_SSL=true` for production
- Verify database is accessible

**OpenAI API errors:**
- Chatbot will fallback to basic responses if API key is missing
- Check API key validity and quota

### Performance Issues

- Run `npm run build` to check bundle size
- Use Vercel Analytics to monitor Core Web Vitals
- Check database query performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Anwar Hussen**
- GitHub: [@anu-devcode](https://github.com/anu-devcode)
- Email: anwarhussen3683@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Three.js for 3D graphics capabilities
- OpenAI for AI integration
- Vercel for hosting platform

---

**Built with ❤️ using Next.js 14**
