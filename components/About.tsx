'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Users, Calendar, MapPin, Award } from 'lucide-react';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const t = useTranslations('about');
  const config = useLocalizedConfig();
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  const stats = [
    { icon: Code, value: '50+', label: t('stats.projects') },
    { icon: Users, value: '20+', label: t('stats.clients') },
    { icon: Calendar, value: '2+', label: t('stats.experience') },
    { icon: Award, value: '15+', label: t('stats.technologies') },
  ];

  const journey = [
    {
      year: '2023',
      title: t('journey.current.title'),
      description: t('journey.current.description'),
      status: 'current'
    },
    {
      year: '2022',
      title: t('journey.started.title'),
      description: t('journey.started.description'),
      status: 'completed'
    },
    {
      year: '2021',
      title: t('journey.education.title'),
      description: t('journey.education.description'),
      status: 'completed'
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      <Section3DBackground intensity={0.3} className="opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="type-caption text-cyan-400">
              {t('status')}
            </span>
          </div>
          <h2 className="type-h1 mb-5 font-display relative heading-luminous">
            <span className="relative z-10 text-white">
              {t('title')}
            </span>
          </h2>
          <p className="type-body max-w-3xl mx-auto text-gray-300">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6, rotateY: 3 }}
                className="group glass-strong rounded-2xl p-4 md:p-6 text-center border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover-lift perspective-3d transform-3d relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 font-display">{stat.value}</div>
                  <div className="type-caption text-gray-400">{stat.label}</div>
                </div>
                <motion.div className="absolute inset-0 rounded-2xl glow-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -30, rotateY: -10 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-strong rounded-2xl p-6 md:p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover-lift group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h3 className="type-h3 text-white mb-6 flex items-center gap-3 font-display">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                {t('bio.title')}
              </h3>
              <div className="space-y-4 type-body text-gray-300 leading-relaxed">
                <p>{t('bio.paragraph1')}</p>
                <p>{t('bio.paragraph2')}</p>
                <p>{t('bio.paragraph3')}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Problem Solver', 'Team Player', 'Continuous Learner', 'Innovation Focused'].map((trait) => (
                  <span key={trait} className="px-3 py-1 type-caption bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/20 transition-all cursor-default">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <motion.div className="absolute inset-0 rounded-2xl glow-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 30, rotateY: 10 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-strong rounded-2xl p-6 md:p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover-lift group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <h3 className="type-h3 text-white mb-6 flex items-center gap-3 font-display">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                {t('journey.title')}
              </h3>
              <div className="space-y-6">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex gap-4 group/item"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        item.status === 'current' 
                          ? 'bg-cyan-400 border-cyan-400 animate-pulse shadow-glow-cyan' 
                          : 'bg-gray-600 border-gray-500 group-hover/item:border-cyan-400/50'
                      }`} />
                      {index < journey.length - 1 && (
                        <div className="w-px h-16 bg-gradient-to-b from-gray-600 to-gray-700 mt-2 group-hover/item:from-cyan-400/30 group-hover/item:to-gray-600 transition-all duration-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-cyan-400 font-bold type-caption font-display">{item.year}</span>
                        {item.status === 'current' && (
                          <span className="px-2 py-0.5 type-caption bg-cyan-400/20 text-cyan-400 rounded-full border border-cyan-400/30">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-semibold mb-1 font-display">{item.title}</h4>
                      <p className="text-gray-400 type-body">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div className="absolute inset-0 rounded-2xl glow-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
