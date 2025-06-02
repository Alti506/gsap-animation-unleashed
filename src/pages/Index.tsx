
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '../components/Navigation';
import EnhancedHero from '../components/EnhancedHero';
import EnhancedAnimatedSection from '../components/EnhancedAnimatedSection';
import CursorFollowSVG from '../components/CursorFollowSVG';
import ParticleBackground from '../components/ParticleBackground';
import InteractiveDemo from '../components/InteractiveDemo';
import AdvancedAnimationsShowcase from '../components/AdvancedAnimationsShowcase';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Typography from '../components/Typography';
import { Container, Section } from '../components/Layout';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Smooth page entry
      gsap.set("body", { overflow: "hidden" });
      gsap.to("body", { overflow: "auto", delay: 1.5 });

      // Enhanced navigation animation
      const navItems = document.querySelectorAll(".nav-item");
      if (navItems.length > 0) {
        gsap.fromTo(navItems, 
          { y: -30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.08, 
            ease: "power2.out", 
            delay: 0.8 
          }
        );
      }

      // Subtle section reveals
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0.9 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            duration: 0.8,
            ease: "power1.out"
          }
        );
      });

      console.log("Enhanced GSAP animations initialized");
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
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-white">
      <ParticleBackground />
      <Navigation />
      <EnhancedHero />
      <EnhancedAnimatedSection />
      <InteractiveDemo />
      <CursorFollowSVG />
      
      {/* Enhanced Stats Section */}
      <Section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
        <Container>
          <div className="text-center">
            <Typography 
              variant="h2" 
              className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Trusted by Developers Worldwide
            </Typography>
            <Typography 
              variant="body" 
              className="text-gray-300 max-w-2xl mx-auto mb-16"
            >
              Join thousands of developers creating exceptional web experiences
            </Typography>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "50K+", label: "Active Developers", icon: "👩‍💻" },
                { number: "99.9%", label: "Uptime SLA", icon: "⚡" },
                { number: "15ms", label: "Response Time", icon: "🚀" },
                { number: "24/7", label: "Expert Support", icon: "🛟" }
              ].map((stat, index) => (
                <div key={index} className="stat-item text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <Typography variant="h3" className="text-cyan-400 mb-2">{stat.number}</Typography>
                  <Typography variant="caption" className="text-gray-400">{stat.label}</Typography>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      
      <TestimonialsSection />
      <PricingSection />
      <Newsletter />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
