'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { BinarySearchTree } from '../../../../components/data-structures/binary-trees/BinarySearchTree';

const bstCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            self._insert(self.root, data)

    def _insert(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = Node(data)
            else:
                self._insert(node.left, data)
        else:
            if node.right is None:
                node.right = Node(data)
            else:
                self._insert(node.right, data)

    def inorder(self, node):
        result = []
        if node:
            result = self.inorder(node.left)
            result.append(node.data)
            result = result + self.inorder(node.right)
        return result

    def preorder(self, node):
        result = []
        if node:
            result.append(node.data)
            result = result + self.preorder(node.left)
            result = result + self.preorder(node.right)
        return result

    def postorder(self, node):
        result = []
        if node:
            result = self.postorder(node.left)
            result = result + self.postorder(node.right)
            result.append(node.data)
        return result

    def displayTraversal(self, traversal_type):
        if traversal_type == 'inorder':
            return ' -> '.join(map(str, self.inorder(self.root)))
        elif traversal_type == 'preorder':
            return ' -> '.join(map(str, self.preorder(self.root)))
        elif traversal_type == 'postorder':
            return ' -> '.join(map(str, self.postorder(self.root)))

# Example Usage
bst = BinarySearchTree()
for i in range(20):
    bst.insert(random.randint(0, 100))

print("Inorder:", bst.displayTraversal('inorder'))
print("Preorder:", bst.displayTraversal('preorder'))
print("Postorder:", bst.displayTraversal('postorder'))
`;

const BinarySearchTreePage: React.FC = () => {
  const [bstResult, setBstResult] = useState<string | null>(null);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const runBstDemo = () => {
    const bst = new BinarySearchTree();
    for (let i = 0; i < 20; i++) {
      bst.insert(Math.floor(Math.random() * 100));
    }
    setBstResult(bst.displayTraversal(traversalType));
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Binary Search Tree (BST)
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Binary Search Tree (BST)</h2>
        <p>
          A Binary Search Tree (BST) is a tree data structure where each node has at most two children, referred to as the left and right child.
          The left child contains only nodes with values less than the parent node, and the right child contains only nodes with values greater than the parent node.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(log n) for search, insert, and delete operations<br />
          <strong>Best Case:</strong> Ω(log n)<br />
          <strong>Average Case:</strong> Θ(log n)<br />
          <strong>Worst Case:</strong> O(n) (for a degenerate tree)
        </p>
        <div className="relative">
          <CopyToClipboard text={bstCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {bstCode}
          </SyntaxHighlighter>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setTraversalType('inorder')}
            className={`px-4 py-2 rounded ${traversalType === 'inorder' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-600 transition duration-300`}
          >
            Inorder
          </button>
          <button
            onClick={() => setTraversalType('preorder')}
            className={`px-4 py-2 rounded ${traversalType === 'preorder' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-green-600 transition duration-300`}
          >
            Preorder
          </button>
          <button
            onClick={() => setTraversalType('postorder')}
            className={`px-4 py-2 rounded ${traversalType === 'postorder' ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-purple-600 transition duration-300`}
          >
            Postorder
          </button>
        </div>
        <button
          onClick={runBstDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run BST
        </button>
        {bstResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output ({traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal):</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{bstResult}</code>
            </pre>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default BinarySearchTreePage;
