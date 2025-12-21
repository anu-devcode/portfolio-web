import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center glass-strong rounded-2xl p-12 border border-cyan-400/30 max-w-md mx-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-display text-glow-cyan">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 font-display uppercase tracking-wider">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 font-light">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="btn-futuristic inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

