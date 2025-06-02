
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import Typography from './Typography';
import { Container, Section } from './Layout';
import ParticleField from './ParticleField';

const InteractiveDemo = () => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [animationType, setAnimationType] = useState('bounce');
  const boxRef = useRef<HTMLDivElement>(null);
  const liquidBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const playAnimation = (type: string) => {
    if (!boxRef.current) return;

    gsap.killTweensOf(boxRef.current);
    setAnimationType(type);
    
    switch (type) {
      case 'bounce':
        gsap.to(boxRef.current, {
          y: -120,
          duration: 0.8,
          ease: "bounce.out",
          yoyo: true,
          repeat: 1,
          transformOrigin: "center bottom"
        });
        break;
      
      case 'rotate':
        gsap.to(boxRef.current, {
          rotation: 720,
          scale: 1.2,
          duration: 2,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(boxRef.current, {
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }
        });
        break;
      
      case 'morph':
        const tl = gsap.timeline();
        tl.to(boxRef.current, {
          borderRadius: "50%",
          backgroundColor: "#ff6b6b",
          scale: 1.3,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        })
        .to(boxRef.current, {
          borderRadius: "10px",
          backgroundColor: "#4ecdc4",
          scale: 0.9,
          duration: 0.6,
          ease: "bounce.out"
        })
        .to(boxRef.current, {
          borderRadius: "20px",
          backgroundColor: "#45b7d1",
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
        break;
      
      case 'liquid':
        if (liquidBarRef.current) {
          gsap.fromTo(liquidBarRef.current, 
            { scaleX: 0, transformOrigin: "left center" },
            { 
              scaleX: 1, 
              duration: 2, 
              ease: "elastic.out(1, 0.3)" 
            }
          );
        }
        gsap.to(boxRef.current, {
          y: -20,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1
        });
        break;
      
      case 'physics':
        gsap.to(boxRef.current, {
          y: -100,
          rotation: 180,
          duration: 0.6,
          ease: "power2.out"
        });
        gsap.to(boxRef.current, {
          y: 0,
          rotation: 360,
          duration: 0.8,
          ease: "bounce.out",
          delay: 0.6
        });
        break;
      
      case 'magnetic':
        const magneticTl = gsap.timeline();
        magneticTl.to(boxRef.current, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(boxRef.current, {
          scale: 0.8,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        })
        .to(boxRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
        break;

      case 'wave':
        const waveTl = gsap.timeline();
        waveTl.to(boxRef.current, {
          scaleY: 0.3,
          scaleX: 1.4,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(boxRef.current, {
          scaleY: 1.6,
          scaleX: 0.7,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(boxRef.current, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
        break;

      case 'glitch':
        const glitchTl = gsap.timeline();
        for (let i = 0; i < 8; i++) {
          glitchTl.to(boxRef.current, {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            rotation: Math.random() * 20 - 10,
            duration: 0.05,
            ease: "none"
          });
        }
        glitchTl.to(boxRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        break;

      case 'spiral':
        gsap.to(boxRef.current, {
          motionPath: {
            path: "M0,0 Q50,-100 100,0 Q150,100 200,0",
            autoRotate: true
          },
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1
        });
        break;
    }
  };

  useEffect(() => {
    // Animate cards on mount
    gsap.fromTo(cardRefs.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.7)",
        delay: 0.3
      }
    );
  }, []);

  const addToCardRefs = (el: HTMLDivElement) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <Section className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
      <ParticleField />
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <Typography 
            variant="h2" 
            className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-hover"
          >
            Professional Animation Playground
          </Typography>
          <Typography 
            variant="body" 
            className="text-gray-300 max-w-3xl mx-auto"
          >
            Experience real-time animation demonstrations. Click any button to see advanced 
            motion design techniques in action.
          </Typography>
        </div>

        {/* Main animation demo area */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative mb-8">
            <div
              ref={boxRef}
              className="w-32 h-32 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl border-2 border-white/20"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #9f40ff 50%, #ff0080 100%)'
              }}
            />
            
            {/* Liquid progress bar */}
            <div className="absolute -bottom-8 left-0 right-0 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                ref={liquidBarRef}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </div>

          {/* Animation controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl">
            {[
              { type: 'bounce', label: 'Elastic Bounce', icon: '⬆️', description: 'Physics-based bounce' },
              { type: 'rotate', label: 'Spin Transform', icon: '🌀', description: 'Multi-axis rotation' },
              { type: 'morph', label: 'Shape Morph', icon: '🎭', description: 'Fluid transitions' },
              { type: 'liquid', label: 'Liquid Motion', icon: '💧', description: 'Organic movement' },
              { type: 'physics', label: 'Physics Sim', icon: '⚡', description: 'Realistic dynamics' },
              { type: 'magnetic', label: 'Magnetic Pull', icon: '🧲', description: 'Attraction forces' },
              { type: 'wave', label: 'Wave Distort', icon: '🌊', description: 'Elastic deformation' },
              { type: 'glitch', label: 'Glitch Effect', icon: '📺', description: 'Digital disruption' },
              { type: 'spiral', label: 'Motion Path', icon: '🌀', description: 'Complex trajectories' }
            ].map((animation) => (
              <Button
                key={animation.type}
                onClick={() => playAnimation(animation.type)}
                className={`group relative overflow-hidden bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-purple-500/30 hover:from-indigo-600/40 hover:to-purple-600/40 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 ${
                  animationType === animation.type ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                <div className="text-2xl mb-1">{animation.icon}</div>
                <div className="font-semibold text-sm">{animation.label}</div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {animation.description}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Feature showcase cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Hardware Acceleration",
              description: "GPU-powered animations for silky smooth 60fps performance",
              icon: "🚀",
              metrics: "60fps guaranteed"
            },
            {
              title: "Physics Engine",
              description: "Realistic motion with springs, damping, and collision detection",
              icon: "⚗️",
              metrics: "Real physics"
            },
            {
              title: "Responsive Design",
              description: "Animations that adapt seamlessly across all device sizes",
              icon: "📱",
              metrics: "All devices"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              ref={addToCardRefs}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <Typography 
                variant="h4" 
                className="mb-3 text-white group-hover:text-purple-300 transition-colors duration-300"
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4"
              >
                {feature.description}
              </Typography>
              <div className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30">
                {feature.metrics}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default InteractiveDemo;
