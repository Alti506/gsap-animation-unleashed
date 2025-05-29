
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SVGAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      
      // Set up the path for animation
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      // Animate the path drawing
      gsap.to(pathRef.current, {
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut"
      });

      // Add pulsing animation
      gsap.to(pathRef.current, {
        strokeWidth: 6,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          SVG Path Animation
        </h2>
        
        <svg 
          ref={svgRef}
          className="w-96 h-96 mx-auto"
          viewBox="0 0 400 400"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#ff00f5" />
              <stop offset="100%" stopColor="#f5ff00" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            ref={pathRef}
            d="M50 200 Q 100 50, 200 200 T 350 200"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Additional decorative paths */}
          <circle cx="50" cy="200" r="8" fill="#00f5ff" className="animate-pulse" />
          <circle cx="350" cy="200" r="8" fill="#f5ff00" className="animate-pulse" />
          
          {/* Animated particles along the path */}
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              r="3"
              fill="#ff00f5"
              className="opacity-80"
              style={{
                animation: `pathParticle 3s infinite linear ${i * 0.6}s`
              }}
            >
              <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.6}s`}>
                <mpath xlinkHref="#" />
              </animateMotion>
            </circle>
          ))}
        </svg>

        <p className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto">
          Watch as the path draws itself with smooth, fluid animations powered by GSAP
        </p>
      </div>

      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SVGAnimation;
