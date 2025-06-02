
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  element: HTMLDivElement;
}

const ParticleField = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 30;
    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full pointer-events-none';
      element.style.background = `linear-gradient(45deg, 
        rgba(99, 102, 241, ${0.3 + Math.random() * 0.4}), 
        rgba(139, 92, 246, ${0.3 + Math.random() * 0.4}))`;
      
      const size = 2 + Math.random() * 4;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      container.appendChild(element);

      const particle: Particle = {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        opacity: 0.3 + Math.random() * 0.4,
        element
      };

      particles.push(particle);
    }

    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision
        if (particle.x <= 0 || particle.x >= container.offsetWidth) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= container.offsetHeight) {
          particle.vy *= -1;
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
          
          // Increase opacity when near mouse
          gsap.to(particle.element, {
            opacity: Math.min(1, particle.opacity + force * 0.5),
            scale: 1 + force * 0.5,
            duration: 0.1
          });
        } else {
          gsap.to(particle.element, {
            opacity: particle.opacity,
            scale: 1,
            duration: 0.3
          });
        }

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update DOM element
        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        container.removeChild(particle.element);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;
