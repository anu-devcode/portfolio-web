'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

export default function StatusToast({ message, type = 'success', isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl shadow-black/50 min-w-[300px]"
                >
                    {type === 'success' ? (
                        <CheckCircle className="text-emerald-500" size={24} />
                    ) : (
                        <XCircle className="text-red-500" size={24} />
                    )}

                    <div className="flex-grow">
                        <p className="text-white text-sm font-medium">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>

                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 3, ease: 'linear' }}
                        className={`absolute bottom-0 left-0 h-1 rounded-full origin-left ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                        style={{ width: '100%' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
