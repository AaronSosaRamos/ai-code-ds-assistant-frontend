'use client';

import React, { useState, useEffect } from 'react';
import { SimpleQueue } from '../../../components/data-structures/queues/SimpleQueue';
import { PriorityQueue } from '../../../components/data-structures/queues/PriorityQueue';
import { Deque } from '../../../components/data-structures/queues/Deque';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';

const simpleQueueCode = `
class SimpleQueue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.items:
            return None
        return self.items.pop(0)

    def front(self):
        if not self.items:
            return None
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        return ' -> '.join(map(str, self.items))

# Example Usage
queue = SimpleQueue()
for i in range(20):
    queue.enqueue(random.randint(0, 100))
print(queue.display())
`;

const priorityQueueCode = `
class PriorityQueue:
    def __init__(self):
        self.items = []

    def enqueue(self, item, priority):
        queue_element = {"element": item, "priority": priority}
        added = False

        for i in range(len(self.items)):
            if queue_element["priority"] < self.items[i]["priority"]:
                self.items.insert(i, queue_element)
                added = True
                break
        
        if not added:
            self.items.append(queue_element)

    def dequeue(self):
        if not self.items:
            return None
        return self.items.pop(0)["element"]

    def front(self):
        if not self.items:
            return None
        return self.items[0]["element"]

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        return ' -> '.join([f'{item["element"]}({item["priority"]})' for item in self.items])

# Example Usage
priority_queue = PriorityQueue()
for i in range(20):
    priority_queue.enqueue(random.randint(0, 100), random.randint(1, 10))
print(priority_queue.display())
`;

const dequeCode = `
class Deque:
    def __init__(self):
        self.items = []

    def add_front(self, item):
        self.items.insert(0, item)

    def add_rear(self, item):
        self.items.append(item)

    def remove_front(self):
        if not self.items:
            return None
        return self.items.pop(0)

    def remove_rear(self):
        if not self.items:
            return None
        return self.items.pop()

    def front(self):
        if not self.items:
            return None
        return self.items[0]

    def rear(self):
        if not self.items:
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        return ' -> '.join(map(str, self.items))

# Example Usage
deque = Deque()
for i in range(20):
    deque.add_rear(random.randint(0, 100))
print(deque.display())
`;

const QueuesPage: React.FC = () => {
  const [simpleQueueResult, setSimpleQueueResult] = useState<string | null>(null);
  const [priorityQueueResult, setPriorityQueueResult] = useState<string | null>(null);
  const [dequeResult, setDequeResult] = useState<string | null>(null);

  const [simpleQueueTimes, setSimpleQueueTimes] = useState<number[]>([]);
  const [priorityQueueTimes, setPriorityQueueTimes] = useState<number[]>([]);
  const [dequeTimes, setDequeTimes] = useState<number[]>([]);

  const sizes = [10, 20, 30, 40, 50, 100, 200, 300, 500, 1000, 2000, 3000];

  const runBenchmark = () => {
    const newSimpleQueueTimes: number[] = [];
    const newPriorityQueueTimes: number[] = [];
    const newDequeTimes: number[] = [];

    sizes.forEach((size) => {
      let start: number, end: number;

      // Benchmark for Simple Queue
      const simpleQueue = new SimpleQueue();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        simpleQueue.enqueue(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newSimpleQueueTimes.push(end - start);

      // Benchmark for Priority Queue
      const priorityQueue = new PriorityQueue();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        priorityQueue.enqueue(Math.floor(Math.random() * 100), Math.floor(Math.random() * 10 + 1));
      }
      end = performance.now();
      newPriorityQueueTimes.push(end - start);

      // Benchmark for Deque
      const deque = new Deque();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        deque.addRear(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newDequeTimes.push(end - start);
    });

    setSimpleQueueTimes(newSimpleQueueTimes);
    setPriorityQueueTimes(newPriorityQueueTimes);
    setDequeTimes(newDequeTimes);
  };

  useEffect(() => {
    runBenchmark();
  }, []);

  const generateTimeChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Simple Queue',
        data: simpleQueueTimes,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Priority Queue',
        data: priorityQueueTimes,
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Deque',
        data: dequeTimes,
        fill: false,
        backgroundColor: 'rgba(192,192,75,0.4)',
        borderColor: 'rgba(192,192,75,1)',
      },
    ],
  });

  const generateSpaceChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Simple Queue',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Priority Queue',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Deque',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(192,192,75,0.4)',
        borderColor: 'rgba(192,192,75,1)',
      },
    ],
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const runSimpleQueueDemo = () => {
    const queue = new SimpleQueue();
    for (let i = 0; i < 20; i++) {
      queue.enqueue(Math.floor(Math.random() * 100));
    }
    setSimpleQueueResult(queue.display());
  };

  const runPriorityQueueDemo = () => {
    const queue = new PriorityQueue();
    for (let i = 0; i < 20; i++) {
      queue.enqueue(Math.floor(Math.random() * 100), Math.floor(Math.random() * 10 + 1));
    }
    setPriorityQueueResult(queue.display());
  };

  const runDequeDemo = () => {
    const deque = new Deque();
    for (let i = 0; i < 20; i++) {
      deque.addRear(Math.floor(Math.random() * 100));
    }
    setDequeResult(deque.display());
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Queues
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Simple Queue</h2>
        <p>
          A simple queue is a data structure that follows the First In First Out (FIFO) principle.
          It allows for the addition of elements at the back and removal of elements from the front.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(1) for enqueue/dequeue<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={simpleQueueCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {simpleQueueCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runSimpleQueueDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Simple Queue
        </button>
        {simpleQueueResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{simpleQueueResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Priority Queue</h2>
        <p>
          A priority queue is a special type of queue where each element is associated with a priority. Elements are dequeued based on their priority, rather than their order in the queue.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(log n) for enqueue (insertion)<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(log n)<br />
          <strong>Worst Case:</strong> O(log n)
        </p>
        <div className="relative">
          <CopyToClipboard text={priorityQueueCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {priorityQueueCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runPriorityQueueDemo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Priority Queue
        </button>
        {priorityQueueResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{priorityQueueResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Deque (Double-Ended Queue)</h2>
        <p>
          A deque (double-ended queue) is a linear data structure that allows insertion and removal of elements from both ends. It is a more generalized form of queue.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(1) for operations on both ends<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={dequeCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {dequeCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runDequeDemo}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Deque
        </button>
        {dequeResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{dequeResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
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

export default QueuesPage;
