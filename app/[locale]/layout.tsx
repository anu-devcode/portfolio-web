import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import ScrollToTop from '@/components/layout/ScrollToTop';
import NeuralBackground from '@/components/backgrounds/NeuralBackground';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PageTransition from '@/components/transitions/PageTransition';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { generateMetadata } from './metadata';
import { getTextDirection } from '@/lib/locale-utils';
import { ProfileRepository } from '@/lib/db/repositories/profile';
import { SettingsRepository } from '@/lib/db/repositories/settings';
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

  // Fetch data in parallel
  const [profile, settings] = await Promise.all([
    ProfileRepository.getByLocale(locale as Locale),
    SettingsRepository.getSettings(locale as Locale)
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
                <NeuralBackground />
                <Navbar />
                <main className="flex-grow relative z-10" role="main">
                  {children}
                </main>
                <Footer profile={profile} />
                {settings?.feature_ai_chatbot && <Chatbot />}
                <ScrollToTop />
              </div>
            </PageTransition>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
