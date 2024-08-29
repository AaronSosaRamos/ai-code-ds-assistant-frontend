'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CompleteBinaryTree } from '@/components/data-structures/binary-trees/CompleteBinaryTree';
import { PerfectBinaryTree } from '@/components/data-structures/binary-trees/PerfectBinaryTree';
import { BalancedBinaryTree } from '@/components/data-structures/binary-trees/BalancedBinaryTree';

// Code strings for each tree type
const completeBinaryTreeCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class CompleteBinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = Node(data)
        if not self.root:
            self.root = new_node
        else:
            queue = [self.root]
            while queue:
                node = queue.pop(0)
                if not node.left:
                    node.left = new_node
                    break
                else:
                    queue.append(node.left)
                if not node.right:
                    node.right = new_node
                    break
                else:
                    queue.append(node.right)

    def inorder(self, node):
        result = []
        if node:
            result = self.inorder(node.left)
            result.append(node.data)
            result = result + self.inorder(node.right)
        return result

    def display_traversal(self):
        return ' -> '.join(map(str, self.inorder(self.root)))

# Example Usage
cbt = CompleteBinaryTree()
for i in range(1, 8):
    cbt.insert(i)
print(cbt.display_traversal())
`;

const perfectBinaryTreeCode = `
class Node:
    def __init__(self, data: int):
        self.data = data
        self.left: Node | None = None
        self.right: Node | None = None

class PerfectBinaryTree:
    def __init__(self):
        self.root: Node | None = None

    def insert_level_order(self, arr: list[int], i: int = 0) -> Node | None:
        if i >= len(arr):
            return None

        node = Node(arr[i])
        node.left = self.insert_level_order(arr, 2 * i + 1)
        node.right = self.insert_level_order(arr, 2 * i + 2)

        return node

    def build_tree(self, arr: list[int]) -> None:
        self.root = self.insert_level_order(arr)

    def inorder(self, node: Node | None) -> list[int]:
        if not node:
            return []
        left_traversal = self.inorder(node.left)
        right_traversal = self.inorder(node.right)
        return left_traversal + [node.data] + right_traversal

    def display_traversal(self) -> str:
        if not self.root:
            return 'Tree is empty'
        return ' -> '.join(map(str, self.inorder(self.root)))

if __name__ == "__main__":
    tree = PerfectBinaryTree()
    tree.build_tree([1, 2, 3, 4, 5, 6, 7])
    print(tree.display_traversal())  # Output: 4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7
`;

const balancedBinaryTreeCode = `
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BalancedBinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        self.root = self._insert(self.root, data)

    def _insert(self, node, data):
        if node is None:
            return Node(data)
        if data < node.data:
            node.left = self._insert(node.left, data)
        else:
            node.right = self._insert(node.right, data)
        return node

    def inorder(self, node):
        result = []
        if node:
            result = self.inorder(node.left)
            result.append(node.data)
            result = result + self.inorder(node.right)
        return result

    def display_traversal(self):
        return ' -> '.join(map(str, self.inorder(self.root)))

# Example Usage
bbt = BalancedBinaryTree()
for num in [30, 20, 40, 10, 25, 35, 50]:
    bbt.insert(num)
print(bbt.display_traversal())
`;

const BinaryTreeTypesPage: React.FC = () => {
    const [completeResult, setCompleteResult] = useState<string | null>(null);
    const [perfectResult, setPerfectResult] = useState<string | null>(null);
    const [balancedResult, setBalancedResult] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const runCompleteBinaryTreeDemo = () => {
        const tree = new CompleteBinaryTree();
        for (let i = 0; i < 7; i++) {
            tree.insert(i + 1);
        }
        setCompleteResult(tree.displayTraversal());
    };

    const runPerfectBinaryTreeDemo = () => {
        const tree = new PerfectBinaryTree();
        tree.buildTree([1, 2, 3, 4, 5, 6, 7]);
        setPerfectResult(tree.displayTraversal());
    };

    const runBalancedBinaryTreeDemo = () => {
        const tree = new BalancedBinaryTree();
        [30, 20, 40, 10, 25, 35, 50].forEach((num) => tree.insert(num));
        setBalancedResult(tree.displayTraversal());
    };

    return (
        <div className="py-10 px-6 sm:px-8 lg:px-10">
            <motion.h1
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Types of Binary Tree Based on the Completion of Levels
            </motion.h1>

            {/* Complete Binary Tree */}
            <motion.section
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Complete Binary Tree</h2>
                <p>
                    A Complete Binary Tree is a binary tree where all levels, except possibly the last, are completely filled, and all nodes are as far left as possible.
                </p>
                <div className="relative">
                    <CopyToClipboard text={completeBinaryTreeCode} onCopy={handleCopy}>
                        <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
                            {copied ? <FiCheck /> : <FiClipboard />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </CopyToClipboard>

                    <SyntaxHighlighter language="python" style={dracula}>
                        {completeBinaryTreeCode}
                    </SyntaxHighlighter>
                </div>
                <button
                    onClick={runCompleteBinaryTreeDemo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
                >
                    Run Complete Binary Tree
                </button>
                {completeResult && (
                    <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
                        <h3 className="font-semibold mb-2">Output:</h3>
                        <p>{completeResult}</p>
                    </div>
                )}
            </motion.section>

            {/* Perfect Binary Tree */}
            <motion.section
                className="mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Perfect Binary Tree</h2>
                <p>
                    A Perfect Binary Tree is a binary tree where all the internal nodes have two children, and all leaves are at the same level.
                </p>
                <div className="relative">
                    <CopyToClipboard text={perfectBinaryTreeCode} onCopy={handleCopy}>
                        <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
                            {copied ? <FiCheck /> : <FiClipboard />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </CopyToClipboard>

                    <SyntaxHighlighter language="python" style={dracula}>
                        {perfectBinaryTreeCode}
                    </SyntaxHighlighter>
                </div>
                <button
                    onClick={runPerfectBinaryTreeDemo}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
                >
                    Run Perfect Binary Tree
                </button>
                {perfectResult && (
                    <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
                        <h3 className="font-semibold mb-2">Output:</h3>
                        <p>{perfectResult}</p>
                    </div>
                )}
            </motion.section>

            {/* Balanced Binary Tree */}
            <motion.section
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Balanced Binary Tree</h2>
                <p>
                    A Balanced Binary Tree is a binary tree in which the height of the left and right subtrees of any node differ by at most one.
                </p>
                <div className="relative">
                    <CopyToClipboard text={balancedBinaryTreeCode} onCopy={handleCopy}>
                        <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
                            {copied ? <FiCheck /> : <FiClipboard />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </CopyToClipboard>

                    <SyntaxHighlighter language="python" style={dracula}>
                        {balancedBinaryTreeCode}
                    </SyntaxHighlighter>
                </div>
                <button
                    onClick={runBalancedBinaryTreeDemo}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
                >
                    Run Balanced Binary Tree
                </button>
                {balancedResult && (
                    <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
                        <h3 className="font-semibold mb-2">Output:</h3>
                        <p>{balancedResult}</p>
                    </div>
                )}
            </motion.section>
        </div>
    );
};

export default BinaryTreeTypesPage;
