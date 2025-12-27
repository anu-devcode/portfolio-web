'use client';

import React, { useState, useEffect } from 'react';
import {
    Layers,
    Plus,
    Search,
    Filter,
    Loader2,
    Edit3,
    Trash2,
    ExternalLink,
    Grid,
    Type,
    Hexagon
} from 'lucide-react';
import StatusToast from '@/components/admin/StatusToast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesManagement({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    useEffect(() => {
        fetchServices();
    }, [locale]);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/services?locale=${locale}`);
            const data = await res.json();
            if (data.success) {
                setServices(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch services');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const res = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            if (res.ok) {
                setServices(services.filter(s => s.id !== id));
                setToast({ show: true, message: 'Service deleted successfully!', type: 'success' });
            }
        } catch (err) {
            setToast({ show: true, message: 'Delete failed.', type: 'error' });
        }
    };

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-cyan-500" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
                    <p className="text-slate-400">Define the core service offerings displayed on your portfolio ({locale.toUpperCase()}).</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-blue-500/10">
                    <Plus size={20} />
                    New Service
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 hover:text-white transition-colors">
                    <Filter size={20} />
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((service) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={service.id}
                            className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all flex flex-col relative overflow-hidden"
                        >
                            {/* Decorative background icon */}
                            <Layers className="absolute -right-4 -bottom-4 text-slate-800/20 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl ${service.gradient || 'bg-blue-500/10'} text-white`}>
                                        <Hexagon size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-2 bg-slate-850 text-white rounded-xl hover:bg-slate-700 transition-all shadow-lg">
                                            <Edit3 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{service.description}</p>

                                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {service.technologies?.slice(0, 3).map((tech: any, i: number) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                                {tech.technology_name[0]}
                                            </div>
                                        ))}
                                        {(service.technologies?.length || 0) > 3 && (
                                            <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                +{(service.technologies?.length || 0) - 3}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Order: {service.order_index}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredServices.length === 0 && (
                <div className="text-center py-24 bg-slate-950/30 rounded-3xl border border-dashed border-slate-800">
                    <Layers size={48} className="text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-slate-400">No services found</h3>
                    <p className="text-slate-600 mt-2">Add your first service to showcase your expertise.</p>
                </div>
            )}

            <StatusToast
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
