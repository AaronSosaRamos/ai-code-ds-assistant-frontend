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

class PerfectBinaryTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    // Método para insertar elementos en el árbol de manera recursiva
    insertLevelOrder(arr: number[], i: number = 0): Node | null {
        if (i >= arr.length) return null;

        const node = new Node(arr[i]);
        node.left = this.insertLevelOrder(arr, 2 * i + 1);
        node.right = this.insertLevelOrder(arr, 2 * i + 2);

        return node;
    }

    // Método para iniciar la construcción del árbol a partir de un array
    buildTree(arr: number[]): void {
        this.root = this.insertLevelOrder(arr);
    }

    // Método para el recorrido inorder del árbol
    inorder(node: Node | null): number[] {
        if (!node) return [];
        const leftTraversal = this.inorder(node.left);
        const rightTraversal = this.inorder(node.right);
        return [...leftTraversal, node.data, ...rightTraversal];
    }

    // Método para mostrar el recorrido inorder como una cadena
    displayTraversal(): string {
        if (!this.root) return 'Tree is empty';
        return this.inorder(this.root).join(' -> ');
    }
}

export { PerfectBinaryTree };
