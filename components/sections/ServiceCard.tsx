'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Service as ServiceType } from '@/lib/db/types';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
    service: ServiceType;
    index: number;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function ServiceCard({
    service,
    index,
    isHovered,
    onMouseEnter,
    onMouseLeave
}: ServiceCardProps) {
    const t = useTranslations('services');

    const getIcon = (iconName: string | null) => {
        if (!iconName) return HelpCircle;
        return (LucideIcons as any)[iconName] || HelpCircle;
    };

    const Icon = getIcon(service.icon);

    return (
        <motion.div
            id={service.section_id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group perspective-3d scroll-mt-24 h-full"
        >
            <motion.div
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 transform-3d hover-lift relative overflow-hidden"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient || 'from-blue-500/20 to-cyan-500/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 mb-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.icon_gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors shadow-lg group-hover:scale-110 duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>

                <div className="relative z-10">
                    <h3 className="type-h3 mb-3 font-display">
                        {service.title}
                    </h3>
                    <p className="type-body mb-4 text-sm">
                        {service.description}
                    </p>

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

                    <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="flex items-center text-cyan-400 text-xs font-medium uppercase tracking-wider cursor-pointer group/link"
                    >
                        <span>{t('learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </motion.div>
                </div>

                <motion.div
                    className={`absolute inset-0 rounded-2xl ${service.glow_color || 'glow-cyan'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
            </motion.div>
        </motion.div>
    );
}
