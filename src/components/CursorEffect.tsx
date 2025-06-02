
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CursorEffect = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Hide default cursor on hover areas
    const hoverElements = document.querySelectorAll('h1, h2, h3, button, a, .cursor-hover');
    
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      // Set cursor text based on element type
      if (target.tagName === 'BUTTON') {
        setCursorText('Click');
      } else if (target.tagName === 'A') {
        setCursorText('Visit');
      } else if (target.matches('h1, h2, h3')) {
        setCursorText('Explore');
      } else {
        setCursorText('Hover');
      }

      gsap.to(cursor, {
        scale: 3,
        opacity: 0.8,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.2,
        ease: "power2.out"
      });

      // Add magnetic effect
      if (target.tagName === 'BUTTON') {
        gsap.to(target, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(false);
      setCursorText('');

      gsap.to(cursor, {
        scale: 1,
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });

      // Reset magnetic effect
      if (target.tagName === 'BUTTON') {
        gsap.to(target, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-purple-500/30 rounded-full pointer-events-none z-[9999] mix-blend-difference border border-purple-400/50 flex items-center justify-center"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {isHovering && cursorText && (
          <span className="text-xs text-white font-medium whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-purple-400 rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CursorEffect;
