'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Github,
    Trash2,
    Edit,
    Star,
    Loader2,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsManagement({ params }: { params: { locale: string } }) {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const locale = params.locale;

    useEffect(() => {
        fetchProjects();
    }, [locale]);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/projects?locale=${locale}`);
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id }),
            });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
            }
        } catch (err) {
            console.error('Delete failed');
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-slate-400">Add, edit or remove projects from your portfolio.</p>
                </div>
                <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-cyan-500/10">
                    <Plus size={20} />
                    New Project
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 hover:text-white transition-colors">
                    <Filter size={20} />
                    Filter
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="animate-spin text-cyan-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={project.id}
                                className="group bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all flex flex-col"
                            >
                                <div className="aspect-video relative bg-slate-800 overflow-hidden">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            <ImageIcon size={48} />
                                        </div>
                                    )}
                                    {project.featured && (
                                        <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-lg">
                                            <Star size={12} fill="currentColor" />
                                            FEATURED
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 bg-red-500/90 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-2 bg-slate-900/90 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                        <div className="flex items-center gap-2">
                                            {project.github_url && <Github size={16} className="text-slate-500" />}
                                            {project.live_url && <ExternalLink size={16} className="text-slate-500" />}
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                                                {project.locale}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-slate-500">Order: {project.order_index}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!isLoading && filteredProjects.length === 0 && (
                <div className="text-center py-24 bg-slate-950/30 rounded-3xl border border-dashed border-slate-800">
                    <Briefcase size={48} className="text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-slate-400">No projects found</h3>
                    <p className="text-slate-600 mt-2">Try adjusting your search or add a new project.</p>
                </div>
            )}
        </div>
    );
}
