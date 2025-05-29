
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = [];
    const numParticles = 50;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? '#00f5ff' : '#ff00f5'};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
      `;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      gsap.to(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Pulsing effect
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticleBackground;
