'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguagePreference } from '@/hooks/useLanguagePreference';

/**
 * Smooth language switcher component
 * Provides elegant language switching with animations
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const { switchLanguage, isChanging } = useLanguagePreference();
  const [showMenu, setShowMenu] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const handleSwitch = (newLocale: 'en' | 'am') => {
    if (newLocale === locale || isChanging) return;
    
    setShowMenu(false);
    
    // Smooth transition with delay
    setTimeout(() => {
      switchLanguage(newLocale);
    }, 100);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        disabled={isChanging}
        className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-300 hover:text-cyan-400 transition-colors border border-transparent hover:border-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Change language"
      >
        <motion.div
          animate={isChanging ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Globe className="w-4 h-4" />
        </motion.div>
        <span className="text-sm font-medium uppercase tracking-wider">
          {currentLang.code}
        </span>
      </motion.button>
      
      <AnimatePresence>
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 mt-2 w-48 glass-strong rounded-lg border border-cyan-400/20 p-2 z-50 shadow-2xl"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleSwitch(lang.code as 'en' | 'am')}
                  disabled={isChanging || lang.code === locale}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm transition-all ${
                    locale === lang.code
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                  } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{lang.native}</div>
                      <div className="text-xs opacity-70">{lang.label}</div>
                    </div>
                    {locale === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

