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

class CompleteBinaryTree {
  root: Node | null = null;

  insert(data: number) {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      const queue: Node[] = [this.root];
      while (queue.length) {
        const node = queue.shift()!;
        if (!node.left) {
          node.left = newNode;
          break;
        } else {
          queue.push(node.left);
        }
        if (!node.right) {
          node.right = newNode;
          break;
        } else {
          queue.push(node.right);
        }
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

export { CompleteBinaryTree };
