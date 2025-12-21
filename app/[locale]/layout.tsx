import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ScrollToTop from '@/components/ScrollToTop';
import NeuralBackground from '@/components/NeuralBackground';
import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import { generateMetadata } from './metadata';

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

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'am' ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Initialize theme
                  const theme = localStorage.getItem('theme');
                  const root = document.documentElement;
                  if (theme === 'light') {
                    root.classList.add('light');
                    root.classList.remove('dark');
                  } else if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(systemTheme);
                    root.classList.remove('light', 'dark');
                  } else {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  }
                  
                  // Initialize language preference
                  const currentLocale = '${locale}';
                  const storedLocale = localStorage.getItem('preferred-language');
                  if (storedLocale && storedLocale !== currentLocale) {
                    // Language preference exists but doesn't match current route
                    // This will be handled by middleware on next navigation
                  } else if (!storedLocale) {
                    // Save current locale as preference
                    localStorage.setItem('preferred-language', currentLocale);
                    // Set cookie
                    const expires = new Date();
                    expires.setFullYear(expires.getFullYear() + 1);
                    document.cookie = 'NEXT_LOCALE=' + currentLocale + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
                  }
                } catch (e) {
                  // Fallback to dark theme
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
          <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
            <ThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <SmoothScroll />
                <PageTransition>
                  <div className="min-h-screen flex flex-col relative">
                    <NeuralBackground />
                    <Navbar />
                    <main className="flex-grow relative z-10" role="main">
                      {children}
                    </main>
                    <Footer />
                    <Chatbot />
                    <ScrollToTop />
                  </div>
                </PageTransition>
              </NextIntlClientProvider>
            </ThemeProvider>
          </body>
    </html>
  );
}

