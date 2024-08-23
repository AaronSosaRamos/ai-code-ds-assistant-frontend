import { DoublyNode } from './DoublyLinkedList';

export class DoublyCircularLinkedList {
  head: DoublyNode | null = null;

  append(data: number) {
    const newNode = new DoublyNode(data);
    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head; 
      this.head.prev = this.head; 
    } else {
      let current = this.head;
      while (current.next && current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.prev = current;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
  }

  display(): string {
    if (!this.head) return 'Empty List';

    const elements: number[] = [];
    let current = this.head;
    do {
      elements.push(current.data);
      current = current.next!;
    } while (current !== this.head);

    return elements.join(' <-> ') + ' <-> (head)';
  }
}
