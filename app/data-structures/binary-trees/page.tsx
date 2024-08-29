'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChild, FaCheckCircle, FaBalanceScale, FaTree, FaCircle } from 'react-icons/fa'; // Icons for different types of binary trees

const BinaryTreesPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-green-500 to-teal-500'}`}>
      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center space-y-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Binary Trees Documentation
          </h1>
          <p className="text-base sm:text-lg text-white">
            Explore different types of binary trees and their unique characteristics.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Binary Trees by Children */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaChild className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Binary Trees by Children</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Learn about full, complete, and degenerate binary trees based on the number of children.
            </p>
            <a
              href="/data-structures/binary-trees/children"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
            >
              Explore Binary Trees by Children
            </a>
          </motion.div>

          {/* Binary Trees by Completion Levels */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaCheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Binary Trees by Completion Levels</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Understand binary trees categorized by level completion: complete and perfect trees.
            </p>
            <a
              href="/data-structures/binary-trees/completion-levels"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              Explore Binary Trees by Levels
            </a>
          </motion.div>

          {/* AVL Trees */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaBalanceScale className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">AVL Trees</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Discover AVL trees, a type of balanced binary search tree with self-balancing properties.
            </p>
            <a
              href="/data-structures/binary-trees/avl"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Explore AVL Trees
            </a>
          </motion.div>

          {/* Binary Search Trees (BST) */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaTree className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Binary Search Trees (BST)</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Learn about binary search trees (BST), a fundamental tree data structure.
            </p>
            <a
              href="/data-structures/binary-trees/bst"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
            >
              Explore BST
            </a>
          </motion.div>

          {/* Red-Black Trees */}
          <motion.div
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-500 hover:scale-105 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.05 }}
          >
            <FaCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Red-Black Trees</h2>
            <p className="text-center text-sm sm:text-base mb-4">
              Dive into red-black trees, a type of self-balancing binary search tree. 
            </p>
            <a
              href="/data-structures/binary-trees/red-black"
              className={`px-4 sm:px-6 py-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              Explore Red-Black Trees
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BinaryTreesPage;
