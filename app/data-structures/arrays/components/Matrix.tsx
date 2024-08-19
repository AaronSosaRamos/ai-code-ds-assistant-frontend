export class CustomMatrix {
    private items: number[][];
  
    constructor(rows: number, cols: number) {
      this.items = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
      );
    }
  
    get(row: number, col: number) {
      return this.items[row][col];
    }
  
    set(row: number, col: number, value: number) {
      this.items[row][col] = value;
    }
  
    display() {
      return this.items
        .map(row => `| ${row.map(item => item.toString().padStart(3, ' ')).join(' | ')} |`)
        .join('\n');
    }
  }
  