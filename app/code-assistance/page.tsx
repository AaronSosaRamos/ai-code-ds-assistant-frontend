'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiSend } from 'react-icons/fi';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'api-key': process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      type: 'text',
      timestamp: new Date().toISOString(),
      payload: { text: 'Hello! I am here to help you with code assistance and data structures. How can I assist you today?' },
    },
  ]);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const user = {
    id: '1',
    fullName: 'username',
    email: 'user@gmail.com',
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      role: 'human',
      type: 'text',
      timestamp: new Date().toISOString(),
      payload: { text: input.trim() },
    };

    const updatedMessages = [...messages, newMessage];
    const limitedMessages = updatedMessages.slice(-6);

    setMessages(limitedMessages);
    setInput('');

    setIsSending(true);

    try {
      const response = await api.post('/chat', {
        user,
        type: 'chat',
        messages: limitedMessages,
      });

      const aiResponse = response.data.data[0];

      setMessages((prevMessages) => [...prevMessages, aiResponse].slice(-6));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-6">
          <h1 className="text-3xl font-bold text-white">AI Code and DS Assistance</h1>
          <p className="text-white mt-1">Your assistant for coding and data structure queries.</p>
        </div>

        {/* Chat Container */}
        <div id="chat-container" className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '65vh' }}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg shadow ${msg.role === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.payload.text}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Container */}
        <div className="border-t p-4 flex items-center space-x-4 bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            className={`bg-blue-500 p-3 rounded-full text-white shadow-md hover:bg-blue-600 transition ${isSending && 'opacity-50 cursor-not-allowed'}`}
            disabled={isSending}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
