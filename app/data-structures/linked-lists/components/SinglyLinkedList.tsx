export class Node {
    constructor(public data: number, public next: Node | null = null) {}
  }
  
  export class SinglyLinkedList {
    head: Node | null = null;
  
    append(data: number) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    display(): string {
      const elements: number[] = [];
      let current = this.head;
      while (current) {
        elements.push(current.data);
        current = current.next;
      }
      return elements.join(' -> ') + ' -> None';
    }
  }
  