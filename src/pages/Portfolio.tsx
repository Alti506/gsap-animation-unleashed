
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate portfolio items on scroll
    const items = gsap.utils.toArray('.portfolio-item');
    items.forEach((item: any, index) => {
      gsap.fromTo(item, 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const portfolioItems = [
    {
      title: "E-commerce Animation Suite",
      description: "Complete shopping experience with micro-interactions",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
      tags: ["React", "GSAP", "E-commerce"],
      category: "Web App"
    },
    {
      title: "Interactive Data Visualization",
      description: "Real-time charts with smooth transitions",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      tags: ["D3.js", "GSAP", "Analytics"],
      category: "Dashboard"
    },
    {
      title: "Mobile Game Interface",
      description: "Engaging UI animations for gaming platform",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
      tags: ["React Native", "Gaming"],
      category: "Mobile"
    },
    {
      title: "Corporate Website Redesign",
      description: "Modern landing page with scroll-triggered animations",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      tags: ["Corporate", "GSAP", "SEO"],
      category: "Website"
    },
    {
      title: "AR Product Showcase",
      description: "3D product visualization with WebGL",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500",
      tags: ["WebGL", "Three.js", "AR"],
      category: "3D/AR"
    },
    {
      title: "Learning Platform UI",
      description: "Educational dashboard with progress animations",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500",
      tags: ["Education", "React", "UX"],
      category: "Platform"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Showcase
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of cutting-edge web animations and interactive experiences
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <Card key={index} className="portfolio-item bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
