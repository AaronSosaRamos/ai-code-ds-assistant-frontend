export class CustomTensor {
    private items: number[][][];
  
    constructor(dim1: number, dim2: number, dim3: number) {
      this.items = Array.from({ length: dim1 }, () =>
        Array.from({ length: dim2 }, () =>
          Array.from({ length: dim3 }, () => Math.floor(Math.random() * 100))
        )
      );
    }
  
    get(dim1: number, dim2: number, dim3: number) {
      return this.items[dim1][dim2][dim3];
    }
  
    set(dim1: number, dim2: number, dim3: number, value: number) {
      this.items[dim1][dim2][dim3] = value;
    }
  
    display() {
      return this.items
        .map((matrix, index) => `Matrix ${index + 1}:\n` +
          matrix
            .map(row => `| ${row.map(item => item.toString().padStart(3, ' ')).join(' | ')} |`)
            .join('\n')
        )
        .join('\n\n');
    }
  }
  