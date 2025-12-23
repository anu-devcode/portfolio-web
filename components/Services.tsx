'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useState, useEffect } from 'react';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Service as ServiceType, Skill as SkillType } from '@/lib/db/types';

interface ServicesProps {
  services: ServiceType[];
  skillsByCategory: Record<string, SkillType[]>;
}

export default function Services({ services, skillsByCategory }: ServicesProps) {
  const t = useTranslations('services');
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Helper to get icon
  const getIcon = (iconName: string | null) => {
    if (!iconName) return HelpCircle;
    return (LucideIcons as any)[iconName] || HelpCircle;
  };

  // Track page view on mount
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'service_view',
            data: { service: 'services_page' },
          }),
        });
      } catch (error) {
        // Silently fail - analytics shouldn't break the page
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <Section3DBackground
        intensity={0.3}
        layerCount={4}
        blockCount={8}
        nodeCount={12}
        planeCount={3}
        className="opacity-35"
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
            <span className="type-caption text-cyan-400">
              {t('status')}
            </span>
          </div>
          <h1 className="type-h1 mb-5 font-display relative heading-luminous">
            <span className="relative z-10 text-white">
              {t('title')}
            </span>
          </h1>
          <p className="type-body max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-h2 mb-10 md:mb-12 text-center font-display heading-luminous"
          >
            <span className="relative z-10 text-white">
              {t('servicesTitle')}
            </span>
          </motion.h2>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => {
                const Icon = getIcon(service.icon);
                const isHovered = hoveredService === index;

                return (
                  <motion.div
                    key={service.id}
                    id={service.section_id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group perspective-3d scroll-mt-24"
                  >
                    <motion.div
                      animate={{
                        rotateY: isHovered ? 5 : 0,
                        rotateX: isHovered ? -5 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="h-full glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 transform-3d hover-lift relative overflow-hidden"
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-blue-500/20 to-cyan-500/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Icon */}
                      <div className="relative z-10 mb-5">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.icon_gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors shadow-lg group-hover:scale-110 duration-300`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="type-h3 mb-3 font-display">
                          {service.title}
                        </h3>
                        <p className="type-body mb-4 text-sm">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-4">
                          {service.features?.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                              className="flex items-center text-sm type-body"
                            >
                              <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                              <span>{feature.feature_text}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.technologies?.slice(0, 4).map((tech, techIndex) => (
                            <motion.span
                              key={tech.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                              className="px-2 py-1 glass rounded-lg border border-cyan-400/20 text-cyan-400 text-xs font-medium uppercase tracking-wider hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
                            >
                              {tech.technology_name}
                            </motion.span>
                          ))}
                        </div>

                        {/* Learn More */}
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          className="flex items-center text-cyan-400 text-xs font-medium uppercase tracking-wider cursor-pointer group/link"
                        >
                          <span>{t('learnMore')}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>

                      {/* Hover glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${service.glow_color || 'glow-cyan'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400">No services found.</div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-h2 mb-10 md:mb-12 text-center font-display heading-luminous"
          >
            <span className="relative z-10 text-white">
              {t('skillsTitle')}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => {
              const isExpanded = expandedCategory === category;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
                >
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="w-full flex items-center justify-between mb-4"
                  >
                    <h3 className="type-h3 font-display capitalize">
                      {category}
                    </h3>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ArrowRight className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="space-y-4 overflow-hidden"
                      >
                        {skills.map((skill, skillIndex) => {
                          const SkillIcon = getIcon(skill.icon);
                          return (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: skillIndex * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <SkillIcon className={`w-4 h-4 ${skill.color === 'cyan' ? 'text-cyan-400' :
                                      skill.color === 'blue' ? 'text-blue-400' :
                                        skill.color === 'purple' ? 'text-purple-400' :
                                          skill.color === 'green' ? 'text-green-400' :
                                            skill.color === 'orange' ? 'text-orange-400' :
                                              'text-gray-400'
                                    }`} />
                                  <span className="text-sm font-medium text-gray-300">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="h-2 glass rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: skillIndex * 0.05 + 0.2 }}
                                  className={`h-full rounded-full ${skill.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
                                      skill.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                                        skill.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                                          skill.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                                            skill.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                                              'bg-gradient-to-r from-gray-500 to-gray-400'
                                    }`}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
