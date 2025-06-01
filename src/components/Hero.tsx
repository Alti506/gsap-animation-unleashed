
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Register TextPlugin
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({ delay: 1 });
    
    try {
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          rotateX: 90 
        },
        { 
          duration: 1.2, 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          ease: "power3.out" 
        }
      )
      .fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 60 
        },
        { 
          duration: 1, 
          opacity: 1, 
          y: 0, 
          ease: "power3.out" 
        }, 
        "-=0.6"
      )
      .fromTo(buttonRef.current,
        { 
          scale: 0,
          rotation: 180 
        },
        { 
          duration: 0.8, 
          scale: 1,
          rotation: 0,
          ease: "back.out(1.7)" 
        }, 
        "-=0.4"
      );

      // Floating animation for the hero section
      gsap.to(heroRef.current, {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Typewriter effect
      const words = ["Stunning", "Smooth", "Interactive", "Professional"];
      let currentWord = 0;

      const typewriterAnimation = () => {
        if (typewriterRef.current) {
          gsap.to(typewriterRef.current, {
            duration: 1,
            text: words[currentWord],
            ease: "none",
            onComplete: () => {
              setTimeout(() => {
                currentWord = (currentWord + 1) % words.length;
                typewriterAnimation();
              }, 2000);
            }
          });
        }
      };

      setTimeout(typewriterAnimation, 2000);

    } catch (error) {
      console.error("Error in Hero animation:", error);
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
      // Fallback scroll
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center text-center relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-8xl font-black mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Create
          </span>
          <br />
          <span ref={typewriterRef} className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Stunning
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Animations
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Experience high-performance web magic with modern React and GSAP animations
        </p>
        
        <button 
          ref={buttonRef}
          onClick={handleExploreClick}
          className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/25 transform active:scale-95"
        >
          Explore Magic ✨
        </button>

        <div className="mt-12 flex justify-center space-x-8 text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">60fps</div>
            <div className="text-sm">Smooth Performance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">GPU</div>
            <div className="text-sm">Accelerated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">Modern</div>
            <div className="text-sm">Web Standards</div>
          </div>
        </div>
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 border-2 border-cyan-400 rotate-45 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-yellow-400 rounded-full opacity-25 animate-spin"></div>
    </header>
  );
};

export default Hero;
