export class DoublyNode {
    constructor(
      public data: number,
      public next: DoublyNode | null = null,
      public prev: DoublyNode | null = null
    ) {}
  }
  
  export class DoublyLinkedList {
    head: DoublyNode | null = null;
  
    append(data: number) {
      const newNode = new DoublyNode(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
        newNode.prev = current;
      }
    }
  
    display(): string {
      const elements: number[] = [];
      let current = this.head;
      while (current) {
        elements.push(current.data);
        current = current.next;
      }
      return elements.join(' <-> ') + ' <-> None';
    }
  }
  