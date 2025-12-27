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
import dynamic from 'next/dynamic';

const Section3DBackground = dynamic(() => import('@/components/3D/Section3DBackground'), {
  ssr: false
});
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Service as ServiceType, Skill as SkillType } from '@/lib/db/types';

import ServiceCard from './ServiceCard';
import SkillCategory from './SkillCategory';

interface ServicesProps {
  services: ServiceType[];
  skillsByCategory: Record<string, SkillType[]>;
}

export default function Services({ services, skillsByCategory }: ServicesProps) {
  const t = useTranslations('services');
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
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
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      <Section3DBackground
        intensity={0.3}
        layerCount={4}
        blockCount={8}
        nodeCount={12}
        planeCount={3}
        className="opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isHovered={hoveredService === index}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">No services found.</div>
          )}
        </div>

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
            {Object.entries(skillsByCategory).map(([category, skills], index) => (
              <SkillCategory
                key={category}
                category={category}
                skills={skills}
                index={index}
                isExpanded={expandedCategory === category}
                onToggle={() => setExpandedCategory(expandedCategory === category ? null : category)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px neural-line opacity-20" />
    </section>
  );
}
