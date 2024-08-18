export class PriorityQueue {
    private items: { element: number, priority: number }[];
  
    constructor() {
      this.items = [];
    }
  
    enqueue(element: number, priority: number) {
      const queueElement = { element, priority };
      let added = false;
  
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
  
      if (!added) {
        this.items.push(queueElement);
      }
    }
  
    dequeue() {
      if (this.isEmpty()) return "Underflow";
      return this.items.shift()?.element;
    }
  
    front() {
      if (this.isEmpty()) return "No elements in Queue";
      return this.items[0].element;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    display() {
      return this.items.map(item => `${item.element}(${item.priority})`).join(" -> ");
    }
  }
  