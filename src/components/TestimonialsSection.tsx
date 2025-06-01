
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const testimonials = gsap.utils.toArray('.testimonial-card');
    
    testimonials.forEach((card: any, index) => {
      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        }
      );
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechCorp",
      text: "These animations transformed our user experience completely. The smooth interactions keep users engaged like never before.",
      avatar: "👩‍💻",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "UX Designer",
      company: "Design Studio",
      text: "The fluid animations and professional implementation exceeded our expectations. Highly recommended for any modern web project.",
      avatar: "👨‍🎨",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      company: "StartupXYZ",
      text: "Our conversion rates increased by 40% after implementing these animation patterns. The user engagement is incredible.",
      avatar: "👩‍💼",
      rating: 5
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted by developers and designers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 group"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                  <p className="text-yellow-400">{testimonial.role}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Netflix', 'Spotify'].map((company, index) => (
              <div key={index} className="text-gray-400 font-bold text-lg">
                {company}
              </div>
            ))}
          </div>
          <p className="text-gray-500 mt-4">Trusted by leading companies worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
