
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Typography from './Typography';
import EnhancedButton from './ui/enhanced-button';
import { Container } from './Layout';

const EnhancedHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({ delay: 0.8 });
    
    try {
      // Enhanced background animation
      if (backgroundRef.current) {
        gsap.fromTo(backgroundRef.current, 
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
        );
      }

      // Staggered text reveals with enhanced effects
      const titleWords = titleRef.current?.children;
      if (titleWords) {
        gsap.set(titleWords, { y: 100, opacity: 0, rotateX: 90 });
        tl.to(titleWords, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out"
        });
      }

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          duration: 1, 
          opacity: 1, 
          y: 0, 
          scale: 1,
          ease: "power2.out" 
        }, 
        "-=0.8"
      )
      .fromTo(buttonRef.current,
        { opacity: 0, scale: 0, rotation: 180 },
        { 
          duration: 0.8, 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          ease: "back.out(1.7)" 
        }, 
        "-=0.6"
      );

      // Enhanced floating animation with multiple elements
      gsap.to(heroRef.current, {
        y: -15,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Dynamic typewriter effect with smooth transitions
      const words = ["Beautiful", "Smooth", "Modern", "Engaging", "Interactive"];
      let currentWord = 0;

      const typewriterAnimation = () => {
        if (typewriterRef.current) {
          gsap.to(typewriterRef.current, {
            duration: 0.1,
            text: "",
            ease: "none",
            onComplete: () => {
              gsap.to(typewriterRef.current, {
                duration: 1.2,
                text: words[currentWord],
                ease: "power2.out",
                onComplete: () => {
                  setTimeout(() => {
                    currentWord = (currentWord + 1) % words.length;
                    typewriterAnimation();
                  }, 2800);
                }
              });
            }
          });
        }
      };

      setTimeout(typewriterAnimation, 2000);

    } catch (error) {
      console.error("Error in Enhanced Hero animation:", error);
    }
  }, []);

  const handleExploreClick = () => {
    try {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: window.innerHeight, autoKill: false },
        ease: "power2.inOut"
      });
    } catch (error) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced animated background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,105,180,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(99,102,241,0.3),transparent_60%)]" />
        </div>
        
        {/* Animated particles */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s ease-in-out`
            }}
          />
        ))}
      </div>

      <Container className="text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <Typography 
            variant="h1" 
            ref={titleRef}
            className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          >
            <span className="block">Create</span>
            <span ref={typewriterRef} className="text-purple-300 block">Beautiful</span>
            <span className="block">Web Experiences</span>
          </Typography>
          
          <Typography 
            variant="body" 
            ref={subtitleRef}
            className="text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Craft stunning, high-performance web animations with modern React and GSAP. 
            Bring your digital experiences to life with smooth, purposeful motion that engages and delights.
          </Typography>
          
          <div className="pt-6">
            <EnhancedButton 
              ref={buttonRef}
              onClick={handleExploreClick}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-500/25"
            >
              Explore Our Work ✨
            </EnhancedButton>
          </div>

          {/* Enhanced stats grid */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-lg mx-auto">
            {[
              { label: "60fps", desc: "Performance", color: "text-purple-400" },
              { label: "Modern", desc: "Standards", color: "text-indigo-400" },
              { label: "Smooth", desc: "Animations", color: "text-pink-400" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div className={`text-2xl font-bold ${stat.color} mb-2 group-hover:animate-pulse`}>
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default EnhancedHero;
