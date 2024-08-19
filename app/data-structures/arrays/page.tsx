'use client';

import React, { useState, useEffect } from 'react';
import { CustomArray } from './components/Array';
import { CustomMatrix } from './components/Matrix';
import { CustomTensor } from './components/Tensor';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';

const arrayCode = `
class Array:
    def __init__(self, size):
        self.items = [random.randint(0, 100) for _ in range(size)]

    def get(self, index):
        return self.items[index]

    def set(self, index, value):
        self.items[index] = value

    def display(self):
        return ' -> '.join(map(str, self.items))

# Example Usage
arr = Array(10)
arr.display()
`;

const matrixCode = `
class Matrix:
    def __init__(self, rows, cols):
        self.items = [[random.randint(0, 100) for _ in range(cols)] for _ in range(rows)]

    def get(self, row, col):
        return self.items[row][col]

    def set(self, row, col, value):
        self.items[row][col] = value

    def display(self):
        return '\\n'.join([' -> '.join(map(str, row)) for row in self.items])

# Example Usage
matrix = Matrix(3, 3)
matrix.display()
`;

const tensorCode = `
class Tensor:
    def __init__(self, dim1, dim2, dim3):
        self.items = [[[random.randint(0, 100) for _ in range(dim3)] for _ in range(dim2)] for _ in range(dim1)]

    def get(self, dim1, dim2, dim3):
        return self.items[dim1][dim2][dim3]

    def set(self, dim1, dim2, dim3, value):
        self.items[dim1][dim2][dim3] = value

    def display(self):
        return '\\n\\n'.join(['\\n'.join([' -> '.join(map(str, row)) for row in matrix]) for matrix in self.items])

# Example Usage
tensor = Tensor(2, 2, 2)
tensor.display()
`;

const ArraysPage: React.FC = () => {
  const [arrayResult, setArrayResult] = useState<string | null>(null);
  const [matrixResult, setMatrixResult] = useState<string | null>(null);
  const [tensorResult, setTensorResult] = useState<string | null>(null);

  const [arrayTimes, setArrayTimes] = useState<number[]>([]);
  const [matrixTimes, setMatrixTimes] = useState<number[]>([]);
  const [tensorTimes, setTensorTimes] = useState<number[]>([]);

  const sizes = [10, 20, 50];

  const runBenchmark = () => {
    const newArrayTimes: number[] = [];
    const newMatrixTimes: number[] = [];
    const newTensorTimes: number[] = [];

    sizes.forEach((size) => {
      let start: number, end: number;

      // Benchmark for Array
      const array = new CustomArray(size);
      start = performance.now();
      for (let i = 0; i < size; i++) {
        array.set(i, Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newArrayTimes.push(end - start);

      // Benchmark for Matrix
      const matrix = new CustomMatrix(size, size);
      start = performance.now();
      for (let i = 0; i < size; i++) {
        matrix.set(i, i, Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newMatrixTimes.push(end - start);

      // Benchmark for Tensor
      const tensor = new CustomTensor(size, size, size);
      start = performance.now();
      for (let i = 0; i < size; i++) {
        tensor.set(i, i, i, Math.floor(Math.random() * 100));
      }
      end = performance.now();
      newTensorTimes.push(end - start);
    });

    setArrayTimes(newArrayTimes);
    setMatrixTimes(newMatrixTimes);
    setTensorTimes(newTensorTimes);
  };

  useEffect(() => {
    runBenchmark();
  }, []);

  const generateTimeChartData = () => ({
    labels: sizes,
    datasets: [
      {
        label: 'Array',
        data: arrayTimes,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Matrix',
        data: matrixTimes,
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Tensor',
        data: tensorTimes,
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
        label: 'Array',
        data: sizes.map((size) => size), // O(n)
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Matrix',
        data: sizes.map((size) => size * size), // O(n^2)
        fill: false,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
      },
      {
        label: 'Tensor',
        data: sizes.map((size) => size * size * size), // O(n^3)
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

  const runArrayDemo = () => {
    const array = new CustomArray(10);
    setArrayResult(array.display());
  };

  const runMatrixDemo = () => {
    const matrix = new CustomMatrix(3, 3);
    setMatrixResult(matrix.display());
  };

  const runTensorDemo = () => {
    const tensor = new CustomTensor(2, 2, 2);
    setTensorResult(tensor.display());
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Arrays, Matrices, and Tensors
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Array</h2>
        <p>
          An array is a simple data structure that consists of a collection of elements, each identified by an index or a key.
          It is a fundamental structure used to store multiple items of the same type together.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(1) for access and update<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={arrayCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {arrayCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runArrayDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Array
        </button>
        {arrayResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{arrayResult}</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Matrix</h2>
        <p>
          A matrix is a two-dimensional array. It consists of rows and columns, allowing for the storage of data in a grid format.
          Matrices are widely used in mathematics, physics, and engineering.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n²)<br />
          <strong>Time Complexity:</strong> O(1) for access and update<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={matrixCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {matrixCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runMatrixDemo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Matrix
        </button>
        {matrixResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{matrixResult}</code>
            </pre>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Tensor</h2>
        <p>
          A tensor is a multi-dimensional array. It generalizes the concept of matrices to higher dimensions.
          Tensors are essential in fields such as physics, computer graphics, and machine learning.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n³)<br />
          <strong>Time Complexity:</strong> O(1) for access and update<br />
          <strong>Best Case:</strong> Ω(1)<br />
          <strong>Average Case:</strong> Θ(1)<br />
          <strong>Worst Case:</strong> O(1)
        </p>
        <div className="relative">
          <CopyToClipboard text={tensorCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {tensorCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runTensorDemo}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Tensor
        </button>
        {tensorResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{tensorResult}</code>
            </pre>
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

export default ArraysPage;
