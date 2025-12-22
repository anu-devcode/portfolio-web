<!-- Copilot instructions for AI coding agents working on this repository -->
# Copilot instructions — Professional Portfolio

This file helps AI coding agents become productive quickly in this codebase. Focus on discoverable, actionable patterns and project-specific workflows.

## Big picture
- Framework: Next.js 14 (app router), TypeScript, Tailwind CSS. See `package.json` scripts: `dev`, `build`, `start`.
- i18n: Uses `next-intl` with locale-based routing under `app/[locale]` and middleware in `middleware.ts`. Language detection and cookie behavior live in `lib/language-preference.ts` and `i18n/routing.ts`.
- 3D & visuals: React Three Fiber + drei under `components/3D` and `@react-three/*` aliases configured in `next.config.js`.
- API: Minimal Next API routes under `api/*` (e.g., `api/chat/`) consumed by `components/Chatbot.tsx`.
- DB & scripts: PostgreSQL client `pg` used in `db/`; schema and seed/migrate scripts are `scripts/migrate.ts` and `scripts/seed.ts` (run with `npm run migrate` / `npm run seed`).

## Developer workflows (commands to run)
- Start dev server: `npm run dev` (uses `next dev`).
- Build: `npm run build` then `npm run start` for production.
- Linting: `npm run lint` (Next.js ESLint setup).
- DB tasks: `npm run migrate` and `npm run seed` (requires Node 20+, see README). These use `tsx` to run TypeScript scripts.
- Docker: `docker-compose up -d` or `docker build` / `docker run` as documented in `README.md`.

## Project-specific conventions & patterns
- Locale routing: Every top-level page is under `app/[locale]/...`. Use `next-intl` message keys stored in `messages/*.json`. Avoid hard-coded strings — prefer `useTranslations` / `next-intl` patterns already used in components.
- Middleware language handling: `middleware.ts` sets `NEXT_LOCALE` cookie and delegates to `next-intl` middleware — preserve this approach when adding routes or modifying i18n behavior.
- Config-driven site content: Personal/site settings live in `config/site.config.ts`. For changes to visible content, prefer updating that config over editing components directly.
- 3D assets & performance: 3D components are in `components/3D/*`. Keep heavy assets lazy-loaded and follow existing `@react-three/fiber` alias usage in `next.config.js`.
- Chatbot integration: The `Chatbot.tsx` component contains the client-side handler that calls `api/chat/`. If integrating a new AI provider, update the API route and keep the front-end call shape intact.

## Integration points & external dependencies
- next-intl: central to routing and translations. See `next.config.js` where the plugin is applied.
- PostgreSQL (`pg`) + `db/` repository layer. Repositories and types are under `db/repositories` and `db/types.ts`.
- AI/chat: local `api/chat` route and `components/Chatbot.tsx` — replace the provider implementation in `api/chat` for server-side key usage.
- Three.js: `three`, `@react-three/fiber`, and `@react-three/drei` for 3D scenes.

## Patterns to follow when editing code
- Preserve SSR/SSG behavior: Many pages are localized and rely on Next app-router data fetching patterns. Follow existing layout and page patterns under `app/[locale]`.
- Keep config-driven values in `config/site.config.ts` and translations in `messages/*.json`.
- When adding API routes, follow the existing rate-limit and validation helpers in `lib/` (e.g., `rateLimit.ts`, `validation.ts`).
- Use the existing theme provider (`components/ThemeProvider.tsx`) and `useTheme` hook for theme changes.

## Quick examples
- Change homepage text: update `messages/en.json` or `config/site.config.ts` rather than editing `app/[locale]/page.tsx` directly.
- Add a localized route: create `app/[locale]/newpage/page.tsx` and use `useTranslations('namespace')` for strings and export proper metadata files as other pages do.
- Integrate AI provider server-side: modify `api/chat/route.ts` (or similar) to call external APIs and keep client `components/Chatbot.tsx` request shape stable.

## Files worth reading first
- `middleware.ts` — language detection and cookie behavior.
- `next.config.js` — framework tweaks and Three.js alias.
- `config/site.config.ts` — site-wide settings.
- `components/Chatbot.tsx` and `api/chat/` — current AI/chat flow.
- `scripts/migrate.ts`, `scripts/seed.ts`, and `db/` — database initialization patterns.

## When unsure
- Look for patterns in the `app/[locale]` folder and mimic existing component hooks (`useTheme`, `useLanguagePreference`, `useLocalizedConfig`).
- Prefer small, reversible changes and run `npm run dev` to validate visual & routing behavior locally.

---
If any part of this summary is unclear or you'd like more examples (e.g., exact code snippets for `api/chat` or 3D lazy-loading), tell me which area to expand and I will iterate.
