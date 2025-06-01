
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray('.resource-item');
    items.forEach((item: any, index) => {
      gsap.fromTo(item, 
        {
          opacity: 0,
          y: 80
        },
        {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
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

  const blogPosts = [
    {
      title: "Advanced GSAP Techniques for Web Developers",
      excerpt: "Learn professional animation patterns used in production applications",
      date: "2024-05-15",
      readTime: "8 min read",
      category: "Tutorial"
    },
    {
      title: "Performance Optimization for Complex Animations",
      excerpt: "Best practices for maintaining 60fps in heavy animation scenarios",
      date: "2024-05-10",
      readTime: "12 min read",
      category: "Performance"
    },
    {
      title: "React + GSAP: The Perfect Animation Stack",
      excerpt: "Complete guide to integrating GSAP with modern React applications",
      date: "2024-05-05",
      readTime: "15 min read",
      category: "React"
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with GSAP ScrollTrigger",
      description: "Master scroll-based animations from beginner to advanced",
      duration: "45 min",
      level: "Beginner"
    },
    {
      title: "Building Interactive SVG Animations",
      description: "Create stunning vector animations with GSAP and SVG",
      duration: "60 min",
      level: "Intermediate"
    },
    {
      title: "Mobile-First Animation Design",
      description: "Optimize animations for touch devices and mobile performance",
      duration: "30 min",
      level: "Advanced"
    }
  ];

  const tools = [
    {
      name: "Animation Inspector",
      description: "Debug and optimize your GSAP animations in real-time",
      type: "Browser Extension"
    },
    {
      name: "Easing Visualizer",
      description: "Interactive tool to understand and customize easing functions",
      type: "Web Tool"
    },
    {
      name: "Performance Monitor",
      description: "Track animation performance across different devices",
      type: "Analytics"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Resources & Learning
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expand your animation skills with our comprehensive guides, tutorials, and tools
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="resource-item bg-gray-800 border-gray-700 hover:border-purple-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-white hover:text-purple-400 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-pink-400">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="resource-item bg-gray-900 border-gray-700 hover:border-pink-400 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tutorial.level === 'Beginner' ? 'bg-green-600 text-white' :
                      tutorial.level === 'Intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {tutorial.level}
                    </span>
                    <span className="text-gray-400 text-sm">{tutorial.duration}</span>
                  </div>
                  <CardTitle className="text-white">{tutorial.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="resource-item bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 text-center">
                <CardHeader>
                  <CardTitle className="text-white">{tool.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm mb-4 inline-block">
                    {tool.type}
                  </span>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                    Download
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

export default Resources;
