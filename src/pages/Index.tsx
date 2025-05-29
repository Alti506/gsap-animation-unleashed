
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import SVGAnimation from '../components/SVGAnimation';
import ParticleBackground from '../components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll setup
    gsap.set("body", { overflow: "hidden" });
    gsap.to("body", { overflow: "auto", delay: 2 });

    // Page load animation
    const tl = gsap.timeline();
    tl.from(".nav-item", {
      duration: 0.8,
      y: -50,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <AnimatedSection />
      <SVGAnimation />
      
      {/* Additional sections for scrolling */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Animations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the power of modern web animations with React and GSAP
          </p>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
