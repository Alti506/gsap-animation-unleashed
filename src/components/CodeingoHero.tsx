
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Typography from './Typography';
import EnhancedButton from './ui/enhanced-button';
import { Container } from './Layout';
import { Bot } from 'lucide-react';

interface CodeingoHeroProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

const CodeingoHero: React.FC<CodeingoHeroProps> = ({ onLoginClick, onSignUpClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({ delay: 0.5 });
    
    try {
      // Logo entrance
      tl.fromTo(logoRef.current, 
        { opacity: 0, y: -30, scale: 0.8 },
        { duration: 0.8, opacity: 1, y: 0, scale: 1, ease: "back.out(1.2)" }
      )
      // Title entrance
      .fromTo(titleRef.current, 
        { opacity: 0, y: 60 },
        { duration: 1, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.4"
      )
      // Subtitle entrance
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.6"
      )
      // Buttons entrance
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, 
        "-=0.4"
      );

      // Subtle floating animation for the robot icon
      gsap.to(logoRef.current, {
        y: -8,
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
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background pattern matching original GSAP React colors */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.4),transparent_50%)]" />
      </div>

      <Container className="text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div ref={logoRef} className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 shadow-xl border border-purple-300/30">
              <Bot size={80} className="text-purple-300" />
            </div>
          </div>
          
          <Typography 
            variant="h1" 
            ref={titleRef}
            className="bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent font-black"
          >
            free. fun. effective.
          </Typography>
          
          <Typography 
            variant="body" 
            ref={subtitleRef}
            className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed"
          >
            Learning with Codeingo is fun, and <span className="text-indigo-400 font-semibold">research shows that it works!</span> With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world programming skills.
          </Typography>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
            <EnhancedButton 
              onClick={onSignUpClick}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-12 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              GET STARTED
            </EnhancedButton>
            
            <EnhancedButton 
              onClick={onLoginClick}
              variant="outline"
              size="lg"
              className="border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 font-bold px-12 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              I ALREADY HAVE AN ACCOUNT
            </EnhancedButton>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-md mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">Effective</div>
              <div className="text-sm text-gray-400">Research-backed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400 mb-1">Personalized</div>
              <div className="text-sm text-gray-400">AI-powered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400 mb-1">Fun</div>
              <div className="text-sm text-gray-400">Game-like</div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default CodeingoHero;
