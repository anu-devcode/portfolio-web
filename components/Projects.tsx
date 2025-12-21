'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Projects() {
  const t = useTranslations('projects');
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  const projects = [
    {
      title: t('items.ecommerce.title'),
      description: t('items.ecommerce.description'),
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20',
      borderColor: 'border-cyan-400/30',
      glowColor: 'glow-cyan',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: t('items.task.title'),
      description: t('items.task.description'),
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      gradient: 'from-purple-500/20 via-magenta-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30',
      glowColor: 'glow-purple',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: t('items.ai.title'),
      description: t('items.ai.description'),
      technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      borderColor: 'border-blue-400/30',
      glowColor: 'glow-blue',
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <Section3DBackground 
        intensity={0.3}
        particleCount={35}
        objectCount={5}
        className="opacity-35"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-cyan-400/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
              {t('status')}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-glow-cyan">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const [isHovered, setIsHovered] = useState(false);
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group perspective-3d"
              >
                <motion.div
                  animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full glass-strong rounded-2xl overflow-hidden border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 transform-3d hover-lift"
                >
                  {/* Gradient Header */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-charcoal-900/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 glass rounded-xl flex items-center justify-center border border-cyan-400/30">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-50" />
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      animate={{
                        opacity: isHovered ? 0.3 : 0,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} ${project.glowColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isHovered ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </div>
                    
                    <p className="text-gray-400 mb-6 font-light leading-relaxed text-sm">
                      {project.description}
                    </p>
                    
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          className="px-3 py-1.5 glass rounded-lg border border-cyan-400/20 text-cyan-400 text-xs font-medium uppercase tracking-wider hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Action Links */}
                    <div className="flex gap-4 pt-4 border-t border-cyan-400/10">
                      <a
                        href={project.liveUrl}
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        <span className="text-sm font-medium uppercase tracking-wider">
                          {t('viewProject')}
                        </span>
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group/link"
                      >
                        <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-medium uppercase tracking-wider">
                          {t('viewCode')}
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Hover glow border */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    className={`absolute inset-0 rounded-2xl ${project.glowColor} pointer-events-none`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
