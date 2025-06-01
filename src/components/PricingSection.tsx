
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.pricing-card');
    
    cards.forEach((card: any, index) => {
      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 100,
          rotateY: 45
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out"
        }
      );
    });
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small projects and learning",
      features: [
        "Basic animations library",
        "5 custom components",
        "Email support",
        "1 month updates"
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for professional websites and apps",
      features: [
        "Advanced animations library",
        "Unlimited components",
        "Priority support",
        "6 months updates",
        "Custom animations",
        "Performance optimization"
      ],
      popular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large-scale applications and teams",
      features: [
        "Full animations suite",
        "White-label solution",
        "24/7 dedicated support",
        "12 months updates",
        "Custom development",
        "Team collaboration tools",
        "Advanced analytics"
      ],
      popular: false,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Flexible pricing for projects of any size
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-500 hover:border-purple-400 shadow-purple-500/20' 
                  : 'border-gray-700 hover:border-cyan-400 hover:shadow-cyan-500/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All plans include a 30-day money-back guarantee</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Free migration</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
