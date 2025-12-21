'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';

export default function Footer() {
  const t = useTranslations('footer');
  const config = useLocalizedConfig();

  const tNav = useTranslations('nav');
  
  const socialLinks = [
    { icon: Github, href: config.social.github || '#', label: 'GitHub', color: 'hover:text-cyan-400' },
    { icon: Linkedin, href: config.social.linkedin || '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: config.social.twitter || '#', label: 'Twitter', color: 'hover:text-purple-400' },
  ].filter(link => link.href !== '#');

  const quickLinks = [
    { href: '/#about', label: tNav('about') },
    { href: '/#projects', label: tNav('projects') },
    { href: '/#contact', label: tNav('contact') },
  ];

  return (
    <footer className="relative py-16 border-t border-cyan-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg font-display uppercase tracking-wider">
              {config.personalInfo.name}
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {config.personalInfo.bio}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg font-display uppercase tracking-wider">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-light uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4 text-lg font-display uppercase tracking-wider">
              {t('connect')}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 glass rounded-lg flex items-center justify-center border border-cyan-400/20 ${social.color} transition-all cursor-glow`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm font-light">
            &copy; {new Date().getFullYear()} {t('copyright')}. {t('rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
