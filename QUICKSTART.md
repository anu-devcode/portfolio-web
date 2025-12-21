# Quick Start Guide

Get your portfolio website up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Your Site
Edit `config/site.config.ts` and update:
- Your name, title, and contact information
- Social media links
- SEO metadata
- Site URL

### Step 3: Customize Content
- Update translations in `messages/en.json` and `messages/am.json`
- Modify project data in `components/Projects.tsx`
- Update skills in `components/About.tsx`

### Step 4: Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 🎨 Quick Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your color palette
  }
}
```

### Add/Remove Sections
- Comment out components in `app/[locale]/page.tsx`
- Or create new components in `components/` folder

### Modify Navigation
Edit `components/Navbar.tsx` to add/remove menu items.

## 🤖 AI Chatbot Setup

### Option 1: Use Placeholder (Current)
The chatbot currently uses placeholder responses. No setup needed!

### Option 2: Integrate Real AI Service
1. Get API key from OpenAI, Anthropic, or your preferred provider
2. Update `app/api/chat/route.ts` with your API integration
3. Add API key to environment variables:
   ```bash
   # .env.local
   OPENAI_API_KEY=your_key_here
   ```

## 📱 Test Responsiveness
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on different screen sizes

## 🐳 Docker Quick Start
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## ✅ Pre-Deployment Checklist

- [ ] Updated personal information in `config/site.config.ts`
- [ ] Added your projects to `components/Projects.tsx`
- [ ] Updated skills in `components/About.tsx`
- [ ] Tested all pages and links
- [ ] Verified mobile responsiveness
- [ ] Tested chatbot functionality
- [ ] Updated SEO metadata
- [ ] Set environment variables (if needed)

## 🚢 Deploy

### Vercel (Easiest)
1. Push to GitHub
2. Import in Vercel
3. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🆘 Common Issues

**Port already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Build errors?**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript errors?**
```bash
# Check for type errors
npm run lint
```

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
- Review [CONTRIBUTING.md](./CONTRIBUTING.md) if contributing

## 💡 Tips

- Use `npm run build` to test production build locally
- Check browser console for any errors
- Use Lighthouse in Chrome DevTools to check performance
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)

Happy building! 🎉

