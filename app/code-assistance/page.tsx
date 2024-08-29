'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineRobot } from 'react-icons/ai';

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user' as const, text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = { sender: 'bot' as const, text: `You said: ${input}` };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}>
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center space-y-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            AI Code Assistance ChatBot
          </h1>
          <p className="text-base sm:text-lg text-white">
            Chat with our AI assistant to get help with your coding questions.
          </p>
        </motion.div>

        {/* Chat Window */}
        <div className={`flex flex-col w-full max-w-2xl h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <AiOutlineRobot className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                )}
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg break-words ${message.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'}`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <AiOutlineUser className="w-6 h-6 text-blue-500 ml-2 flex-shrink-0" />
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-300 dark:border-gray-700 p-4 flex items-center space-x-4">
            <input
              type="text"
              className={`flex-1 px-4 py-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'}`}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBotPage;
