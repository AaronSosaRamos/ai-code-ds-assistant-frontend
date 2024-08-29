class DirectedGraph {
    private adjacencyList: Map<string, string[]>;
  
    constructor() {
      this.adjacencyList = new Map();
    }
  
    addVertex(vertex: string): void {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      }
    }
  
    addEdge(startVertex: string, endVertex: string): void {
      if (!this.adjacencyList.has(startVertex)) {
        this.addVertex(startVertex);
      }
      if (!this.adjacencyList.has(endVertex)) {
        this.addVertex(endVertex);
      }
      this.adjacencyList.get(startVertex)!.push(endVertex);
    }
  
    display(): string {
      let result = '';
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.join(', ')}\n`;
      }
      return result;
    }
  }
  
  export { DirectedGraph };
  