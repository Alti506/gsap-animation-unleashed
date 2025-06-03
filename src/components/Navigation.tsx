
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full px-8 py-4 bg-white/90 backdrop-blur-md flex justify-between items-center z-50 border-b border-gray-100 shadow-sm">
      <div className="nav-item">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-gray-100 rounded-full p-2">
            <Bot size={32} className="text-gray-800" />
          </div>
          <h2 className="text-2xl font-bold text-green-600">
            Codeingo
          </h2>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
