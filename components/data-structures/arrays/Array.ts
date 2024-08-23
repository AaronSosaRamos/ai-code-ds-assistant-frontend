export class CustomArray {
    private items: number[];
  
    constructor(size: number) {
      this.items = new Array(size).fill(0).map(() => Math.floor(Math.random() * 100));
    }
  
    get(index: number) {
      return this.items[index];
    }
  
    set(index: number, value: number) {
      this.items[index] = value;
    }
  
    display() {
      return this.items.join(" -> ");
    }
  }
  