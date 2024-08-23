class Node {
    public data: number;
    public left: Node | null;
    public right: Node | null;
  
    constructor(data: number) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  export class BinarySearchTree {
    private root: Node | null;
  
    constructor() {
      this.root = null;
    }
  
    insert(data: number) {
      const newNode = new Node(data);
      if (!this.root) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    private insertNode(node: Node, newNode: Node) {
      if (newNode.data < node.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    inorder(node: Node | null = this.root, result: number[] = []): number[] {
      if (node) {
        this.inorder(node.left, result);
        result.push(node.data);
        this.inorder(node.right, result);
      }
      return result;
    }
  
    preorder(node: Node | null = this.root, result: number[] = []): number[] {
      if (node) {
        result.push(node.data);
        this.preorder(node.left, result);
        this.preorder(node.right, result);
      }
      return result;
    }
  
    postorder(node: Node | null = this.root, result: number[] = []): number[] {
      if (node) {
        this.postorder(node.left, result);
        this.postorder(node.right, result);
        result.push(node.data);
      }
      return result;
    }
  
    displayTraversal(type: 'inorder' | 'preorder' | 'postorder'): string {
      let result: number[] = [];
      if (type === 'inorder') {
        result = this.inorder();
      } else if (type === 'preorder') {
        result = this.preorder();
      } else if (type === 'postorder') {
        result = this.postorder();
      }
      return result.join(' -> ');
    }
  }
  