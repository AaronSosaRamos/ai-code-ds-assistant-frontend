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

class DegenerateBinaryTree {
  root: Node | null = null;

  insert(data: number) {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      let current = this.root;
      while (current.right) {
        current = current.right;
      }
      current.right = newNode;
    }
  }

  inorder(node: Node | null): number[] {
    return node ? [...this.inorder(node.left), node.data, ...this.inorder(node.right)] : [];
  }

  displayTraversal(): string {
    return this.inorder(this.root).join(' -> ');
  }
}

export { DegenerateBinaryTree };
