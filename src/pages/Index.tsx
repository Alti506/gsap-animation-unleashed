
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import SVGAnimation from '../components/SVGAnimation';
import ParticleBackground from '../components/ParticleBackground';
import InteractiveDemo from '../components/InteractiveDemo';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add error handling for GSAP
    try {
      // Smooth scroll setup
      gsap.set("body", { overflow: "hidden" });
      gsap.to("body", { overflow: "auto", delay: 2 });

      // Page load animation with error handling
      const tl = gsap.timeline();
      
      // Check if elements exist before animating
      const navItems = document.querySelectorAll(".nav-item");
      if (navItems.length > 0) {
        tl.from(".nav-item", {
          duration: 0.8,
          y: -50,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5
        });
      }

      // Global scroll-triggered animations
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        gsap.fromTo(section, 
          { opacity: 0.8 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            duration: 1
          }
        );
      });

      console.log("GSAP animations initialized successfully");
    } catch (error) {
      console.error("Error initializing GSAP animations:", error);
    }

    return () => {
      try {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      } catch (error) {
        console.error("Error cleaning up ScrollTrigger:", error);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <AnimatedSection />
      <InteractiveDemo />
      <SVGAnimation />
      <TestimonialsSection />
      
      {/* Enhanced Stats section with better design */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Industry Leading Performance
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Trusted by developers worldwide for creating exceptional web experiences
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50K+", label: "Active Developers", icon: "👩‍💻" },
              { number: "99.9%", label: "Uptime SLA", icon: "⚡" },
              { number: "15ms", label: "Avg Response Time", icon: "🚀" },
              { number: "24/7", label: "Expert Support", icon: "🛟" }
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div
                key={i}
                className="border border-cyan-500 animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      </section>
      
      <PricingSection />
      <Newsletter />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
