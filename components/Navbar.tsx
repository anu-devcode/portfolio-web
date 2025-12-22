"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useLocalizedConfig } from "@/hooks/useLocalizedConfig";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";

export default function Navbar(): JSX.Element {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const config = useLocalizedConfig();
  const { switchLanguage } = useLanguagePreference();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const isHomePage = pathname === "/" || pathname === `/${locale}` || pathname === "";

  const navItems = [
    { href: "/", label: t("home"), section: "home" },
    { href: "/#about", label: t("about"), section: "about" },
    { href: "/#services", label: t("services"), section: "services" },
    { href: "/#projects", label: t("projects"), section: "projects" },
    { href: "/contact", label: t("contact"), section: "contact" },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);

    if (!isHomePage) return;

    const sections = ["about", "services", "projects", "contact"];
    let found = "home";

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 100) {
        found = id;
        break;
      }
    }

    if (window.scrollY < 100) found = "home";
    setActive(found);
  }, [isHomePage]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menus on escape key and outside clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setLangOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const timer = setTimeout(() => {
      const firstFocusable = mobileRef.current?.querySelector("a, button") as HTMLElement;
      firstFocusable?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string, close?: () => void) => (e: React.MouseEvent) => {
    if (close) close();

    if (href.includes("#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    if (href === "/" || href === `/${locale}`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [locale]);

  const changeLocale = useCallback((newLocale: "en" | "am") => {
    setLangOpen(false);
    switchLanguage(newLocale);
  }, [switchLanguage]);

  const NavLink = React.memo(({ href, children, isActive, close }: { 
    href: string; 
    children: React.ReactNode; 
    isActive?: boolean; 
    close?: () => void; 
  }) => (
    <Link
      href={href}
      onClick={handleNavClick(href, close)}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 ${
        isActive 
          ? "text-text bg-accent/10" 
          : "text-muted hover:text-text hover:bg-surface/50"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 bg-accent/10 rounded-md border border-accent/20"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  ));

  NavLink.displayName = "NavLink";

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`hidden lg:block fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "glass border-b border-accent/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-bold tracking-tight text-text">
                {config.personalInfo.name}
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = isHomePage 
                  ? active === item.section 
                  : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <NavLink key={item.href} href={item.href} isActive={isActive}>
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors shadow-sm"
              >
                {t("hire")}
              </Link>

              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen(!langOpen)}
                  className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase text-xs font-semibold">{locale}</span>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-40 glass rounded-lg border border-accent/20 p-2 shadow-xl z-50"
                      role="menu"
                      aria-label="Language selection"
                    >
                      <button 
                        onClick={() => changeLocale("en")} 
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          locale === "en" 
                            ? "text-text bg-accent/10" 
                            : "text-muted hover:text-text hover:bg-surface/50"
                        }`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => changeLocale("am")} 
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          locale === "am" 
                            ? "text-text bg-accent/10" 
                            : "text-muted hover:text-text hover:bg-surface/50"
                        }`}
                      >
                        አማርኛ
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-50 glass border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="text-lg font-bold text-text hover:opacity-80 transition-opacity"
            >
              {config.personalInfo.name}
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md theme-toggle transition-transform duration-200"
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              ref={mobileRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-accent/10"
              role="menu"
              aria-label="Mobile navigation"
            >
              <div className="glass-strong p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = isHomePage 
                    ? active === item.section 
                    : pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <NavLink 
                      key={item.href} 
                      href={item.href} 
                      isActive={isActive}
                      close={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-accent/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted" />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => changeLocale("en")} 
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          locale === "en" 
                            ? "text-text bg-accent/10" 
                            : "text-muted hover:text-text hover:bg-surface/50"
                        }`}
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => changeLocale("am")} 
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          locale === "am" 
                            ? "text-text bg-accent/10" 
                            : "text-muted hover:text-text hover:bg-surface/50"
                        }`}
                      >
                        አማ
                      </button>
                    </div>
                  </div>

                  <Link 
                    href="/contact" 
                    onClick={handleNavClick("/contact", () => setMobileOpen(false))} 
                    className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    {t("hire")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
