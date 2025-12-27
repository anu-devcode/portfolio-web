import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { DeferredLoad } from '@/components/common/LazyComponents';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

// Lazy load heavy client components
const NeuralBackground = dynamic(() => import('@/components/backgrounds/NeuralBackground'), {
  ssr: false,
});

const Chatbot = dynamic(() => import('@/components/chatbot/Chatbot'), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import('@/components/layout/SmoothScroll'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('@/components/layout/ScrollProgress'), {
  ssr: false,
});

const PageTransition = dynamic(() => import('@/components/transitions/PageTransition'), {
  ssr: false,
});
import { generateMetadata } from './metadata';
import { getTextDirection } from '@/lib/locale-utils';
import { getCachedProfile, getCachedSettings } from '@/lib/db/cache';
import type { Locale } from '@/lib/db/types';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export { generateMetadata };

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch data in parallel with caching
  const [profile, settings] = await Promise.all([
    getCachedProfile(locale as Locale),
    getCachedSettings(locale as Locale)
  ]);

  const messages = await getMessages();

  const dir = getTextDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme"),r=document.documentElement;if("light"===t)r.classList.add("light"),r.classList.remove("dark");else if("system"===t){var e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";r.classList.add(e),r.classList.remove("light","dark")}else r.classList.add("dark"),r.classList.remove("light");var a="${locale}",c=localStorage.getItem("preferred-language");if(!c){localStorage.setItem("preferred-language",a);var n=new Date;n.setFullYear(n.getFullYear()+1),document.cookie="NEXT_LOCALE="+a+"; expires="+n.toUTCString()+"; path=/; SameSite=Lax"}}catch(o){document.documentElement.classList.add("dark")}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll />
            <ScrollProgress />
            <PageTransition>
              <div className="min-h-screen flex flex-col relative">
                <DeferredLoad delay={200}>
                  <NeuralBackground />
                </DeferredLoad>
                <Navbar />
                <main className="flex-grow relative z-10" role="main">
                  {children}
                </main>
                <Footer profile={profile} />
                <DeferredLoad delay={500}>
                  {settings?.feature_ai_chatbot && <Chatbot />}
                </DeferredLoad>
                <DeferredLoad delay={300}>
                  <ScrollToTop />
                </DeferredLoad>
              </div>
            </PageTransition>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
