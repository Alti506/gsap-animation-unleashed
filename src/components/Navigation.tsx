
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full px-8 py-4 bg-slate-900/90 backdrop-blur-md flex justify-between items-center z-50 border-b border-purple-500/20 shadow-sm">
      <div className="nav-item">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-purple-600/20 rounded-full p-2 border border-purple-400/30">
            <Bot size={32} className="text-purple-300" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
            Codeingo
          </h2>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-gray-300 hover:text-purple-300 font-medium transition-colors duration-200"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
