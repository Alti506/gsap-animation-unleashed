
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const InteractiveDemo = () => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [animationType, setAnimationType] = useState('bounce');
  const boxRef = useRef<HTMLDivElement>(null);

  const playAnimation = (type: string) => {
    if (!boxRef.current) return;

    gsap.killTweensOf(boxRef.current);
    
    switch (type) {
      case 'bounce':
        gsap.to(boxRef.current, {
          y: -100,
          duration: 0.5,
          ease: "bounce.out",
          yoyo: true,
          repeat: 1
        });
        break;
      case 'rotate':
        gsap.to(boxRef.current, {
          rotation: 360,
          duration: 1,
          ease: "power2.inOut"
        });
        break;
      case 'scale':
        gsap.to(boxRef.current, {
          scale: 1.5,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "elastic.out"
        });
        break;
      case 'morph':
        gsap.to(boxRef.current, {
          borderRadius: "50%",
          backgroundColor: "#ff00f5",
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        break;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center py-20">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Interactive Animation Demo
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Click the buttons below to see different animation effects in real-time
        </p>

        <div className="flex justify-center mb-12">
          <div
            ref={boxRef}
            className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg shadow-2xl"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { type: 'bounce', label: 'Bounce', icon: '⬆️' },
            { type: 'rotate', label: 'Rotate', icon: '🔄' },
            { type: 'scale', label: 'Scale', icon: '📏' },
            { type: 'morph', label: 'Morph', icon: '🎭' }
          ].map((animation) => (
            <Button
              key={animation.type}
              onClick={() => playAnimation(animation.type)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {animation.icon} {animation.label}
            </Button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Performance Optimized",
              description: "GPU-accelerated animations running at 60fps",
              icon: "⚡"
            },
            {
              title: "Cross-browser Support",
              description: "Works flawlessly across all modern browsers",
              icon: "🌐"
            },
            {
              title: "Mobile Responsive",
              description: "Touch-friendly interactions on all devices",
              icon: "📱"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
