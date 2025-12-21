'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Home, User, Briefcase, Mail, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import { useLanguagePreference } from '@/hooks/useLanguagePreference';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const config = useLocalizedConfig();
  const { switchLanguage, isChanging } = useLanguagePreference();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Check if we're on the home page
  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === '';

  const navItems = [
    { href: '/', label: t('home'), icon: Home, section: '' },
    { href: '/#about', label: t('about'), icon: User, section: 'about' },
    { href: '/#services', label: t('services'), icon: Settings, section: 'services' },
    { href: '/#projects', label: t('projects'), icon: Briefcase, section: 'projects' },
    { href: '/#contact', label: t('contact'), icon: Mail, section: 'contact' },
  ];

  // Scroll spy: detect which section is currently visible
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section IDs to check
      const sectionIds = ['about', 'services', 'projects', 'contact'];
      const viewportHeight = window.innerHeight;
      const scrollOffset = 100; // Offset for navbar

      let currentSection = '';

      // Check each section to see which one is most visible
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;

        // Section is active if:
        // 1. Top of section is above the trigger point (40% of viewport)
        // 2. Bottom of section is below the trigger point
        if (elementTop <= viewportHeight * 0.4 + scrollOffset && elementBottom >= scrollOffset) {
          currentSection = sectionId;
        }
      }

      // If we're at the top of the page, show home as active
      if (window.scrollY < 150) {
        currentSection = '';
      }

      setActiveSection(currentSection);
    };

    // Initial check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isHomePage, pathname]);

  const toggleLocale = (newLocale: 'en' | 'am') => {
    // Close menu first for smooth UX
    setShowLangMenu(false);
    
    // Small delay to allow menu close animation
    setTimeout(() => {
      switchLanguage(newLocale);
    }, 150);
  };

  return (
    <>
      {/* Floating Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'scale-95' : 'scale-100'
        }`}
      >
        <div className="glass-strong rounded-full px-6 py-3 border-glow">
          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              // For home page: use scroll-based active state
              // For other pages: use route-based active state
              const isActive = isHomePage
                ? activeSection === item.section
                : (pathname === item.href.replace('#', '') || (item.href === '/' && pathname === '/'));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group px-4 py-2 rounded-full transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      isActive 
                        ? 'text-cyan-400' 
                        : 'text-gray-400 group-hover:text-cyan-400'
                    }`} />
                    <span className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isActive 
                        ? 'text-cyan-400 text-glow-cyan' 
                        : 'text-gray-300 group-hover:text-cyan-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300"
                    initial={false}
                    whileHover={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-400/10 border border-cyan-400/30"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Divider */}
            <div className="w-px h-6 bg-cyan-400/20 mx-2" />
            
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLangMenu(!showLangMenu)}
                disabled={isChanging}
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-300 hover:text-cyan-400 transition-colors border border-transparent hover:border-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Change language"
              >
                <motion.div
                  animate={isChanging ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Globe className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium uppercase tracking-wider">{locale}</span>
              </motion.button>
              
              <AnimatePresence>
                {showLangMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowLangMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute right-0 mt-2 w-48 glass-strong rounded-lg border border-cyan-400/20 p-2 z-50 shadow-2xl"
                    >
                      <motion.button
                        onClick={() => toggleLocale('en')}
                        disabled={isChanging || locale === 'en'}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left px-4 py-3 rounded-md text-sm transition-all ${
                          locale === 'en'
                            ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">English</div>
                            <div className="text-xs opacity-70">English</div>
                          </div>
                          {locale === 'en' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                          )}
                        </div>
                      </motion.button>
                      <motion.button
                        onClick={() => toggleLocale('am')}
                        disabled={isChanging || locale === 'am'}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left px-4 py-3 rounded-md text-sm transition-all ${
                          locale === 'am'
                            ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">አማርኛ</div>
                            <div className="text-xs opacity-70">Amharic</div>
                          </div>
                          {locale === 'am' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                          )}
                        </div>
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="lg:hidden fixed top-4 left-4 right-4 z-50"
      >
        <div className="glass-strong rounded-2xl px-4 py-3 border-glow">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="text-lg font-bold text-cyan-400 text-glow-cyan uppercase tracking-wider"
            >
              {config.personalInfo.name.split(' ')[0].toUpperCase()}
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-cyan-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-4 glass-strong rounded-2xl p-4 border-glow"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all border border-transparent hover:border-cyan-400/30"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium uppercase tracking-wider">{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 mt-4 border-t border-cyan-400/20 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <motion.button
                      onClick={() => toggleLocale('en')}
                      disabled={isChanging || locale === 'en'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        locale === 'en'
                          ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                          : 'text-gray-400 hover:text-cyan-400'
                      } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      EN
                    </motion.button>
                    <motion.button
                      onClick={() => toggleLocale('am')}
                      disabled={isChanging || locale === 'am'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        locale === 'am'
                          ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                          : 'text-gray-400 hover:text-cyan-400'
                      } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      አማ
                    </motion.button>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
