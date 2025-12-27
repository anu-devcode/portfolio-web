# Professional AI-Powered Portfolio

A state-of-the-art, professional portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Featuring a multi-lingual interface, 3D animations, and an advanced AI chatbot.

## 🚀 Key Features

- **Multilingual Support**: Fully localized in English and Amharic using `next-intl`.
- **Advanced AI Chatbot**: Intelligent assistant powered by OpenAI with a local fallback system.
- **3D Visuals**: Immersive 3D scenes and elements using Three.js and React Three Fiber.
- **Modern UI/UX**: Responsive, glassmorphic design with smooth transitions and parallax effects.
- **Dynamic Content**: Data-driven architecture with a PostgreSQL backend (Vercel Postgres/Docker).
- **Theme Awareness**: Seamless dark/light mode support with system preference detection.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Interactivity**: Three.js, React Three Fiber, Lucide React.
- **Backend/API**: Next.js Route Handlers.
- **Database**: PostgreSQL (pg pool).
- **Internationalization**: `next-intl`.
- **Deployment**: Docker, docker-compose.

## 📁 Project Structure

```text
├── app/              # Next.js App Router (Locales, API, Actions)
├── components/       # Organized React components
│   ├── 3D/           # Three.js scenes and objects
│   ├── layout/       # Navigation, Footer, Theme providers
│   ├── sections/     # Main page sections (Hero, About, etc.)
│   ├── ui/           # Reusable UI elements
│   └── backgrounds/  # Animated background systems
├── lib/              # Core logic, Database, Utils
├── public/           # Static assets
├── config/           # Site configuration
└── docs/             # Technical documentation & guides
```

## 🚥 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- OpenAI API Key (optional, for advanced chatbot functionality)

### Running with Docker (Recommended)

1. Clone the repository.
2. Create a `.env.production` or update `docker-compose.yml` with your `DATABASE_URL`.
3. Build and start:
   ```bash
   docker compose up --build
   ```

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your environment variables:
   ```env
   DATABASE_URL=your_postgresql_url
   OPENAI_API_KEY=your_key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📖 Documentation

For more detailed technical information, please refer to the [docs/](file:///c:/anw/portfolio/portfolio-web/docs) directory:
- [Architecture Overview](file:///c:/anw/portfolio/portfolio-web/docs/ARCHITECTURE.md)
- [Backend Development](file:///c:/anw/portfolio/portfolio-web/docs/BACKEND.md)
- [Database Schema](file:///c:/anw/portfolio/portfolio-web/docs/README_DATABASE.md)
- [Deployment Guide](file:///c:/anw/portfolio/portfolio-web/docs/DEPLOYMENT.md)

---
Developed by **Anwar Hussen**
