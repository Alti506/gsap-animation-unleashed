
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navigation = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' }
  ];

  useEffect(() => {
    // Enhanced sticky navigation animation
    const nav = navRef.current;
    if (nav) {
      gsap.set(nav, { y: -100 });
      gsap.to(nav, {
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });

      // Scroll-based background opacity
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 100, 0.95);
        gsap.to(nav, {
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
          backdropFilter: `blur(${Math.min(scrollY / 20, 20)}px)`,
          duration: 0.3
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 w-full px-8 py-4 bg-black/80 backdrop-blur-md flex justify-between items-center z-50 border-b border-white/10 transition-all duration-300"
    >
      <div className="nav-item">
        <Link to="/" className="group">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
            GSAP React
          </h2>
        </Link>
      </div>
      
      <ul className="flex gap-8">
        {navItems.map((item, index) => (
          <li key={item.name} className="nav-item">
            <Link
              to={item.path}
              className={`
                text-white font-semibold hover:text-pink-400 
                transition-all duration-300 relative group
                hover:scale-110 transform-gpu
                ${location.pathname === item.path ? 'text-pink-400' : ''}
              `}
            >
              {item.name}
              <span className={`
                absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 
                transition-all duration-300 transform-gpu
                ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
