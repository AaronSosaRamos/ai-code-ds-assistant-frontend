'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AVLTree } from '@/components/data-structures/binary-trees/AVLTree';

const avlCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.height = 1
        self.left = None
        self.right = None

class AVLTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        self.root = self._insert(self.root, data)

    def _insert(self, node, data):
        if not node:
            return Node(data)
        elif data < node.data:
            node.left = self._insert(node.left, data)
        else:
            node.right = self._insert(node.right, data)

        node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))

        balance = self._get_balance(node)

        # Left Left
        if balance > 1 and data < node.left.data:
            return self._right_rotate(node)

        # Right Right
        if balance < -1 and data > node.right.data:
            return self._left_rotate(node)

        # Left Right
        if balance > 1 and data > node.left.data:
            node.left = self._left_rotate(node.left)
            return self._right_rotate(node)

        # Right Left
        if balance < -1 and data < node.right.data:
            node.right = self._right_rotate(node.right)
            return self._left_rotate(node)

        return node

    def _get_height(self, node):
        if not node:
            return 0
        return node.height

    def _get_balance(self, node):
        if not node:
            return 0
        return self._get_height(node.left) - self._get_height(node.right)

    def _right_rotate(self, z):
        y = z.left
        T3 = y.right

        y.right = z
        z.left = T3

        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

    def _left_rotate(self, z):
        y = z.right
        T2 = y.left

        y.left = z
        z.right = T2

        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

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
avl = AVLTree()
for i in range(20):
    avl.insert(random.randint(0, 100))

print("Inorder:", avl.displayTraversal('inorder'))
print("Preorder:", avl.displayTraversal('preorder'))
print("Postorder:", avl.displayTraversal('postorder'))
`;

const AVLTreePage: React.FC = () => {
  const [avlResult, setAvlResult] = useState<string | null>(null);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const runAvlDemo = () => {
    const avl = new AVLTree();
    for (let i = 0; i < 20; i++) {
      avl.insert(Math.floor(Math.random() * 100));
    }
    setAvlResult(avl.displayTraversal(traversalType));
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AVL Tree
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">AVL Tree</h2>
        <p>
          An AVL Tree is a self-balancing binary search tree where the height of the left and right subtrees of any node differ by no more than one. If they differ, the tree is rebalanced using rotations.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(log n) for search, insert, and delete operations<br />
          <strong>Best Case:</strong> Ω(log n)<br />
          <strong>Average Case:</strong> Θ(log n)<br />
          <strong>Worst Case:</strong> O(log n)
        </p>
        <div className="relative">
          <CopyToClipboard text={avlCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {avlCode}
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
          onClick={runAvlDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run AVL Tree
        </button>
        {avlResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output ({traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal):</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{avlResult}</code>
            </pre>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default AVLTreePage;
