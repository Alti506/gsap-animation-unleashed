
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typography from './Typography';
import { Container, Section, Grid, Card } from './Layout';

const EnhancedAnimatedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = gsap.utils.toArray('.enhanced-fade-element');
    
    elements.forEach((element: any, index) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    });
  }, []);

  const features = [
    { 
      icon: '⚡', 
      title: 'Performance First', 
      description: 'Optimized animations that maintain 60fps on all devices with GPU acceleration'
    },
    { 
      icon: '🎯', 
      title: 'Precision Control', 
      description: 'Frame-perfect timing with advanced easing functions for natural motion'
    },
    { 
      icon: '🎨', 
      title: 'Design Excellence', 
      description: 'Beautiful, purposeful animations that enhance user experience'
    },
    { 
      icon: '📱', 
      title: 'Responsive Design', 
      description: 'Seamless animations across desktop, tablet, and mobile devices'
    },
    { 
      icon: '🔧', 
      title: 'Developer Friendly', 
      description: 'Clean, maintainable code with comprehensive documentation'
    },
    { 
      icon: '🚀', 
      title: 'Modern Stack', 
      description: 'Built with the latest React, TypeScript, and GSAP technologies'
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-slate-900 to-black">
      <Container>
        <div className="text-center mb-16">
          <Typography 
            variant="h2" 
            className="mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Why Choose Our Platform
          </Typography>
          <Typography 
            variant="body" 
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Experience the perfect blend of performance, beauty, and functionality
          </Typography>
        </div>

        <Grid>
          {features.map((feature, index) => (
            <Card key={index} className="enhanced-fade-element group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <Typography 
                variant="h4" 
                className="mb-4 text-white group-hover:text-purple-300 transition-colors duration-300"
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
              >
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default EnhancedAnimatedSection;
