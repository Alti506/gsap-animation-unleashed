
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full px-8 py-4 bg-white/95 backdrop-blur-md flex justify-between items-center z-50 border-b border-gray-200">
      <div className="nav-item">
        <Link to="/">
          <h2 className="text-2xl font-bold text-green-600 flex items-center space-x-2">
            <span>🦉</span>
            <span>codeingo</span>
          </h2>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-green-600 font-medium transition-colors">
          Log In
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-2xl font-medium transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
