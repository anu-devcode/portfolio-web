'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useLocalizedConfig } from '@/hooks/useLocalizedConfig';
import Section3DBackground from '@/components/3D/Section3DBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const t = useTranslations('contact');
  const config = useLocalizedConfig();
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          throw new Error(`Too many requests. Please try again in ${retryAfter || 'a few'} seconds.`);
        }
        
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.join(', '));
        }
        
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      // Store error message for display
      const errorMessage = error instanceof Error ? error.message : t('error');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    { icon: Mail, label: t('info.email'), value: config.personalInfo.email, color: 'cyan' },
    { icon: Phone, label: t('info.phone'), value: config.personalInfo.phone || t('info.notProvided'), color: 'blue' },
    { icon: MapPin, label: t('info.location'), value: config.personalInfo.location, color: 'purple' },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <Section3DBackground 
        intensity={0.25}
        particleCount={30}
        objectCount={4}
        className="opacity-40"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="glass-strong rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all cursor-glow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 glass rounded-lg flex items-center justify-center border border-cyan-400/30">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 uppercase tracking-wider text-sm">
                        {info.label}
                      </h3>
                      <p className="text-gray-400 font-light">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-8 border border-cyan-400/20"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg border border-cyan-400/20 focus:border-cyan-400/50 focus:outline-none bg-charcoal-800/50 text-white placeholder-gray-500 transition-all"
                  placeholder={t('placeholders.name')}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg border border-cyan-400/20 focus:border-cyan-400/50 focus:outline-none bg-charcoal-800/50 text-white placeholder-gray-500 transition-all"
                  placeholder={t('placeholders.email')}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-lg border border-cyan-400/20 focus:border-cyan-400/50 focus:outline-none bg-charcoal-800/50 text-white placeholder-gray-500 transition-all resize-none"
                  placeholder={t('placeholders.message')}
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-futuristic relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full mr-2"
                      />
                      {t('sending')}
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t('success')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('send')}
                    </>
                  )}
                </span>
              </button>
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-400 glass rounded-lg p-4 border border-red-400/30"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{t('error')}</span>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
