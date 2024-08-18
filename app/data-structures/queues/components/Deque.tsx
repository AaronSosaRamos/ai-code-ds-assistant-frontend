export class Deque {
    private items: number[];
  
    constructor() {
      this.items = [];
    }
  
    addFront(element: number) {
      this.items.unshift(element);
    }
  
    addRear(element: number) {
      this.items.push(element);
    }
  
    removeFront() {
      if (this.isEmpty()) return "Underflow";
      return this.items.shift();
    }
  
    removeRear() {
      if (this.isEmpty()) return "Underflow";
      return this.items.pop();
    }
  
    front() {
      if (this.isEmpty()) return "No elements in Deque";
      return this.items[0];
    }
  
    rear() {
      if (this.isEmpty()) return "No elements in Deque";
      return this.items[this.items.length - 1];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    display() {
      return this.items.join(" -> ");
    }
  }
  