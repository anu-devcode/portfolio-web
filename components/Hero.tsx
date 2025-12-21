'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, Rocket } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import Hero3DScene from '@/components/3D/Hero3DScene';

export default function Hero() {
  const t = useTranslations('hero');
  const config = useLocalizedConfig();
  const name = config.personalInfo.name.toUpperCase();

  const services = [
    {
      icon: Code,
      title: t('services.backend'),
      gradient: 'from-blue-500 to-cyan-500',
      href: '/#backend-systems',
    },
    {
      icon: Brain,
      title: t('services.ai'),
      gradient: 'from-purple-500 to-pink-500',
      href: '/#intelligent-automation',
    },
    {
      icon: Rocket,
      title: t('services.freelance'),
      gradient: 'from-cyan-500 to-blue-500',
      href: '/#full-stack-development',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3DScene />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                {t('status')}
              </span>
            </div>
          </motion.div>

          {/* Name - Neon Glowing Style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 font-display leading-tight relative"
          >
            <span className="relative z-10 text-neon-cyan">
              {name}
            </span>
          </motion.h1>

          {/* Title/Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
              {config.personalInfo.title}
            </p>
          </motion.div>

          {/* Bio - Improved Readability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            {config.personalInfo.bio}
          </motion.p>

          {/* What I Work On - Refined Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8"
            >
              {t('workOn')}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link key={service.title} href={service.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group glass-strong rounded-2xl p-6 md:p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                    >
                      <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider text-center font-display">
                        {service.title}
                      </h3>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Slogan - Subtle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500">
                {t('slogan.code')}
              </span>
              <span className="text-gray-400 mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
                {t('slogan.learn')}
              </span>
              <span className="text-gray-400 mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-500">
                {t('slogan.innovate')}
              </span>
              <span className="text-gray-400 mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-500">
                {t('slogan.grow')}
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons - Improved Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <Link
              href="/#projects"
              className="group btn-futuristic relative overflow-hidden px-8 py-4 text-base font-medium"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            {/* Secondary CTA */}
            <Link
              href="/#contact"
              className="px-6 py-3 glass rounded-lg border border-cyan-400/20 text-cyan-400/90 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all uppercase font-medium tracking-wider text-sm"
            >
              {t('contact')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">{t('scroll')}</span>
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
