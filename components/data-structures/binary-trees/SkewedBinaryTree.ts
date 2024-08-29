'use client';

import React from 'react';

class Node {
  data: number;
  left: Node | null = null;
  right: Node | null = null;

  constructor(data: number) {
    this.data = data;
  }
}

class SkewedBinaryTree {
  root: Node | null = null;

  insert(data: number, skew: 'left' | 'right' = 'right') {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      let current = this.root;
      if (skew === 'right') {
        while (current.right) {
          current = current.right;
        }
        current.right = newNode;
      } else if (skew === 'left') {
        while (current.left) {
          current = current.left;
        }
        current.left = newNode;
      }
    }
  }

  inorder(node: Node | null): number[] {
    return node ? [...this.inorder(node.left), node.data, ...this.inorder(node.right)] : [];
  }

  displayTraversal(): string {
    return this.inorder(this.root).join(' -> ');
  }
}

export { SkewedBinaryTree };
