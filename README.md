# Professional Multilingual AI-Enhanced Portfolio Website

A modern, scalable, and customizable portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features multilingual support (English and Amharic), AI chatbot integration, and Docker containerization.

## 🚀 Features

- **Multilingual Support**: Full i18n support for English and Amharic with SEO-friendly routing
- **AI Chatbot**: Interactive AI assistant for enhanced user engagement
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Mobile-First Design**: Responsive design optimized for all devices
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Configuration-Driven**: Easy customization through configuration files
- **Dockerized**: Complete Docker setup for easy deployment
- **SEO Optimized**: Comprehensive metadata and Open Graph tags
- **Accessibility**: WCAG-compliant with proper ARIA labels and keyboard navigation
- **Error Handling**: Error boundaries for graceful error handling
- **Scroll to Top**: Smooth scroll-to-top button for better UX

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker (optional, for containerized deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd professional-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure your site:
Edit `config/site.config.ts` to customize your personal information, social links, and site settings.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Deployment

### Build and run with Docker Compose:
```bash
docker-compose up -d
```

### Build Docker image manually:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📁 Project Structure

```
├── app/
│   └── [locale]/          # Locale-based routing
│       ├── layout.tsx     # Root layout with i18n
│       ├── page.tsx       # Home page
│       └── globals.css    # Global styles
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Projects.tsx      # Projects showcase
│   ├── Contact.tsx       # Contact form
│   ├── Footer.tsx        # Footer
│   └── Chatbot.tsx       # AI chatbot
├── config/               # Configuration files
│   └── site.config.ts    # Site configuration
├── i18n/                 # Internationalization
│   ├── routing.ts        # i18n routing config
│   └── request.ts        # i18n request handler
├── messages/             # Translation files
│   ├── en.json           # English translations
│   └── am.json           # Amharic translations
└── public/               # Static assets
```

## 🎨 Customization

### Personal Information
Edit `config/site.config.ts` to update:
- Personal details (name, title, email, location)
- Social media links
- Theme colors
- SEO metadata
- Feature toggles

### Translations
Add or modify translations in:
- `messages/en.json` for English
- `messages/am.json` for Amharic

### Styling
Customize colors and theme in `tailwind.config.ts`.

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### AI Chatbot Integration
To integrate a real AI service, update the `Chatbot.tsx` component's `handleSend` function to call your preferred AI API (OpenAI, Anthropic, etc.).

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- WCAG 2.1 AA compliant

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker
```bash
docker-compose up -d
```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security

- Environment variables for sensitive data
- Input validation on forms
- XSS protection
- CSRF protection
- Secure headers (configure in `next.config.js`)

## 📊 Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static generation where possible
- Optimized bundle size
- Lighthouse score: 90+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- next-intl for internationalization support

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

