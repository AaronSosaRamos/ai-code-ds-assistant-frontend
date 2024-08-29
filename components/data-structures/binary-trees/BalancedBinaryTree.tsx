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

class BalancedBinaryTree {
  root: Node | null = null;

  insert(data: number) {
    this.root = this._insert(this.root, data);
  }

  _insert(node: Node | null, data: number): Node {
    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this._insert(node.left, data);
    } else if (data > node.data) {
      node.right = this._insert(node.right, data);
    }

    const balance = this._getBalance(node);

    // Left heavy
    if (balance > 1 && data < node.left!.data) {
      return this._rotateRight(node);
    }

    // Right heavy
    if (balance < -1 && data > node.right!.data) {
      return this._rotateLeft(node);
    }

    // Left-Right case
    if (balance > 1 && data > node.left!.data) {
      node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }

    // Right-Left case
    if (balance < -1 && data < node.right!.data) {
      node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }

    return node;
  }

  _rotateLeft(node: Node): Node {
    const rightChild = node.right!;
    node.right = rightChild.left;
    rightChild.left = node;
    return rightChild;
  }

  _rotateRight(node: Node): Node {
    const leftChild = node.left!;
    node.left = leftChild.right;
    leftChild.right = node;
    return leftChild;
  }

  _getBalance(node: Node | null): number {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }

  _getHeight(node: Node | null): number {
    if (node === null) return 0;
    return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
  }

  inorder(node: Node | null): number[] {
    return node ? [...this.inorder(node.left), node.data, ...this.inorder(node.right)] : [];
  }

  displayTraversal(): string {
    return this.inorder(this.root).join(' -> ');
  }
}

export { BalancedBinaryTree };
