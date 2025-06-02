
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

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({ delay: 0.5 });
    
    try {
      // Refined entrance animations with better easing
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 60 },
        { duration: 1, opacity: 1, y: 0, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { duration: 0.6, opacity: 1, scale: 1, ease: "back.out(1.2)" }, 
        "-=0.4"
      );

      // Subtle floating animation
      gsap.to(heroRef.current, {
        y: -10,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Enhanced typewriter effect
      const words = ["Beautiful", "Smooth", "Modern", "Engaging"];
      let currentWord = 0;

      const typewriterAnimation = () => {
        if (typewriterRef.current) {
          gsap.to(typewriterRef.current, {
            duration: 0.8,
            text: words[currentWord],
            ease: "power2.out",
            onComplete: () => {
              setTimeout(() => {
                currentWord = (currentWord + 1) % words.length;
                typewriterAnimation();
              }, 2500);
            }
          });
        }
      };

      setTimeout(typewriterAnimation, 1500);

    } catch (error) {
      console.error("Error in Enhanced Hero animation:", error);
    }
  }, []);

  const handleExploreClick = () => {
    try {
      gsap.to(window, {
        duration: 1.2,
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
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,105,180,0.3),transparent_50%)]" />
      </div>

      <Container className="text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <Typography 
            variant="h1" 
            ref={titleRef}
            className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          >
            Create <span ref={typewriterRef} className="text-purple-300">Beautiful</span><br />
            Web Experiences
          </Typography>
          
          <Typography 
            variant="body" 
            ref={subtitleRef}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Craft stunning, high-performance web animations with modern React and GSAP. 
            Bring your digital experiences to life with smooth, purposeful motion.
          </Typography>
          
          <div className="pt-4">
            <EnhancedButton 
              ref={buttonRef}
              onClick={handleExploreClick}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Explore Our Work ✨
            </EnhancedButton>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">60fps</div>
              <div className="text-sm text-gray-400">Performance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400 mb-1">Modern</div>
              <div className="text-sm text-gray-400">Standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400 mb-1">Smooth</div>
              <div className="text-sm text-gray-400">Animations</div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default EnhancedHero;
