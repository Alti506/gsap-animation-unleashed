
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CursorFollowSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 400;
        const y = ((e.clientY - rect.top) / rect.height) * 400;
        setMousePosition({ x: Math.max(50, Math.min(350, x)), y: Math.max(50, Math.min(350, y)) });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const path = `M50 200 Q ${mousePosition.x} ${mousePosition.y}, 350 200`;
      
      gsap.to(pathRef.current, {
        attr: { d: path },
        duration: 0.3,
        ease: "power2.out"
      });

      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  }, [mousePosition]);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Interactive SVG Animation
        </h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Move your cursor over the animation below to see the path follow your movement
        </p>
        
        <div className="flex justify-center">
          <svg 
            ref={svgRef}
            className="w-96 h-96 cursor-none"
            viewBox="0 0 400 400"
          >
            <defs>
              <linearGradient id="cursorPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#9f40ff" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
              
              <filter id="cursorGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              ref={pathRef}
              d="M50 200 Q 200 200, 350 200"
              stroke="url(#cursorPathGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#cursorGlow)"
            />
            
            <circle cx="50" cy="200" r="6" fill="#00d4ff" className="animate-pulse" />
            <circle cx="350" cy="200" r="6" fill="#ff0080" className="animate-pulse" />
            <circle 
              cx={mousePosition.x} 
              cy={mousePosition.y} 
              r="8" 
              fill="#9f40ff" 
              className="opacity-75"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CursorFollowSVG;
