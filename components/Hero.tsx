'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from '@/i18n/routing';
import Hero3DScene from '@/components/3D/Hero3DScene';
import TypingText from '@/components/TypingText';
import type { Profile, HeroData, HeroService } from '@/lib/db/types';

interface HeroProps {
  profile: Profile | null;
  data: HeroData | null;
  heroServices: HeroService[];
}

export default function Hero({ profile, data, heroServices }: HeroProps) {
  const t = useTranslations('hero');

  // Fallback roles if not available (could be moved to DB later)
  const roles = [
    profile?.title || 'Software Engineer',
    'Backend Developer',
    'AI Specialist',
    'Full Stack Developer'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3DScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Profile Image Column - Mobile First */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            <div className="relative">
              {/* Profile Image Container */}
              <div className="w-40 h-40 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl glass-strong border border-cyan-400/20 overflow-hidden relative group">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-strong/5" />

                {/* Professional Avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Main Avatar Circle */}
                    <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-accent to-accent-strong flex items-center justify-center shadow-2xl border-4 border-white/10">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                          {profile?.name ? profile.name.split(' ').map(n => n[0]).join('') : 'ME'}
                        </span>
                      )}
                    </div>

                    {/* Subtle Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-pulse" />
                  </div>
                </div>

                {/* Professional Label */}
                <div className="hidden sm:block absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-lg px-4 py-2 border border-accent/20">
                    <p className="text-sm font-medium text-accent text-center tracking-wide">
                      Professional Photo
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent/30 rounded-full blur-sm animate-pulse" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-accent-strong/30 rounded-full blur-sm" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-left lg:pr-8"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                {data?.status_text || t('status')}
              </span>
            </div>

            {/* Role/Title - Most Prominent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-3 font-display font-light tracking-tight text-text leading-tight">
              <TypingText texts={roles} className="text-accent font-medium" />
            </h1>

            {/* Name - Elegant Secondary */}
            <h2 className="text-lg sm:text-xl mb-6 font-medium text-muted tracking-wide">
              {profile?.name || 'Developer'}
            </h2>

            {/* Value Statement - Dynamic */}
            <p className="text-xl sm:text-2xl mb-8 font-light text-text leading-relaxed max-w-lg">
              {data?.slogan_code ? (
                <>
                  {data?.slogan_code} <span className="text-accent font-medium">{data?.slogan_innovate}</span> {data?.slogan_grow}
                </>
              ) : (
                <>
                  Crafting <span className="text-accent font-medium">scalable solutions</span> that bridge innovation and impact.
                </>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/#projects"
                className="btn-futuristic px-8 py-4 text-base font-medium"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {data?.cta_text || t('cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/#contact"
                className="px-6 py-3 glass rounded-lg border border-cyan-400/20 text-cyan-400/90 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all uppercase font-medium tracking-wider text-sm"
              >
                {data?.contact_text || t('contact')}
              </Link>
            </div>

            {/* Services Preview */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {heroServices.map((service, index) => {
                // Dynamic icon loading
                const Icon = (LucideIcons as any)[service.icon || 'Code'] || LucideIcons.Code;

                return (
                  <Link key={service.id} href={service.href || '#'}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="group glass rounded-xl p-2 sm:p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 text-center"
                    >
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 rounded-lg bg-gradient-to-br ${service.gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center`}>
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h3 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                        {service.title}
                      </h3>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">{data?.scroll_text || t('scroll')}</span>
            <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
