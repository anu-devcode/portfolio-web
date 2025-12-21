'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Database, 
  Cloud, 
  Brain, 
  Server, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  ArrowRight,
  Layers,
  Cpu,
  Shield,
  GitBranch
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  id: string;
  description: string;
  features: string[];
  technologies: string[];
  gradient: string;
  borderColor: string;
  glowColor: string;
  iconGradient: string;
}

interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function Services() {
  const t = useTranslations('services');
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  const services: Service[] = [
    {
      icon: Server,
      title: t('items.backend.title'),
      id: 'backend-systems',
      description: t('items.backend.description'),
      features: [
        t('items.backend.features.0'),
        t('items.backend.features.1'),
        t('items.backend.features.2'),
        t('items.backend.features.3'),
      ],
      technologies: [
        t('technologies.nodejs'),
        t('technologies.python'),
        t('technologies.postgresql'),
        t('technologies.mongodb'),
        'Express.js',
        'FastAPI',
      ],
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      borderColor: 'border-cyan-400/30',
      glowColor: 'glow-cyan',
      iconGradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: t('items.frontend.title'),
      id: 'frontend-development',
      description: t('items.frontend.description'),
      features: [
        t('items.frontend.features.0'),
        t('items.frontend.features.1'),
        t('items.frontend.features.2'),
        t('items.frontend.features.3'),
      ],
      technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Three.js',
      ],
      gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      borderColor: 'border-purple-400/30',
      glowColor: 'glow-purple',
      iconGradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Layers,
      title: t('items.fullstack.title'),
      id: 'full-stack-development',
      description: t('items.fullstack.description'),
      features: [
        t('items.fullstack.features.0'),
        t('items.fullstack.features.1'),
        t('items.fullstack.features.2'),
        t('items.fullstack.features.3'),
      ],
      technologies: [
        'MERN Stack',
        'MEAN Stack',
        'Next.js Full-Stack',
        'REST APIs',
        'GraphQL',
        'WebSockets',
      ],
      gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-400/30',
      glowColor: 'glow-blue',
      iconGradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Brain,
      title: t('items.ai.title'),
      id: 'intelligent-automation',
      description: t('items.ai.description'),
      features: [
        t('items.ai.features.0'),
        t('items.ai.features.1'),
        t('items.ai.features.2'),
        t('items.ai.features.3'),
      ],
      technologies: [
        t('technologies.ml'),
        t('technologies.neural'),
        'OpenAI API',
        'TensorFlow',
        'PyTorch',
        'NLP',
      ],
      gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
      borderColor: 'border-violet-400/30',
      glowColor: 'glow-purple',
      iconGradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Cloud,
      title: t('items.cloud.title'),
      id: 'cloud-devops',
      description: t('items.cloud.description'),
      features: [
        t('items.cloud.features.0'),
        t('items.cloud.features.1'),
        t('items.cloud.features.2'),
        t('items.cloud.features.3'),
      ],
      technologies: [
        t('technologies.aws'),
        t('technologies.docker'),
        t('technologies.kubernetes'),
        t('technologies.cicd'),
        'Vercel',
        'Netlify',
      ],
      gradient: 'from-sky-500/20 via-blue-500/20 to-cyan-500/20',
      borderColor: 'border-sky-400/30',
      glowColor: 'glow-cyan',
      iconGradient: 'from-sky-500 to-blue-500',
    },
    {
      icon: Smartphone,
      title: t('items.mobile.title'),
      id: 'mobile-development',
      description: t('items.mobile.description'),
      features: [
        t('items.mobile.features.0'),
        t('items.mobile.features.1'),
        t('items.mobile.features.2'),
        t('items.mobile.features.3'),
      ],
      technologies: [
        'React Native',
        'Expo',
        'iOS',
        'Android',
        'PWA',
        'Responsive Design',
      ],
      gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
      borderColor: 'border-emerald-400/30',
      glowColor: 'glow-cyan',
      iconGradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const skillCategories = [
    {
      name: t('skills.backend.name'),
      skills: [
        { name: t('technologies.nodejs'), proficiency: 90, icon: Code, color: 'cyan' },
        { name: t('technologies.python'), proficiency: 85, icon: Code, color: 'blue' },
        { name: t('technologies.postgresql'), proficiency: 80, icon: Database, color: 'cyan' },
        { name: t('technologies.mongodb'), proficiency: 85, icon: Database, color: 'green' },
        { name: 'Express.js', proficiency: 90, icon: Server, color: 'cyan' },
        { name: 'FastAPI', proficiency: 80, icon: Server, color: 'blue' },
      ],
    },
    {
      name: t('skills.frontend.name'),
      skills: [
        { name: 'React', proficiency: 90, icon: Code, color: 'cyan' },
        { name: 'Next.js', proficiency: 85, icon: Globe, color: 'blue' },
        { name: 'TypeScript', proficiency: 88, icon: Code, color: 'cyan' },
        { name: 'Tailwind CSS', proficiency: 90, icon: Code, color: 'cyan' },
        { name: 'Framer Motion', proficiency: 85, icon: Zap, color: 'purple' },
        { name: 'Three.js', proficiency: 75, icon: Cpu, color: 'blue' },
      ],
    },
    {
      name: t('skills.tools.name'),
      skills: [
        { name: t('technologies.docker'), proficiency: 80, icon: Cloud, color: 'blue' },
        { name: 'Git', proficiency: 90, icon: GitBranch, color: 'orange' },
        { name: t('technologies.aws'), proficiency: 75, icon: Cloud, color: 'orange' },
        { name: t('technologies.kubernetes'), proficiency: 70, icon: Cloud, color: 'blue' },
        { name: 'CI/CD', proficiency: 80, icon: Zap, color: 'cyan' },
        { name: 'Linux', proficiency: 85, icon: Shield, color: 'green' },
      ],
    },
    {
      name: t('skills.ai.name'),
      skills: [
        { name: t('technologies.ml'), proficiency: 80, icon: Brain, color: 'purple' },
        { name: 'OpenAI API', proficiency: 85, icon: Brain, color: 'green' },
        { name: 'TensorFlow', proficiency: 75, icon: Brain, color: 'orange' },
        { name: 'NLP', proficiency: 70, icon: Brain, color: 'purple' },
        { name: t('technologies.automation'), proficiency: 85, icon: Zap, color: 'cyan' },
        { name: t('technologies.aiSystems'), proficiency: 80, icon: Brain, color: 'purple' },
      ],
    },
  ];

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              {t('status')}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-display relative">
            <span className="relative z-10 text-neon-cyan">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 dark:text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center font-display"
          >
            <span className="text-neon-cyan">
              {t('servicesTitle')}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredService === index;
              
              return (
                <motion.div
                  key={service.title}
                  id={service.id}
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-5">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors shadow-lg group-hover:scale-110 duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-display uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4 font-light leading-relaxed text-sm">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-center text-gray-400 text-sm font-light"
                        >
                          <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.technologies.slice(0, 4).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                            className="px-2 py-1 glass rounded-lg border border-cyan-400/20 text-cyan-400 text-xs font-medium uppercase tracking-wider hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Learn More */}
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="flex items-center text-cyan-400 text-sm font-medium uppercase tracking-wider cursor-pointer group/link"
                      >
                        <span>{t('learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>

                    {/* Hover glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${service.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center font-display"
          >
            <span className="text-neon-cyan">
              {t('skillsTitle')}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const isExpanded = expandedCategory === category.name;
              
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
                >
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
                    className="w-full flex items-center justify-between mb-4"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white font-display uppercase tracking-tight">
                      {category.name}
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
                        {category.skills.map((skill, skillIndex) => {
                          const SkillIcon = skill.icon;
                          return (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: skillIndex * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <SkillIcon className={`w-4 h-4 ${
                                    skill.color === 'cyan' ? 'text-cyan-400' :
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
                                  {skill.proficiency}%
                                </span>
                              </div>
                              <div className="h-2 glass rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 1, delay: skillIndex * 0.05 + 0.2 }}
                                  className={`h-full rounded-full ${
                                    skill.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
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

