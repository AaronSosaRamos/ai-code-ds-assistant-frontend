// UndirectedGraph.ts
class UndirectedGraph {
    private adjacencyList: Map<string, string[]>;
  
    constructor() {
      this.adjacencyList = new Map();
    }
  
    addVertex(vertex: string): void {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      }
    }
  
    addEdge(vertex1: string, vertex2: string): void {
      if (!this.adjacencyList.has(vertex1)) {
        this.addVertex(vertex1);
      }
      if (!this.adjacencyList.has(vertex2)) {
        this.addVertex(vertex2);
      }
      this.adjacencyList.get(vertex1)!.push(vertex2);
      this.adjacencyList.get(vertex2)!.push(vertex1);
    }
  
    display(): string {
      let result = '';
      // Utiliza Array.from para evitar errores de iteración
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.join(', ')}\n`;
      }
      return result;
    }
  }
  
  export { UndirectedGraph };
  