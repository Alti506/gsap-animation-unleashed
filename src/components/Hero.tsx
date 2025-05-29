
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    
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

  }, []);

  const handleExploreClick = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: window.innerHeight, autoKill: false },
      ease: "power2.inOut"
    });
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
          className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight"
        >
          Unleash
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 border-2 border-cyan-400 rotate-45 opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-yellow-400 rounded-full opacity-25"></div>
    </header>
  );
};

export default Hero;
