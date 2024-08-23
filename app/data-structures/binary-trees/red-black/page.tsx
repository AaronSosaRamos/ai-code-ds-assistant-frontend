'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { RedBlackTree } from '@/components/data-structures/binary-trees/RedBlackTree';

const redBlackTreeCode = `
class Color:
    RED = 0
    BLACK = 1

class Node:
    def __init__(self, data):
        self.data = data
        self.color = Color.RED
        self.left = None
        self.right = None
        self.parent = None

class RedBlackTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = Node(data)
        if not self.root:
            self.root = new_node
            self.root.color = Color.BLACK
        else:
            self._insert(self.root, new_node)
            self._fix_violation(new_node)

    def _insert(self, root, node):
        if not root:
            return node

        if node.data < root.data:
            root.left = self._insert(root.left, node)
            root.left.parent = root
        elif node.data > root.data:
            root.right = self._insert(root.right, node)
            root.right.parent = root

        return root

    def _rotate_left(self, node):
        temp_right = node.right
        node.right = temp_right.left
        if node.right:
            node.right.parent = node

        temp_right.parent = node.parent
        if not node.parent:
            self.root = temp_right
        elif node == node.parent.left:
            node.parent.left = temp_right
        else:
            node.parent.right = temp_right

        temp_right.left = node
        node.parent = temp_right

    def _rotate_right(self, node):
        temp_left = node.left
        node.left = temp_left.right
        if node.left:
            node.left.parent = node

        temp_left.parent = node.parent
        if not node.parent:
            self.root = temp_left
        elif node == node.parent.left:
            node.parent.left = temp_left
        else:
            node.parent.right = temp_left

        temp_left.right = node
        node.parent = temp_left

    def _fix_violation(self, node):
        while node != self.root and node.parent and node.parent.color == Color.RED:
            if node.parent.parent:
                if node.parent == node.parent.parent.left:
                    uncle = node.parent.parent.right
                    if uncle and uncle.color == Color.RED:
                        node.parent.color = Color.BLACK
                        uncle.color = Color.BLACK
                        node.parent.parent.color = Color.RED
                        node = node.parent.parent
                    else:
                        if node == node.parent.right:
                            node = node.parent
                            self._rotate_left(node)
                        node.parent.color = Color.BLACK
                        if node.parent.parent:
                            node.parent.parent.color = Color.RED
                            self._rotate_right(node.parent.parent)
                else:
                    uncle = node.parent.parent.left
                    if uncle and uncle.color == Color.RED:
                        node.parent.color = Color.BLACK
                        uncle.color = Color.BLACK
                        node.parent.parent.color = Color.RED
                        node = node.parent.parent
                    else:
                        if node == node.parent.left:
                            node = node.parent
                            self._rotate_right(node)
                        node.parent.color = Color.BLACK
                        if node.parent.parent:
                            node.parent.parent.color = Color.RED
                            self._rotate_left(node.parent.parent)
        if self.root:
            self.root.color = Color.BLACK

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

    def display_traversal(self, traversal_type):
        if traversal_type == 'inorder':
            return ' -> '.join(map(str, self.inorder(self.root)))
        elif traversal_type == 'preorder':
            return ' -> '.join(map(str, self.preorder(self.root)))
        elif traversal_type == 'postorder':
            return ' -> '.join(map(str, self.postorder(self.root)))

# Example Usage
rb_tree = RedBlackTree()
for i in range(20):
    rb_tree.insert(random.randint(0, 100))

print("Inorder:", rb_tree.display_traversal('inorder'))
print("Preorder:", rb_tree.display_traversal('preorder'))
print("Postorder:", rb_tree.display_traversal('postorder'))
`;

const RedBlackTreePage: React.FC = () => {
    const [rbTreeResult, setRbTreeResult] = useState<string | null>(null);
    const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const runRedBlackTreeDemo = () => {
        const rbTree = new RedBlackTree();
        for (let i = 0; i < 20; i++) {
            rbTree.insert(Math.floor(Math.random() * 100));
        }
        setRbTreeResult(rbTree.displayTraversal(traversalType));
    };

    return (
        <div className="py-10 px-6 sm:px-8 lg:px-10">
            <motion.h1
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Red-Black Tree
            </motion.h1>

            <motion.section
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Red-Black Tree</h2>
                <p>
                    A Red-Black Tree is a self-balancing binary search tree where each node has an extra bit for denoting the color of the node, either red or black.
                    The tree is balanced through rotations and color changes during insertion and deletion operations.
                </p>
                <p className="mt-2">
                    <strong>Space Complexity:</strong> O(n)<br />
                    <strong>Time Complexity:</strong> O(log n) for search, insert, and delete operations<br />
                    <strong>Best Case:</strong> Ω(log n)<br />
                    <strong>Average Case:</strong> Θ(log n)<br />
                    <strong>Worst Case:</strong> O(log n)
                </p>
                <div className="relative">
                    <CopyToClipboard text={redBlackTreeCode} onCopy={handleCopy}>
                        <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
                            {copied ? <FiCheck /> : <FiClipboard />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </CopyToClipboard>

                    <SyntaxHighlighter language="python" style={dracula}>
                        {redBlackTreeCode}
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
                    onClick={runRedBlackTreeDemo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
                >
                    Run Red-Black Tree
                </button>
                {rbTreeResult && (
                    <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
                        <h3 className="font-semibold mb-2">Output ({traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal):</h3>
                        <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
                            <code>{rbTreeResult}</code>
                        </pre>
                    </div>
                )}
            </motion.section>
        </div>
    );
};

export default RedBlackTreePage;
