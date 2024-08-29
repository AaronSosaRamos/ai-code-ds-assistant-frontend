'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FullBinaryTree } from '@/components/data-structures/binary-trees/FullBinaryTree';
import { DegenerateBinaryTree } from '@/components/data-structures/binary-trees/DegenerateBinaryTree';
import { SkewedBinaryTree } from '@/components/data-structures/binary-trees/SkewedBinaryTree';

const fullBinaryTreeCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class FullBinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            queue = [self.root]
            while queue:
                node = queue.pop(0)
                if node.left is None:
                    node.left = Node(data)
                    break
                else:
                    queue.append(node.left)
                if node.right is None:
                    node.right = Node(data)
                    break
                else:
                    queue.append(node.right)

    def inorder(self, node):
        if node:
            return self.inorder(node.left) + [node.data] + self.inorder(node.right)
        else:
            return []

# Example Usage
tree = FullBinaryTree()
for i in range(7):
    tree.insert(i + 1)
print("Inorder:", tree.inorder(tree.root))
`;

const degenerateTreeCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class DegenerateBinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            current = self.root
            while current.right is not None:
                current = current.right
            current.right = Node(data)

    def inorder(self, node):
        if node:
            return self.inorder(node.left) + [node.data] + self.inorder(node.right)
        else:
            return []

# Example Usage
tree = DegenerateBinaryTree()
for i in range(7):
    tree.insert(i + 1)
print("Inorder:", tree.inorder(tree.root))
`;

const skewedTreeCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class SkewedBinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data, skew='right'):
        if self.root is None:
            self.root = Node(data)
        else:
            current = self.root
            if skew == 'right':
                while current.right is not None:
                    current = current.right
                current.right = Node(data)
            elif skew == 'left':
                while current.left is not None:
                    current = current.left
                current.left = Node(data)

    def inorder(self, node):
        if node:
            return self.inorder(node.left) + [node.data] + self.inorder(node.right)
        else:
            return []

# Example Usage
tree = SkewedBinaryTree()
for i in range(7):
    tree.insert(i + 1, skew='right')
print("Inorder:", tree.inorder(tree.root))
`;

const BinaryTreeTypesChildrenPage: React.FC = () => {
  const [fullTreeResult, setFullTreeResult] = useState<string | null>(null);
  const [degenerateTreeResult, setDegenerateTreeResult] = useState<string | null>(null);
  const [skewedTreeResult, setSkewedTreeResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const runFullTreeDemo = () => {
    const tree = new FullBinaryTree();
    for (let i = 0; i < 7; i++) {
      tree.insert(i + 1);
    }
    setFullTreeResult(tree.inorder(tree.root).join(' -> '));
  };

  const runDegenerateTreeDemo = () => {
    const tree = new DegenerateBinaryTree();
    for (let i = 0; i < 7; i++) {
      tree.insert(i + 1);
    }
    setDegenerateTreeResult(tree.inorder(tree.root).join(' -> '));
  };

  const runSkewedTreeDemo = () => {
    const tree = new SkewedBinaryTree();
    for (let i = 0; i < 7; i++) {
      tree.insert(i + 1, 'right');
    }
    setSkewedTreeResult(tree.inorder(tree.root).join(' -> '));
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Types of Binary Trees Based on the Number of Children
      </motion.h1>

      {/* Full Binary Tree */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Full Binary Tree</h2>
        <p>
          A Full Binary Tree is a binary tree in which every node other than the leaves has two children. 
          These trees are balanced, and they have a fixed structure, which makes them easier to manage and traverse.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
        </p>
        <div className="relative">
          <CopyToClipboard text={fullBinaryTreeCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {fullBinaryTreeCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runFullTreeDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Full Binary Tree
        </button>
        {fullTreeResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output (Inorder Traversal):</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{fullTreeResult}</code>
            </pre>
          </div>
        )}
      </motion.section>

      {/* Degenerate Binary Tree */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Degenerate Binary Tree</h2>
        <p>
          A Degenerate Binary Tree is a tree where each parent node has only one child, resembling a linked list. 
          It is a pathological case where the performance of the tree operations degrades to that of a linear structure.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
        </p>
        <div className="relative">
          <CopyToClipboard text={degenerateTreeCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {degenerateTreeCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runDegenerateTreeDemo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Degenerate Binary Tree
        </button>
        {degenerateTreeResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output (Inorder Traversal):</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{degenerateTreeResult}</code>
            </pre>
          </div>
        )}
      </motion.section>

      {/* Skewed Binary Tree */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Skewed Binary Tree</h2>
        <p>
          A Skewed Binary Tree is a binary tree where all the nodes are either on the left side or the right side. 
          It can be either left-skewed or right-skewed based on the side where the nodes are added.
        </p>
        <p className="mt-2">
          <strong>Space Complexity:</strong> O(n)<br />
          <strong>Time Complexity:</strong> O(n) for traversal<br />
        </p>
        <div className="relative">
          <CopyToClipboard text={skewedTreeCode} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="python" style={dracula}>
            {skewedTreeCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runSkewedTreeDemo}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Skewed Binary Tree
        </button>
        {skewedTreeResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output (Inorder Traversal):</h3>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{skewedTreeResult}</code>
            </pre>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default BinaryTreeTypesChildrenPage;
