
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
              GSAP React Studio
            </h3>
            <p className="text-gray-400 max-w-md mb-6">
              Creating beautiful, high-performance web animations that captivate users and enhance digital experiences. Your trusted partner in modern web development.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "🐦", label: "Twitter", url: "https://twitter.com" },
                { icon: "💼", label: "LinkedIn", url: "https://linkedin.com" },
                { icon: "📧", label: "Email", url: "mailto:hello@gsapreact.com" },
                { icon: "💬", label: "Discord", url: "https://discord.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'About', path: '/about' },
                { name: 'Resources', path: '/resources' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Tutorials', 'Examples', 'Support', 'Blog'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} GSAP React Studio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link, index) => (
              <a 
                key={index}
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-300 mb-4">Ready to transform your web experience?</p>
          <Link 
            to="/portfolio" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
