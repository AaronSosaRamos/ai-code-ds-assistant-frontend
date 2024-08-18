'use client';

import React, { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { motion } from 'framer-motion';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { SinglyLinkedList } from './components/SinglyLinkedList';
import { DoublyLinkedList } from './components/DoublyLinkedList';
import { SinglyCircularLinkedList } from './components/SinglyCircularLinkedList';
import { DoublyCircularLinkedList } from './components/DoublyCircularLinkedList';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiCheck, FiClipboard } from 'react-icons/fi';

const singlyLinkedListCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Example Usage
sll = SinglyLinkedList()
for i in range(20):
    sll.append(random.randint(0, 100))
sll.display()
`;

const doublyLinkedListCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
            new_node.prev = current

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" <-> ")
            current = current.next
        print("None")

# Example Usage
dll = DoublyLinkedList()
for i in range(20):
    dll.append(random.randint(0, 100))
dll.display()
`;

const singlyCircularLinkedListCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyCircularLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.head.next = self.head
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head

    def display(self):
        if not self.head:
            return
        current = self.head
        while True:
            print(current.data, end=" -> ")
            current = current.next
            if current == self.head:
                break
        print(current.data + " (head)")
`;

const doublyCircularLinkedListCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyCircularLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data);
        if (!this.head) {
            this.head = new_node;
            this.head.next = this.head;
            this.head.prev = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = new_node;
            new_node.prev = current;
            new_node.next = this.head;
            this.head.prev = new_node;
        }
    }

    display() {
        if (!this.head) return 'Empty List';

        const elements: number[] = [];
        let current = this.head;
        do {
            elements.push(current.data);
            current = current.next!;
        } while (current !== this.head);

        return elements.join(' <-> ') + ' <-> (head)';
    }
}
`;

const LinkedListsPage: React.FC = () => {
  const [singlyResult, setSinglyResult] = useState<string | null>(null);
  const [doublyResult, setDoublyResult] = useState<string | null>(null);
  const [singlyCircularResult, setSinglyCircularResult] = useState<string | null>(null);
  const [doublyCircularResult, setDoublyCircularResult] = useState<string | null>(null);

  const [singlyTimes, setSinglyTimes] = useState<number[]>([]);
  const [doublyTimes, setDoublyTimes] = useState<number[]>([]);
  const [singlyCircularTimes, setSinglyCircularTimes] = useState<number[]>([]);
  const [doublyCircularTimes, setDoublyCircularTimes] = useState<number[]>([]);

  const sizes = [10, 20, 30, 40, 50, 100, 200, 300, 500, 1000, 2000, 3000];

  const runBenchmark = () => {
    const newSinglyTimes: number[] = [];
    const newDoublyTimes: number[] = [];
    const newSinglyCircularTimes: number[] = [];
    const newDoublyCircularTimes: number[] = [];

    sizes.forEach((size) => {
      let start: number, end: number;

      // Benchmark for Singly Linked List
      const singlyLinkedList = new SinglyLinkedList();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        singlyLinkedList.append(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newSinglyTimes.push(end - start);

      // Benchmark for Doubly Linked List
      const doublyLinkedList = new DoublyLinkedList();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        doublyLinkedList.append(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newDoublyTimes.push(end - start);

      // Benchmark for Singly Circular Linked List
      const singlyCircularLinkedList = new SinglyCircularLinkedList();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        singlyCircularLinkedList.append(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newSinglyCircularTimes.push(end - start);

      // Benchmark for Doubly Circular Linked List
      const doublyCircularLinkedList = new DoublyCircularLinkedList();
      start = performance.now();
      for (let i = 0; i < size; i++) {
        doublyCircularLinkedList.append(Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newDoublyCircularTimes.push(end - start);
    });

    setSinglyTimes(newSinglyTimes);
    setDoublyTimes(newDoublyTimes);
    setSinglyCircularTimes(newSinglyCircularTimes);
    setDoublyCircularTimes(newDoublyCircularTimes);
  };

  useEffect(() => {
    runBenchmark();
  }, []);

  const generateTimeChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Singly Linked List',
        data: singlyTimes,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Doubly Linked List',
        data: doublyTimes,
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Singly Circular Linked List',
        data: singlyCircularTimes,
        fill: false,
        backgroundColor: 'rgba(192,192,75,0.4)',
        borderColor: 'rgba(192,192,75,1)',
      },
      {
        label: 'Doubly Circular Linked List',
        data: doublyCircularTimes,
        fill: false,
        backgroundColor: 'rgba(75,192,75,0.4)',
        borderColor: 'rgba(75,192,75,1)',
      },
    ],
  });

  const generateSpaceChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Singly Linked List',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Doubly Linked List',
        data: sizes.map((size) => size * 2), // O(2n)
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Singly Circular Linked List',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(192,192,75,0.4)',
        borderColor: 'rgba(192,192,75,1)',
      },
      {
        label: 'Doubly Circular Linked List',
        data: sizes.map((size) => size * 2), // O(2n)
        fill: false,
        backgroundColor: 'rgba(75,192,75,0.4)',
        borderColor: 'rgba(75,192,75,1)',
      },
    ],
  });

  const runDemo = (listType: string) => {
    let output = '';
    switch (listType) {
      case 'singly':
        const singlyLinkedList = new SinglyLinkedList();
        for (let i = 0; i < 20; i++) {
          singlyLinkedList.append(Math.floor(Math.random() * 100));
        }
        output = singlyLinkedList.display();
        setSinglyResult(output);
        break;
      case 'doubly':
        const doublyLinkedList = new DoublyLinkedList();
        for (let i = 0; i < 20; i++) {
          doublyLinkedList.append(Math.floor(Math.random() * 100));
        }
        output = doublyLinkedList.display();
        setDoublyResult(output);
        break;
      case 'singlyCircular':
        const singlyCircularLinkedList = new SinglyCircularLinkedList();
        for (let i = 0; i < 20; i++) {
          singlyCircularLinkedList.append(Math.floor(Math.random() * 100));
        }
        output = singlyCircularLinkedList.display();
        setSinglyCircularResult(output);
        break;
      case 'doublyCircular':
        const doublyCircularLinkedList = new DoublyCircularLinkedList();
        for (let i = 0; i < 20; i++) {
          doublyCircularLinkedList.append(Math.floor(Math.random() * 100));
        }
        output = doublyCircularLinkedList.display();
        setDoublyCircularResult(output);
        break;
      default:
        break;
    }
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
        Linked Lists
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Singly Linked List</h2>
        <p>
          A Singly Linked List is a simple data structure where each node contains data and a reference to the next node in the sequence.
          This structure is ideal when you only need forward traversal of the list.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(n)<br />
          <strong>Worst Case:</strong> O(n)
        </p>

        <div className="relative">
          <CopyToClipboard text={singlyLinkedListCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {singlyLinkedListCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => runDemo('singly')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Singly Linked List
        </button>
        {singlyResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{singlyResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Doubly Linked List</h2>
        <p>
          A Doubly Linked List is a more complex structure where each node contains references to both the previous and next nodes.
          This allows for traversal in both directions, making it more versatile for certain algorithms.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(n)<br />
          <strong>Worst Case:</strong> O(n)
        </p>
        <div className="relative">
          <CopyToClipboard text={doublyLinkedListCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {doublyLinkedListCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => runDemo('doubly')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Doubly Linked List
        </button>
        {doublyResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{doublyResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Singly Circular Linked List</h2>
        <p>
          A Singly Circular Linked List is similar to a singly linked list, but with the last node pointing back to the first node, creating a loop.
          This is useful in scenarios where the list needs to be traversed in a circular manner, such as in round-robin scheduling.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(n)<br />
          <strong>Worst Case:</strong> O(n)
        </p>
        <div className="relative">
          <CopyToClipboard text={singlyCircularLinkedListCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {singlyCircularLinkedListCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => runDemo('singlyCircular')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Singly Circular Linked List
        </button>
        {singlyCircularResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{singlyCircularResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Doubly Circular Linked List</h2>
        <p>
          A Doubly Circular Linked List combines the features of a doubly linked list and a circular linked list. It allows traversal in both directions and ensures that the last node points back to the first.
          This structure is useful when you need to traverse data both forwards and backwards in a circular loop.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(n)<br />
          <strong>Worst Case:</strong> O(n)
        </p>
        <div className="relative">
          <CopyToClipboard text={doublyCircularLinkedListCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {doublyCircularLinkedListCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => runDemo('doublyCircular')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mt-4"
        >
          Run Doubly Circular Linked List
        </button>
        {doublyCircularResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{doublyCircularResult}</p>
          </div>
        )}
        <div className="block lg:hidden py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Linked Lists
          </motion.h1>

          <motion.section
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Time Complexity Comparison</h2>
            <div className="w-full max-w-full overflow-x-hidden">
              <Line
                data={generateTimeChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: {
                        maxTicksLimit: 5,
                        font: {
                          size: 10,
                        },
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        font: {
                          size: 10,
                        },
                      },
                    },
                  },
                  layout: {
                    padding: {
                      left: 10,
                      right: 10,
                      top: 10,
                      bottom: 10,
                    },
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        boxWidth: 10,
                      },
                    },
                  },
                }}
                height={250}
              />
            </div>
          </motion.section>

          <motion.section
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Space Complexity Comparison</h2>
            <div className="w-full max-w-full overflow-x-hidden">
              <Line
                data={generateSpaceChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: {
                        maxTicksLimit: 5,
                        font: {
                          size: 10,
                        },
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        font: {
                          size: 10,
                        },
                      },
                    },
                  },
                  layout: {
                    padding: {
                      left: 10,
                      right: 10,
                      top: 10,
                      bottom: 10,
                    },
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        boxWidth: 10,
                      },
                    },
                  },
                }}
                height={250}
              />
            </div>
          </motion.section>
        </div>

        <div className="hidden lg:block py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Linked Lists
          </motion.h1>

          <motion.section
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Time Complexity Comparison</h2>
            <div className="overflow-x-auto">
              <Line data={generateTimeChartData()} />
            </div>
          </motion.section>

          <motion.section
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Space Complexity Comparison</h2>
            <div className="overflow-x-auto">
              <Line data={generateSpaceChartData()} />
            </div>
          </motion.section>
        </div>

      </motion.section>
    </div>
  );
};

export default LinkedListsPage;
