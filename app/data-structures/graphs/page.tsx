'use client';

import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiClipboard, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AcyclicGraph } from '@/components/data-structures/graphs/AcyclicGraph';
import { CyclicGraph } from '@/components/data-structures/graphs/CyclicGraph';
import { DirectedGraph } from '@/components/data-structures/graphs/DirectedGraph';
import { DirectedWeightedGraph } from '@/components/data-structures/graphs/DirectedWeightedGraph';
import { UndirectedGraph } from '@/components/data-structures/graphs/UndirectedGraph';
import { UndirectedWeightedGraph } from '@/components/data-structures/graphs/UndirectedWeightedGraph';
import { UnweightedGraph } from '@/components/data-structures/graphs/UnweightedGraph';
import { WeightedGraph } from '@/components/data-structures/graphs/WeightedGraph';

const acyclicGraphCode = `
class AcyclicGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append(vertex2)

    def is_acyclic(self):
        visited = set()
        stack = set()

        def dfs(vertex):
            visited.add(vertex)
            stack.add(vertex)

            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    if not dfs(neighbor):
                        return False
                elif neighbor in stack:
                    return False

            stack.remove(vertex)
            return True

        for vertex in self.adjacency_list:
            if vertex not in visited:
                if not dfs(vertex):
                    return False
        return True

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = AcyclicGraph()
graph.add_edge('A', 'B')
graph.add_edge('B', 'C')
graph.add_edge('A', 'C')
print(graph.display())
print("Is Acyclic:", graph.is_acyclic())
`;

const cyclicGraphCode = `
class CyclicGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append(vertex2)
        self.adjacency_list[vertex2].append(vertex1)

    def is_cyclic(self):
        visited = set()

        def dfs(vertex, parent):
            visited.add(vertex)

            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    if dfs(neighbor, vertex):
                        return True
                elif parent != neighbor:
                    return True
            return False

        for vertex in self.adjacency_list:
            if vertex not in visited:
                if dfs(vertex, None):
                    return True
        return False

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = CyclicGraph()
graph.add_edge('A', 'B')
graph.add_edge('B', 'C')
graph.add_edge('C', 'A')
print(graph.display())
print("Is Cyclic:", graph.is_cyclic())
`;

const directedGraphCode = `
class DirectedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, start_vertex, end_vertex):
        self.add_vertex(start_vertex)
        self.add_vertex(end_vertex)
        self.adjacency_list[start_vertex].append(end_vertex)

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = DirectedGraph()
graph.add_edge('A', 'B')
graph.add_edge('B', 'C')
print(graph.display())
`;

const directedWeightedGraphCode = `
class DirectedWeightedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, start_vertex, end_vertex, weight):
        self.add_vertex(start_vertex)
        self.add_vertex(end_vertex)
        self.adjacency_list[start_vertex].append((end_vertex, weight))

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(f'{neighbor}({weight})' for neighbor, weight in neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = DirectedWeightedGraph()
graph.add_edge('A', 'B', 5)
graph.add_edge('B', 'C', 3)
print(graph.display())
`;

const undirectedGraphCode = `
class UndirectedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append(vertex2)
        self.adjacency_list[vertex2].append(vertex1)

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = UndirectedGraph()
graph.add_edge('A', 'B')
graph.add_edge('B', 'C')
print(graph.display())
`;

const undirectedWeightedGraphCode = `
class UndirectedWeightedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2, weight):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append((vertex2, weight))
        self.adjacency_list[vertex2].append((vertex1, weight))

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(f'{neighbor}({weight})' for neighbor, weight in neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = UndirectedWeightedGraph()
graph.add_edge('A', 'B', 5)
graph.add_edge('B', 'C', 3)
print(graph.display())
`;

const unweightedGraphCode = `
class UnweightedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append(vertex2)
        self.adjacency_list[vertex2].append(vertex1)

    def remove_edge(self, vertex1, vertex2):
        if vertex1 in self.adjacency_list and vertex2 in self.adjacency_list:
            self.adjacency_list[vertex1].remove(vertex2)
            self.adjacency_list[vertex2].remove(vertex1)

    def remove_vertex(self, vertex):
        if vertex in self.adjacency_list:
            for neighbor in list(self.adjacency_list[vertex]):
                self.remove_edge(vertex, neighbor)
            del self.adjacency_list[vertex]

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = UnweightedGraph()
graph.add_edge('A', 'B')
graph.add_edge('B', 'C')
print(graph.display())
`;

const weightedGraphCode = `
class WeightedGraph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2, weight):
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        self.adjacency_list[vertex1].append((vertex2, weight))
        self.adjacency_list[vertex2].append((vertex1, weight))

    def display(self):
        return '\\n'.join(f"{vertex} -> {', '.join(f'{neighbor}({weight})' for neighbor, weight in neighbors)}" for vertex, neighbors in self.adjacency_list.items())

# Example Usage
graph = WeightedGraph()
graph.add_edge('A', 'B', 5)
graph.add_edge('B', 'C', 3)
print(graph.display())
`;

const GraphsPage: React.FC = () => {
  const [acyclicGraphResult, setAcyclicGraphResult] = useState<string | null>(null);
  const [cyclicGraphResult, setCyclicGraphResult] = useState<string | null>(null);
  const [directedGraphResult, setDirectedGraphResult] = useState<string | null>(null);
  const [directedWeightedGraphResult, setDirectedWeightedGraphResult] = useState<string | null>(null);
  const [undirectedGraphResult, setUndirectedGraphResult] = useState<string | null>(null);
  const [undirectedWeightedGraphResult, setUndirectedWeightedGraphResult] = useState<string | null>(null);
  const [unweightedGraphResult, setUnweightedGraphResult] = useState<string | null>(null);
  const [weightedGraphResult, setWeightedGraphResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const runAcyclicGraphDemo = () => {
    const graph = new AcyclicGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'C');
    setAcyclicGraphResult(graph.display() + '\nAcyclic: ' + graph.isAcyclic());
  };

  const runCyclicGraphDemo = () => {
    const graph = new CyclicGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A');
    setCyclicGraphResult(graph.display() + '\nCyclic: ' + graph.isCyclic());
  };

  const runDirectedGraphDemo = () => {
    const graph = new DirectedGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    setDirectedGraphResult(graph.display());
  };

  const runDirectedWeightedGraphDemo = () => {
    const graph = new DirectedWeightedGraph();
    graph.addEdge('A', 'B', 5);
    graph.addEdge('B', 'C', 3);
    setDirectedWeightedGraphResult(graph.display());
  };

  const runUndirectedGraphDemo = () => {
    const graph = new UndirectedGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    setUndirectedGraphResult(graph.display());
  };

  const runUndirectedWeightedGraphDemo = () => {
    const graph = new UndirectedWeightedGraph();
    graph.addEdge('A', 'B', 5);
    graph.addEdge('B', 'C', 3);
    setUndirectedWeightedGraphResult(graph.display());
  };

  const runUnweightedGraphDemo = () => {
    const graph = new UnweightedGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    setUnweightedGraphResult(graph.display());
  };

  const runWeightedGraphDemo = () => {
    const graph = new WeightedGraph();
    graph.addEdge('A', 'B', 5);
    graph.addEdge('B', 'C', 3);
    setWeightedGraphResult(graph.display());
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Types of Graphs
      </motion.h1>

      {/* Acyclic Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Acyclic Graph</h2>
        <p>
          An Acyclic Graph is a graph with no cycles. This means there is no path that starts and ends at the same vertex.
        </p>
        <div className="relative">
          <CopyToClipboard text="AcyclicGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {acyclicGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runAcyclicGraphDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Acyclic Graph
        </button>
        {acyclicGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{acyclicGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Cyclic Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Cyclic Graph</h2>
        <p>
          A Cyclic Graph is a graph that contains at least one cycle. A cycle is a path of edges and vertices wherein a vertex is reachable from itself.
        </p>
        <div className="relative">
          <CopyToClipboard text="CyclicGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {cyclicGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runCyclicGraphDemo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Cyclic Graph
        </button>
        {cyclicGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{cyclicGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Directed Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Directed Graph</h2>
        <p>
          A Directed Graph is a graph in which edges have orientations. That is, each edge is directed from one vertex to another.
        </p>
        <div className="relative">
          <CopyToClipboard text="DirectedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {directedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runDirectedGraphDemo}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Directed Graph
        </button>
        {directedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{directedGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Directed Weighted Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Directed Weighted Graph</h2>
        <p>
          A Directed Weighted Graph is a directed graph in which edges have weights. This type of graph is useful for modeling various real-world systems like networks.
        </p>
        <div className="relative">
          <CopyToClipboard text="DirectedWeightedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {directedWeightedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runDirectedWeightedGraphDemo}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mt-4"
        >
          Run Directed Weighted Graph
        </button>
        {directedWeightedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{directedWeightedGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Undirected Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Undirected Graph</h2>
        <p>
          An Undirected Graph is a graph in which edges have no orientation. The edge (A, B) is identical to the edge (B, A).
        </p>
        <div className="relative">
          <CopyToClipboard text="UndirectedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {undirectedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runUndirectedGraphDemo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Run Undirected Graph
        </button>
        {undirectedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{undirectedGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Undirected Weighted Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Undirected Weighted Graph</h2>
        <p>
          An Undirected Weighted Graph is a graph in which edges have weights, and there is no orientation.
        </p>
        <div className="relative">
          <CopyToClipboard text="UndirectedWeightedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {undirectedWeightedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runUndirectedWeightedGraphDemo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
        >
          Run Undirected Weighted Graph
        </button>
        {undirectedWeightedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{undirectedWeightedGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Unweighted Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Unweighted Graph</h2>
        <p>
          An Unweighted Graph is a graph in which edges do not have weights. This is useful for simple connections where distance or weight is not a factor.
        </p>
        <div className="relative">
          <CopyToClipboard text="UnweightedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {unweightedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runUnweightedGraphDemo}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mt-4"
        >
          Run Unweighted Graph
        </button>
        {unweightedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{unweightedGraphResult}</p>
          </div>
        )}
      </motion.section>

      {/* Weighted Graph */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Weighted Graph</h2>
        <p>
          A Weighted Graph is a graph in which each edge is assigned a weight. This can be useful in cases such as finding the shortest path or the longest path.
        </p>
        <div className="relative">
          <CopyToClipboard text="WeightedGraph Code Here" onCopy={handleCopy}>
            <button className="absolute right-0 top-0 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2">
              {copied ? <FiCheck /> : <FiClipboard />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </CopyToClipboard>

          <SyntaxHighlighter language="typescript" style={dracula}>
            {weightedGraphCode}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={runWeightedGraphDemo}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mt-4"
        >
          Run Weighted Graph
        </button>
        {weightedGraphResult && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="font-semibold mb-2">Output:</h3>
            <p>{weightedGraphResult}</p>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default GraphsPage;
