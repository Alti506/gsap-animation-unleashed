
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' }
  ];

  return (
    <nav className="fixed top-0 w-full px-8 py-4 bg-black/80 backdrop-blur-md flex justify-between items-center z-50 border-b border-white/10">
      <div className="nav-item">
        <Link to="/">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            GSAP React
          </h2>
        </Link>
      </div>
      
      <ul className="flex gap-8">
        {navItems.map((item, index) => (
          <li key={item.name} className="nav-item">
            <Link
              to={item.path}
              className={`text-white font-semibold hover:text-pink-400 transition-colors duration-300 relative group ${
                location.pathname === item.path ? 'text-pink-400' : ''
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300 ${
                location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
