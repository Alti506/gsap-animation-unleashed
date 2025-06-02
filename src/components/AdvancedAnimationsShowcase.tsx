
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typography from './Typography';
import { Container, Section } from './Layout';

const AdvancedAnimationsShowcase = () => {
  const showcaseRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const morphBoxRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered cards entrance with physics
    gsap.fromTo(cardsRef.current,
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        rotateX: 45 
      },
      {
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start",
          ease: "power2.out"
        },
        ease: "back.out(1.7)"
      }
    );

    // Morphing box animation
    if (morphBoxRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(morphBoxRef.current, {
        borderRadius: "50%",
        scale: 1.2,
        backgroundColor: "#ff6b6b",
        duration: 2,
        ease: "elastic.out(1, 0.5)"
      })
      .to(morphBoxRef.current, {
        borderRadius: "0%",
        scale: 0.8,
        backgroundColor: "#4ecdc4",
        duration: 1.5,
        ease: "bounce.out"
      })
      .to(morphBoxRef.current, {
        borderRadius: "20px",
        scale: 1,
        backgroundColor: "#45b7d1",
        duration: 1,
        ease: "power2.inOut"
      });
    }

    // Parallax effect
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }

    // Liquid loading animation
    if (liquidRef.current) {
      const liquid = liquidRef.current;
      gsap.set(liquid, { scaleX: 0, transformOrigin: "left center" });
      
      gsap.to(liquid, {
        scaleX: 1,
        duration: 3,
        ease: "elastic.out(1, 0.3)",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: liquid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const animationExamples = [
    {
      title: "Elastic Morphing",
      description: "Watch shapes transform with realistic physics",
      demo: (
        <div className="flex justify-center">
          <div
            ref={morphBoxRef}
            className="w-20 h-20 bg-blue-500 rounded-lg shadow-lg"
          />
        </div>
      )
    },
    {
      title: "Liquid Loading",
      description: "Fluid progress animations with elastic behavior",
      demo: (
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            ref={liquidRef}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        </div>
      )
    },
    {
      title: "3D Perspective",
      description: "Cards with depth and realistic shadows",
      demo: (
        <div className="perspective-1000">
          <div className="w-full h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500" />
        </div>
      )
    },
    {
      title: "Particle System",
      description: "Dynamic floating elements with physics",
      demo: (
        <div className="relative h-20 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-70"
              style={{
                left: `${10 + i * 10}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "Magnetic Interaction",
      description: "Elements that respond to cursor proximity",
      demo: (
        <div className="magnetic-container group cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
        </div>
      )
    },
    {
      title: "Text Reveal",
      description: "Sophisticated typography animations",
      demo: (
        <div className="overflow-hidden">
          <div className="text-reveal-text text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Beautiful Text
          </div>
        </div>
      )
    }
  ];

  return (
    <Section ref={showcaseRef} className="bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Parallax background element */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        style={{ width: '200%', height: '200%', top: '-50%', left: '-50%' }}
      />
      
      <Container className="relative z-10">
        <div className="text-center mb-20">
          <Typography 
            variant="h2" 
            className="mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
          >
            Advanced Animation Gallery
          </Typography>
          <Typography 
            variant="body" 
            className="text-gray-300 max-w-3xl mx-auto"
          >
            Explore cutting-edge animation techniques that bring digital experiences to life.
            Each example demonstrates professional-grade motion design principles.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animationExamples.map((example, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="mb-6 h-24 flex items-center justify-center">
                {example.demo}
              </div>
              
              <Typography 
                variant="h4" 
                className="mb-3 text-white group-hover:text-purple-300 transition-colors duration-300"
              >
                {example.title}
              </Typography>
              
              <Typography 
                variant="caption" 
                className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
              >
                {example.description}
              </Typography>
            </div>
          ))}
        </div>

        {/* Performance metrics */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { metric: "60fps", label: "Smooth Performance", icon: "⚡" },
              { metric: "GPU", label: "Hardware Accelerated", icon: "🚀" },
              { metric: "<16ms", label: "Frame Time", icon: "⏱️" },
              { metric: "Zero", label: "Layout Shifts", icon: "🎯" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <Typography variant="h3" className="text-cyan-400 mb-1">{stat.metric}</Typography>
                <Typography variant="caption" className="text-gray-400">{stat.label}</Typography>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AdvancedAnimationsShowcase;
