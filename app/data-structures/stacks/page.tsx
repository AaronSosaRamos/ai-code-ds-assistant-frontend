'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { Stack } from '../../../components/data-structures/stacks/Stack';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCheck, FiClipboard } from 'react-icons/fi';


const stackCode = `
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.items:
            return None
        return self.items.pop()

    def peek(self):
        if not self.items:
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        return ' -> '.join(map(str, self.items))

# Example Usage
stack = Stack()
for i in range(20):
    stack.push(random.randint(0, 100))
print(stack.display())
`;

const StackPage: React.FC = () => {
  const [stackResult, setStackResult] = useState<string | null>(null);
  const [stackTimes, setStackTimes] = useState<number[]>([]);
  const sizes = [10, 20, 30, 40, 50, 100, 200, 300, 500, 1000, 2000, 3000];

  const runBenchmark = () => {
    const newStackTimes: number[] = [];

    sizes.forEach((size) => {
      let start: number, end: number;

      const stack = new Stack();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        stack.push(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newStackTimes.push(end - start);
    });

    setStackTimes(newStackTimes);
  };

  useEffect(() => {
    runBenchmark();
  }, []);

  const generateTimeChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Stack',
        data: stackTimes,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  const generateSpaceChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Stack',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  const runDemo = () => {
    const stack = new Stack();
    for (let i = 0; i < 20; i++) {
      stack.push(Math.floor(Math.random() * 100));
    }
    setStackResult(stack.display());
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); 
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Stack
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p>
          A stack is a data structure that follows the Last In First Out (LIFO) principle. 
          It allows for the addition and removal of elements in a particular order, 
          where the last element added is the first to be removed.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(1) for push/pop<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={stackCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {stackCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Stack
        </button>
        {stackResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{stackResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Time Complexity Comparison</h2>
        <div className="overflow-x-auto">
          <Line data={generateTimeChartData()} />
        </div>
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Space Complexity Comparison</h2>
        <div className="overflow-x-auto">
          <Line data={generateSpaceChartData()} />
        </div>
      </motion.section>
    </div>
  );
};

export default StackPage;
