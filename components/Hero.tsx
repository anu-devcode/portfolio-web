'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Database, Code, Zap, Brain, Rocket, Shield, GraduationCap, Server } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import Hero3DScene from '@/components/3D/Hero3DScene';

export default function Hero() {
  const t = useTranslations('hero');
  const config = useLocalizedConfig();
  const name = config.personalInfo.name.toUpperCase();

  const floatingIcons = [
    { icon: Cpu, delay: 0, x: -120, y: -60, label: 'AI' },
    { icon: Database, delay: 0.2, x: 120, y: -80, label: 'Data' },
    { icon: Code, delay: 0.4, x: -100, y: 120, label: 'Code' },
    { icon: Zap, delay: 0.6, x: 100, y: 140, label: 'Power' },
    { icon: Brain, delay: 0.3, x: -140, y: 80, label: 'AI' },
    { icon: Server, delay: 0.5, x: 140, y: -100, label: 'Server' },
    { icon: Rocket, delay: 0.7, x: -80, y: -120, label: 'Launch' },
    { icon: Shield, delay: 0.1, x: 80, y: 100, label: 'Secure' },
  ];

  const services = [
    {
      icon: Code,
      title: t('services.backend'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: t('services.ai'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: t('services.freelance'),
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* React Three Fiber 3D Scene */}
      <Hero3DScene />
      
      {/* Floating 3D Tech Objects (2D fallback) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.15, 1],
                x: [item.x, item.x + 25, item.x],
                y: [item.y, item.y - 25, item.y],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 8,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
              }}
            >
              <div className="glass rounded-2xl p-3 border-glow">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-cyan-400/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-glow-cyan" />
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider status-processing">
                {t('status')}
              </span>
            </div>
          </motion.div>

          {/* Name with Gradient - Large and Prominent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 font-display"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-glow-cyan">
              {name}
            </span>
          </motion.h1>

          {/* Title/Role with Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-lg md:text-2xl text-gray-300 font-light">
              {config.personalInfo.title}
            </p>
          </motion.div>

          {/* Bio/Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {config.personalInfo.bio}
          </motion.p>

          {/* Three Service Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="glass-strong rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all cursor-glow"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center border border-cyan-400/30`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-white uppercase tracking-wider font-display">
                    {service.title}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Slogan with Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-4xl font-bold font-display">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500">
                {t('slogan.code')}
              </span>
              <span className="text-white mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
                {t('slogan.learn')}
              </span>
              <span className="text-white mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-500">
                {t('slogan.innovate')}
              </span>
              <span className="text-white mx-2">·</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-500">
                {t('slogan.grow')}
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/#projects"
              className="group btn-futuristic relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {t('cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/#contact"
              className="group px-8 py-3 glass rounded-lg border border-cyan-400/30 text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all uppercase font-medium tracking-wider text-sm"
            >
              {t('contact')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">{t('scroll')}</span>
            <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Data Flow Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-30" />
    </section>
  );
}
