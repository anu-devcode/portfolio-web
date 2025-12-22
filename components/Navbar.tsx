"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useLocalizedConfig } from "@/hooks/useLocalizedConfig";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

function NavItemComponent(props: NavItemProps) {
  const { href, children, isActive, onClick, isMobile } = props;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-accent/30
        ${isActive ? 'text-accent opacity-100' : 'text-muted opacity-100 hover:text-text'}
        ${isMobile ? 'block w-full text-center rounded-lg hover:bg-surface/50' : ''}
        group
      `}
    >
      {children}
      {!isMobile && <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent/60 transition-all duration-300 group-hover:w-full group-hover:left-0" />}
      {isActive && !isMobile && (
        <motion.span
          layoutId="activeUnderline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

const NavItem = React.memo(NavItemComponent);
NavItem.displayName = 'NavItem';

export default function Navbar(): JSX.Element {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const config = useLocalizedConfig();
  const { switchLanguage } = useLanguagePreference();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/', label: t('home'), section: 'home' },
    { href: '/#about', label: t('about'), section: 'about' },
    { href: '/#services', label: t('services'), section: 'services' },
    { href: '/#projects', label: t('projects'), section: 'projects' },
    { href: '/#contact', label: t('contact'), section: 'contact' },
  ];

  const isHomePage = pathname === '/' || pathname === `/${locale}`;

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
    
    if (!isHomePage) return;
    
    const sections = ['about', 'services', 'projects', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom > 100;
    });
    
    setActiveSection(current || (window.scrollY < 100 ? 'home' : activeSection));
  }, [isHomePage, activeSection]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  }, []);

  const getActiveState = (item: any) => {
    return isHomePage
      ? activeSection === item.section
      : pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled || isOpen || !isHomePage
            ? 'bg-surface/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm' 
            : 'bg-transparent'
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center group"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isActive={getActiveState(item)}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </NavItem>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg capitalize bg-gradient-to-r from-accent to-accent-strong text-surface shadow-[0_8px_30px_rgba(14,165,233,0.14)] hover:shadow-[0_14px_40px_rgba(14,165,233,0.22)] ring-1 ring-accent/20 transition-transform transition-shadow duration-300 transform hover:scale-105 active:scale-95"
              >
                {t('hire')}
              </Link>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => switchLanguage(locale === 'en' ? 'am' : 'en')}
                  className="p-2 rounded-lg text-muted opacity-100 hover:text-text hover:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  aria-label="Switch language"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <ThemeToggle />
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-muted opacity-100 hover:text-text hover:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-surface/98 backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isActive={getActiveState(item)}
                  onClick={() => handleNavClick(item.href)}
                  isMobile
                >
                  {item.label}
                </NavItem>
              ))}
              
              <div className="pt-4 mt-4 border-t border-[var(--border)] space-y-3">
                <Link
                  href="/#contact"
                  onClick={() => handleNavClick('/#contact')}
                  className="block w-full px-6 py-3 text-center text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-strong text-surface shadow-lg transition-transform duration-200 active:scale-95"
                >
                  {t('hire')}
                </Link>
                
                <button
                  onClick={() => switchLanguage(locale === 'en' ? 'am' : 'en')}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 rounded-lg text-muted opacity-100 hover:text-text bg-surface/50 hover:bg-surface transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{locale === 'en' ? 'አማርኛ' : 'English'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
