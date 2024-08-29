'use client';

import React from 'react';

class UnweightedGraph {
  adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: string, vertex2: string): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1)!.push(vertex2);
    this.adjacencyList.get(vertex2)!.push(vertex1);
  }

  removeEdge(vertex1: string, vertex2: string): void {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList.get(vertex1)?.filter((v) => v !== vertex2) || []
      );
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList.get(vertex2)?.filter((v) => v !== vertex1) || []
      );
    }
  }

  removeVertex(vertex: string): void {
    if (this.adjacencyList.has(vertex)) {
      const neighbors = this.adjacencyList.get(vertex);
      if (neighbors) {
        for (let i = 0; i < neighbors.length; i++) {
          this.removeEdge(vertex, neighbors[i]);
        }
      }
      this.adjacencyList.delete(vertex);
    }
  }

  display(): string {
    let result = '';
    this.adjacencyList.forEach((neighbors, vertex) => {
      result += `${vertex} -> ${neighbors.join(', ')}\n`;
    });
    return result.trim();
  }
}

export { UnweightedGraph };
