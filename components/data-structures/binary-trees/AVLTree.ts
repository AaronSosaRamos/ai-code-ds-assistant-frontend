class Node {
    public data: number;
    public height: number;
    public left: Node | null;
    public right: Node | null;
  
    constructor(data: number) {
      this.data = data;
      this.height = 1;
      this.left = null;
      this.right = null;
    }
  }
  
  export class AVLTree {
    private root: Node | null;
  
    constructor() {
      this.root = null;
    }
  
    insert(data: number) {
      this.root = this.insertNode(this.root, data);
    }
  
    private insertNode(node: Node | null, data: number): Node {
      if (!node) {
        return new Node(data);
      }
  
      if (data < node.data) {
        node.left = this.insertNode(node.left, data);
      } else if (data > node.data) {
        node.right = this.insertNode(node.right, data);
      } else {
        return node; // Duplicate keys are not allowed
      }
  
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  
      const balance = this.getBalance(node);
  
      // Left Left Case
      if (balance > 1 && data < node.left!.data) {
        return this.rightRotate(node);
      }
  
      // Right Right Case
      if (balance < -1 && data > node.right!.data) {
        return this.leftRotate(node);
      }
  
      // Left Right Case
      if (balance > 1 && data > node.left!.data) {
        node.left = this.leftRotate(node.left!);
        return this.rightRotate(node);
      }
  
      // Right Left Case
      if (balance < -1 && data < node.right!.data) {
        node.right = this.rightRotate(node.right!);
        return this.leftRotate(node);
      }
  
      return node;
    }
  
    private getHeight(node: Node | null): number {
      return node ? node.height : 0;
    }
  
    private getBalance(node: Node | null): number {
      return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
  
    private rightRotate(y: Node): Node {
      const x = y.left!;
      const T2 = x.right;
  
      x.right = y;
      y.left = T2;
  
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
      x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
  
      return x;
    }
  
    private leftRotate(x: Node): Node {
      const y = x.right!;
      const T2 = y.left;
  
      y.left = x;
      x.right = T2;
  
      x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
  
      return y;
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
  