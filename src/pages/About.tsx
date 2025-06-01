
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    const sections = gsap.utils.toArray('.about-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 60
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Our Studio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're passionate creators pushing the boundaries of web animation and user experience
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section py-20 bg-gray-900">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-cyan-400">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                To transform digital experiences through innovative animations that not only captivate 
                users but also enhance usability and drive engagement. We believe that motion design 
                is the future of web interaction.
              </p>
              <p className="text-lg text-gray-300">
                Every pixel matters, every transition tells a story, and every interaction should 
                feel magical. That's our philosophy in creating next-generation web experiences.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-8 rounded-2xl">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Innovation Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Projects Completed</span>
                      <span className="text-cyan-400 font-bold">200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client Satisfaction</span>
                      <span className="text-cyan-400 font-bold">99.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance Gain</span>
                      <span className="text-cyan-400 font-bold">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section py-20 bg-black">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Chen", role: "Lead Animation Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
              { name: "Sarah Rodriguez", role: "UX Motion Designer", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300" },
              { name: "Marcus Johnson", role: "Frontend Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section py-20 bg-gray-900">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "⚡", title: "Performance", description: "Lightning-fast animations that enhance, never hinder" },
              { icon: "🎨", title: "Creativity", description: "Pushing boundaries with innovative design solutions" },
              { icon: "🤝", title: "Collaboration", description: "Working closely with clients to achieve their vision" },
              { icon: "🚀", title: "Innovation", description: "Always exploring new technologies and techniques" }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
