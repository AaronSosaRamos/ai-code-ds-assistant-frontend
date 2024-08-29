// DirectedWeightedGraph.ts
class DirectedWeightedGraph {
    private adjacencyList: Map<string, { node: string; weight: number }[]>;
  
    constructor() {
      this.adjacencyList = new Map();
    }
  
    addVertex(vertex: string): void {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      }
    }
  
    addEdge(startVertex: string, endVertex: string, weight: number): void {
      this.addVertex(startVertex);
      this.addVertex(endVertex);
      this.adjacencyList.get(startVertex)!.push({ node: endVertex, weight });
    }
  
    display(): string {
      let result = '';
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.map(e => `${e.node}(${e.weight})`).join(', ')}\n`;
      }
      return result;
    }
  }
  
  export { DirectedWeightedGraph };
  