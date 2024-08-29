'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Squares2X2Icon, ArrowPathRoundedSquareIcon, ArrowDownOnSquareStackIcon, CubeTransparentIcon } from '@heroicons/react/24/solid';
import { FaTree, FaProjectDiagram } from 'react-icons/fa'; // Importing icons from react-icons

const DataStructuresPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}>
      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center space-y-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Data Structures Documentation
          </h1>
          <p className="text-base sm:text-lg text-white">
            Explore detailed documentation and examples of various data structures.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Arrays Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <Squares2X2Icon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Arrays</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Learn about the structure, operations, and complexity of arrays.
            </p>
            <a
              href="/data-structures/arrays"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
            >
              Explore Arrays
            </a>
          </motion.div>

          {/* Linked Lists Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <ArrowPathRoundedSquareIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Linked Lists</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Discover various types of linked lists and their implementations.
            </p>
            <a
              href="/data-structures/linked-lists"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              Explore Linked Lists
            </a>
          </motion.div>

          {/* Queues Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <ArrowDownOnSquareStackIcon className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Queues</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Understand different types of queues and their applications.
            </p>
            <a
              href="/data-structures/queues"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Explore Queues
            </a>
          </motion.div>

          {/* Stacks Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <CubeTransparentIcon className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Stacks</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Learn how stacks work and their common use cases.
            </p>
            <a
              href="/data-structures/stacks"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
            >
              Explore Stacks
            </a>
          </motion.div>

          {/* Binary Trees Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaTree className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" /> {/* New Icon for Binary Trees */}
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Binary Trees</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Dive into different types of binary trees and their properties.
            </p>
            <a
              href="/data-structures/binary-trees"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              Explore Binary Trees
            </a>
          </motion.div>

          {/* Graphs Feature */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaProjectDiagram className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500 mb-4" /> {/* New Icon for Graphs */}
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Graphs</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Explore the world of graphs, their types, and algorithms.
            </p>
            <a
              href="/data-structures/graphs"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              Explore Graphs
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DataStructuresPage;
