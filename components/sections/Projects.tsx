'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Section3DBackground = dynamic(() => import('@/components/3D/Section3DBackground'), {
  ssr: false
});
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Project } from '@/lib/db/types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <Section3DBackground
        intensity={0.3}
        layerCount={3}
        blockCount={7}
        nodeCount={12}
        planeCount={2}
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
          <h2 className="type-h1 mb-5 font-display relative heading-luminous">
            <span className="relative z-10 text-white">
              {t('title')}
            </span>
          </h2>
          <p className="type-body max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.length > 0 ? projects.map((project, index) => {
            // Because we are mapping, hooks must be called carefully. 
            // In a loop, useState/hooks are generally unsafe if the list changes.
            // But here the list is stable per render pass.
            // However, better to extract ProjectCard to avoid hook rules issues if list length changes dynamically (unlikely here but good practice).
            // For now, I'll inline the state logic inside a component-mapped item??
            // React warns about hooks in loops. I should make a sub-component.

            return (
              <ProjectCard key={project.id} project={project} index={index} t={t} />
            );
          }) : (
            <div className="col-span-full text-center text-gray-400">No projects found.</div>
          )}
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}

function ProjectCard({ project, index, t }: { project: Project, index: number, t: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group perspective-3d"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 3 : 0,
          rotateX: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full glass-strong rounded-2xl overflow-hidden border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 transform-3d hover-lift relative"
      >
        {/* Project Header */}
        <div className={`relative h-40 bg-gradient-to-br ${project.gradient || 'from-cyan-500/20 via-blue-500/20 to-purple-500/20'} overflow-hidden`}>
          <div className="absolute inset-0 bg-charcoal-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center border border-cyan-400/30">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-60" />
              </div>
            )}
          </div>

          {/* Hover Effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.2 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-cyan-500 to-blue-500'}`}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="type-h3 font-display flex-1">
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 ml-2"
            >
              <ArrowUpRight className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </div>

          <p className="type-body mb-5 text-sm">
            {project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies?.map((tech, techIndex) => (
              <motion.span
                key={tech.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                className="px-2.5 py-1 glass rounded-lg border border-cyan-400/20 text-cyan-400 text-xs font-medium uppercase tracking-wider hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all"
              >
                {tech.technology_name}
              </motion.span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex gap-4 pt-4 border-t border-cyan-400/10">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                <span className="uppercase tracking-wider">
                  {t('viewProject')}
                </span>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group/link text-sm font-medium"
              >
                <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                <span className="uppercase tracking-wider">
                  {t('viewCode')}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Hover Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className={`absolute inset-0 rounded-2xl ${project.glow_color || 'glow-cyan'} pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
}
