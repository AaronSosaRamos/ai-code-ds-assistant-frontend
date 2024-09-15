'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftEllipsisIcon, BookOpenIcon, CubeIcon } from '@heroicons/react/24/solid';

const MainScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center space-y-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Welcome to AI Code and DS Assistance
          </h1>
          <p className="text-lg text-white">
            Your ultimate tool for interactive coding help and in-depth data structure documentation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            className={`rounded-lg shadow-lg p-8 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Code Assistance</h2>
            <p className="text-center mb-4">
              Get real-time code help and suggestions with our AI-powered chatbot.
            </p>
            <a
              href="/code-assistance"
              className={`px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Start Chatting
            </a>
          </motion.div>

          <motion.div
            className={`rounded-lg shadow-lg p-8 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <BookOpenIcon className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Data Structures</h2>
            <p className="text-center mb-4">
              Explore comprehensive documentation and interactive examples of various data structures.
            </p>
            <a
              href="/data-structures"
              className={`px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              Explore Now
            </a>
          </motion.div>

          <motion.div
            className={`rounded-lg shadow-lg p-8 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <CubeIcon className="w-16 h-16 text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">NexaMind</h2>
            <p className="text-center mb-4">
              Your AI Assistant for Software Architectures. Get insights and guidance on best practices for designing architectures.
            </p>
            <a
              href="/nexamind"
              className={`px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
            >
              Get Assistance
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
