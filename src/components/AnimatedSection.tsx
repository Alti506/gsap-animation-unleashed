
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AnimatedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = gsap.utils.toArray('.fade-in-element');
    
    elements.forEach((element: any, index) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 100,
          rotateY: 45,
          scale: 0.8
        },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            scrub: 1
          },
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.5,
          delay: index * 0.2,
          ease: "power3.out"
        }
      );
    });

    // Parallax effect for the section
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -100,
      ease: "none"
    });

  }, []);

  const features = [
    { icon: '🚀', title: 'Lightning Fast', description: 'Optimized animations that run at 60fps' },
    { icon: '🎯', title: 'Precision Control', description: 'Frame-perfect timing and easing' },
    { icon: '🌈', title: 'Visual Stunning', description: 'Beautiful effects that captivate users' },
    { icon: '⚡', title: 'High Performance', description: 'GPU-accelerated smooth animations' },
    { icon: '🎨', title: 'Creative Freedom', description: 'Unlimited possibilities for expression' },
    { icon: '🔧', title: 'Easy Integration', description: 'Simple setup with modern frameworks' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover what makes our animation system extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="fade-in-element bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500"
              style={{
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedSection;
