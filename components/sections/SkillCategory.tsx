'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Skill as SkillType } from '@/lib/db/types';

interface SkillCategoryProps {
    category: string;
    skills: SkillType[];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}

export default function SkillCategory({
    category,
    skills,
    index,
    isExpanded,
    onToggle
}: SkillCategoryProps) {
    const getIcon = (iconName: string | null) => {
        if (!iconName) return HelpCircle;
        return (LucideIcons as any)[iconName] || HelpCircle;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-strong rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
        >
            <button
                onClick={onToggle}
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
}
