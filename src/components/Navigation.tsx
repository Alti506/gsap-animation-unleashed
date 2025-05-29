
import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full px-8 py-4 bg-black/80 backdrop-blur-md flex justify-between items-center z-50 border-b border-white/10">
      <div className="nav-item">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          GSAP React
        </h2>
      </div>
      
      <ul className="flex gap-8">
        {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
          <li key={item} className="nav-item">
            <a
              href="#"
              className="text-white font-semibold hover:text-pink-400 transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
