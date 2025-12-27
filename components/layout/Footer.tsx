'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { Profile } from '@/lib/db/types';

interface FooterProps {
  profile: Profile | null;
}

export default function Footer({ profile }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const socialLinks = [
    { icon: Github, href: profile?.social_links?.github || '#', label: 'GitHub' },
    { icon: Linkedin, href: profile?.social_links?.linkedin || '#', label: 'LinkedIn' },
    { icon: Twitter, href: profile?.social_links?.twitter || '#', label: 'Twitter' },
  ].filter(link => link.href && link.href !== '#');

  const quickLinks = [
    { href: '/#about', label: tNav('about') },
    { href: '/#services', label: tNav('services') },
    { href: '/#projects', label: tNav('projects') },
    { href: '/#contact', label: tNav('contact') },
  ];

  const contactInfo = [
    { icon: Mail, text: profile?.email, href: profile?.email ? `mailto:${profile.email}` : undefined },
    { icon: Phone, text: profile?.phone, href: profile?.phone ? `tel:${profile.phone}` : undefined },
    { icon: MapPin, text: profile?.location, href: undefined },
  ].filter(item => item.text);

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-transparent to-[rgba(10,10,15,0.95)] border-t border-[var(--border)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-text mb-4 bg-gradient-to-r from-accent to-accent-strong bg-clip-text text-transparent">
              {profile?.name || 'Portfolio'}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {profile?.bio || t('ctaText')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-surface/50 border border-[var(--border)] flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-text font-semibold text-sm uppercase tracking-wider mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-accent transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-text font-semibold text-sm uppercase tracking-wider mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3 text-muted hover:text-accent transition-colors text-sm group">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{item.text}</span>
                  </div>
                );
                return (
                  <li key={index}>
                    {item.href ? (
                      <a href={item.href}>{content}</a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-text font-semibold text-sm uppercase tracking-wider mb-4">
              {t('getInTouch')}
            </h4>
            <p className="text-muted text-sm mb-4 leading-relaxed">
              {t('ctaText')}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-strong text-surface hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-105"
            >
              {t('startProject')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)] bg-[rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted text-xs sm:text-sm text-center sm:text-left"
            >
              &copy; {new Date().getFullYear()} {profile?.name || 'Portfolio'}. {t('rights')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted text-xs flex items-center gap-1"
            >
              {t('madeWith')} <Heart className="w-3 h-3 text-red-500 fill-current" /> {t('by')} {profile?.name || 'Developer'}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
