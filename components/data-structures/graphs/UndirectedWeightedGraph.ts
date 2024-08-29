// UndirectedWeightedGraph.ts
class UndirectedWeightedGraph {
    private adjacencyList: Map<string, { node: string; weight: number }[]>;
  
    constructor() {
      this.adjacencyList = new Map();
    }
  
    addVertex(vertex: string): void {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      }
    }
  
    addEdge(vertex1: string, vertex2: string, weight: number): void {
      this.addVertex(vertex1);
      this.addVertex(vertex2);
      this.adjacencyList.get(vertex1)!.push({ node: vertex2, weight });
      this.adjacencyList.get(vertex2)!.push({ node: vertex1, weight });
    }
  
    display(): string {
      let result = '';
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.map(e => `${e.node}(${e.weight})`).join(', ')}\n`;
      }
      return result;
    }
  }
  
  export { UndirectedWeightedGraph };
  