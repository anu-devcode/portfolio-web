"use client";

import React from 'react';

export default function SpaceTechBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Space grid background */}
      <div className="absolute inset-0 bg-space-grid opacity-20" 
           style={{
             backgroundSize: '60px 60px',
             backgroundImage: `
               linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
             `
           }} />
      
      {/* Floating tech elements */}
      <div className="absolute inset-0">
        {/* AI Chip */}
        <div className="absolute top-20 left-20 w-16 h-16 animate-float">
          <div className="w-full h-full bg-glass-medium backdrop-blur-sm rounded-lg border border-cyber-cyan/20 shadow-glow-cyan flex items-center justify-center">
            <div className="text-cyber-cyan text-xs font-bold">AI</div>
          </div>
        </div>
        
        {/* Database icon */}
        <div className="absolute top-40 right-32 w-12 h-16 animate-float-slow">
          <div className="w-full h-full bg-glass-medium backdrop-blur-sm rounded border border-cyber-orange/20 shadow-glow-orange">
            <div className="w-full h-3 bg-cyber-orange/30 rounded-t mb-1"></div>
            <div className="w-full h-3 bg-cyber-orange/20 mb-1"></div>
            <div className="w-full h-3 bg-cyber-orange/10"></div>
          </div>
        </div>
        
        {/* Robot head */}
        <div className="absolute bottom-32 right-20 w-14 h-14 animate-float">
          <div className="w-full h-full bg-glass-medium backdrop-blur-sm rounded-full border border-cyber-purple/20 shadow-glow-purple flex items-center justify-center">
            <div className="w-3 h-3 bg-cyber-purple rounded-full"></div>
          </div>
        </div>
        
        {/* Rocket */}
        <div className="absolute bottom-20 left-32 w-8 h-12 animate-float-slow">
          <div className="w-full h-full bg-gradient-to-t from-cyber-orange to-cyber-magenta rounded-t-full border border-cyber-orange/30 shadow-glow-orange"></div>
        </div>
        
        {/* Code terminal */}
        <div className="absolute top-60 left-1/4 w-20 h-12 animate-float">
          <div className="w-full h-full bg-glass-dark backdrop-blur-sm rounded border border-cyber-green/20 shadow-glow-soft p-2">
            <div className="w-full h-1 bg-cyber-green/60 mb-1"></div>
            <div className="w-3/4 h-1 bg-cyber-green/40 mb-1"></div>
            <div className="w-1/2 h-1 bg-cyber-green/30"></div>
          </div>
        </div>
        
        {/* Globe/Network */}
        <div className="absolute bottom-40 left-1/3 w-16 h-16 animate-float-slow">
          <div className="w-full h-full bg-glass-medium backdrop-blur-sm rounded-full border border-cyber-blue/20 shadow-glow-blue relative">
            <div className="absolute inset-2 border border-cyber-blue/30 rounded-full"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyber-blue/40"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyber-blue/40"></div>
          </div>
        </div>
      </div>
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-cyan rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(0, 240, 255, 0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="10%" y1="60%" x2="60%" y2="20%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="70%" y1="80%" x2="30%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
      </svg>
      
      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl"></div>
    </div>
  );
}