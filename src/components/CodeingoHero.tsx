
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Typography from './Typography';
import EnhancedButton from './ui/enhanced-button';
import { Container } from './Layout';

interface CodeingoHeroProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const CodeingoHero: React.FC<CodeingoHeroProps> = ({ onGetStarted, onLogin }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({ delay: 0.5 });
    
    try {
      // Hero entrance animations
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 60 },
        { duration: 1, opacity: 1, y: 0, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(mascotRef.current,
        { opacity: 0, scale: 0.8 },
        { duration: 0.8, opacity: 1, scale: 1, ease: "back.out(1.2)" }, 
        "-=0.6"
      );

      // Floating animation for mascot
      gsap.to(mascotRef.current, {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

    } catch (error) {
      console.error("Error in Codeingo Hero animation:", error);
    }
  }, []);

  return (
    <header 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
      </div>

      <Container className="text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Mascot */}
          <div ref={mascotRef} className="mb-8">
            <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl">🦉</div>
            </div>
          </div>

          <Typography 
            variant="h1" 
            ref={titleRef}
            className="text-white mb-6"
          >
            The free, fun, and effective way to<br />
            learn to code!
          </Typography>
          
          <Typography 
            variant="body" 
            ref={subtitleRef}
            className="text-white/90 max-w-2xl mx-auto mb-12 text-xl"
          >
            Join millions learning to code with Codeingo. 
            Gamified lessons make programming addictive and fun.
          </Typography>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnhancedButton 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 font-bold text-lg px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              GET STARTED
            </EnhancedButton>
            
            <EnhancedButton 
              onClick={onLogin}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-medium text-lg px-12 py-4 rounded-2xl transition-all w-full sm:w-auto"
            >
              I ALREADY HAVE AN ACCOUNT
            </EnhancedButton>
          </div>

          {/* Fun stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-md mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">500M+</div>
              <div className="text-sm text-white/80">Learners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">40+</div>
              <div className="text-sm text-white/80">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">15min</div>
              <div className="text-sm text-white/80">A day</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/20 rounded-lg rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/20 rounded-full animate-ping"></div>
    </header>
  );
};

export default CodeingoHero;
