import { Node } from './SinglyLinkedList';

export class SinglyCircularLinkedList {
  head: Node | null = null;

  append(data: number) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head; 
    } else {
      let current = this.head;
      while (current.next && current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head; 
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

    return elements.join(' -> ') + ' -> (head)';
  }
}
