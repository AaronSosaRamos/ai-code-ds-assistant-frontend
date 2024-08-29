// AcyclicGraph.ts
class AcyclicGraph {
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
      this.addVertex(vertex1);
      this.addVertex(vertex2);
      this.adjacencyList.get(vertex1)!.push(vertex2);
    }
  
    display(): string {
      let result = '';
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.join(', ')}\n`;
      }
      return result;
    }
  
    isAcyclic(): boolean {
      const visited = new Set<string>();
      const stack = new Set<string>();
  
      const dfs = (vertex: string): boolean => {
        visited.add(vertex);
        stack.add(vertex);
  
        for (const neighbor of this.adjacencyList.get(vertex) || []) {
          if (!visited.has(neighbor)) {
            if (!dfs(neighbor)) return false;
          } else if (stack.has(neighbor)) {
            return false;
          }
        }
  
        stack.delete(vertex);
        return true;
      };
  
      for (const vertex of Array.from(this.adjacencyList.keys())) {
        if (!visited.has(vertex)) {
          if (!dfs(vertex)) return false;
        }
      }
  
      return true;
    }
  }
  
  export { AcyclicGraph };
  