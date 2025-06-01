
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
      <PricingSection />
      <ContactSection />
      
      {/* Stats section */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Animations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Experience the power of modern web animations with React and GSAP
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Happy Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "50ms", label: "Response Time" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
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
      
      <Footer />
    </div>
  );
};

export default Index;
