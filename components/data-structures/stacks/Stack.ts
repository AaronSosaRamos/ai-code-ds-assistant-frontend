export class Stack {
    private items: number[];
  
    constructor() {
      this.items = [];
    }
  
    push(element: number) {
      this.items.push(element);
    }
  
    pop() {
      if (this.items.length === 0) return "Underflow";
      return this.items.pop();
    }
  
    peek() {
      return this.items[this.items.length - 1];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    display() {
      return this.items.join(" -> ");
    }
  }
  