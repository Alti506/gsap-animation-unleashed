
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const formElements = gsap.utils.toArray('.contact-element');
    
    formElements.forEach((element: any, index) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          y: 30
        },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        // Show success message (you could add a toast here)
        console.log('Form submitted:', formData);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="contact-element text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="contact-element text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-element">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-gray-700 text-white focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-gray-700 text-white focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <Button 
                type="submit"
                className="submit-btn w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Send Message ✨
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-element space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you're looking to enhance your existing website or build something entirely new, 
                we're here to help bring your vision to life with stunning animations and interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "hello@animations.dev",
                  link: "mailto:hello@animations.dev"
                },
                {
                  icon: "💬",
                  title: "Discord",
                  value: "Join our community",
                  link: "#"
                },
                {
                  icon: "🐦",
                  title: "Twitter",
                  value: "@AnimationsTeam",
                  link: "#"
                },
                {
                  icon: "💼",
                  title: "LinkedIn",
                  value: "Connect with us",
                  link: "#"
                }
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  className="block bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {contact.title}
                      </h4>
                      <p className="text-sm text-gray-400">{contact.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 rounded-lg border border-cyan-500/20">
              <h4 className="text-lg font-bold text-white mb-2">🚀 Free Consultation</h4>
              <p className="text-gray-300 text-sm">
                Book a free 30-minute consultation to discuss your project and see how we can help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
