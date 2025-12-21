'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Brain, Rocket } from 'lucide-react';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const t = useTranslations('about');
  const config = useLocalizedConfig();
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  const skills = [
    { 
      icon: Code, 
      name: t('skills.backend'), 
      technologies: [t('technologies.nodejs'), t('technologies.python'), t('technologies.postgresql'), t('technologies.mongodb')],
      color: 'cyan',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconGradient: 'from-blue-500 to-cyan-500',
    },
    { 
      icon: Brain, 
      name: t('skills.ai'), 
      technologies: [t('technologies.ml'), t('technologies.neural'), t('technologies.automation'), t('technologies.aiSystems')],
      color: 'purple',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconGradient: 'from-purple-500 to-pink-500',
    },
    { 
      icon: Rocket, 
      name: t('skills.freelance'), 
      technologies: [t('technologies.fullstack'), t('technologies.api'), t('technologies.systemDesign'), t('technologies.deployment')],
      color: 'blue',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconGradient: 'from-cyan-500 to-blue-500',
    },
    { 
      icon: Cloud, 
      name: t('skills.cloud'), 
      technologies: [t('technologies.aws'), t('technologies.docker'), t('technologies.kubernetes'), t('technologies.cicd')],
      color: 'magenta',
      gradient: 'from-blue-500/20 to-purple-500/20',
      iconGradient: 'from-blue-500 to-purple-500',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <Section3DBackground 
        intensity={0.25}
        layerCount={3}
        blockCount={6}
        nodeCount={10}
        planeCount={2}
        className="opacity-40"
      />
      
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
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              {t('status')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-display relative">
            <span className="relative z-10 text-neon-cyan">
              {t('title')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            {config.personalInfo.bio}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6, rotateY: 3 }}
                className="group perspective-3d transform-3d"
              >
                <div className="h-full glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover-lift relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.iconGradient} flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors shadow-lg group-hover:scale-110 duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base md:text-lg font-bold text-white mb-4 font-display uppercase tracking-tight">
                      {skill.name}
                    </h3>
                    <ul className="space-y-2.5">
                      {skill.technologies.map((tech, techIndex) => (
                        <motion.li
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          className="flex items-center text-gray-400 text-sm font-light"
                        >
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
                          <span>{tech}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl glow-${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
