"use client"

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm">
          &copy; {year} All Rights Reserved. Made by Wilfredo Aaron Sosa Ramos.
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com" className="hover:text-gray-400 transition-colors duration-300">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" className="hover:text-gray-400 transition-colors duration-300">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" className="hover:text-gray-400 transition-colors duration-300">
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
