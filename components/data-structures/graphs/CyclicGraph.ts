// CyclicGraph.ts
class CyclicGraph {
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
      this.adjacencyList.get(vertex2)!.push(vertex1);
    }
  
    display(): string {
      let result = '';
      for (const [vertex, edges] of Array.from(this.adjacencyList.entries())) {
        result += `${vertex} -> ${edges.join(', ')}\n`;
      }
      return result;
    }
  
    isCyclic(): boolean {
      const visited = new Set<string>();
  
      const dfs = (vertex: string, parent: string | null): boolean => {
        visited.add(vertex);
  
        for (const neighbor of this.adjacencyList.get(vertex) || []) {
          if (!visited.has(neighbor)) {
            if (dfs(neighbor, vertex)) return true;
          } else if (neighbor !== parent) {
            return true;
          }
        }
  
        return false;
      };
  
      for (const vertex of Array.from(this.adjacencyList.keys())) {
        if (!visited.has(vertex)) {
          if (dfs(vertex, null)) return true;
        }
      }
  
      return false;
    }
  }
  
  export { CyclicGraph };
  