enum Color {
    RED,
    BLACK,
}

class Node {
    public data: number;
    public color: Color;
    public left: Node | null;
    public right: Node | null;
    public parent: Node | null;

    constructor(data: number) {
        this.data = data;
        this.color = Color.RED;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

export class RedBlackTree {
    private root: Node | null;

    constructor() {
        this.root = null;
    }

    insert(data: number) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
            this.root.color = Color.BLACK;
        } else {
            this.root = this.insertNode(this.root, newNode);
        }
        this.fixViolation(newNode);
    }

    private insertNode(root: Node | null, node: Node): Node {
        if (!root) return node;

        if (node.data < root.data) {
            root.left = this.insertNode(root.left, node);
            if (root.left) root.left.parent = root;
        } else if (node.data > root.data) {
            root.right = this.insertNode(root.right, node);
            if (root.right) root.right.parent = root;
        }

        return root;
    }

    private rotateLeft(node: Node) {
        const tempRight = node.right!;
        node.right = tempRight.left;
        if (node.right) node.right.parent = node;

        tempRight.parent = node.parent;
        if (node.parent === null) {
            this.root = tempRight;
        } else if (node === node.parent.left) {
            node.parent.left = tempRight;
        } else {
            node.parent.right = tempRight;
        }

        tempRight.left = node;
        node.parent = tempRight;
    }

    private rotateRight(node: Node) {
        const tempLeft = node.left!;
        node.left = tempLeft.right;
        if (node.left) node.left.parent = node;

        tempLeft.parent = node.parent;
        if (node.parent === null) {
            this.root = tempLeft;
        } else if (node === node.parent.left) {
            node.parent.left = tempLeft;
        } else {
            node.parent.right = tempLeft;
        }

        tempLeft.right = node;
        node.parent = tempLeft;
    }

    private fixViolation(node: Node) {
        while (node !== this.root && node.parent && node.parent.color === Color.RED) {
            if (node.parent.parent) {
                if (node.parent === node.parent.parent.left) {
                    const uncle = node.parent.parent.right;
                    if (uncle && uncle.color === Color.RED) {
                        node.parent.color = Color.BLACK;
                        uncle.color = Color.BLACK;
                        node.parent.parent.color = Color.RED;
                        node = node.parent.parent;
                    } else {
                        if (node === node.parent.right) {
                            node = node.parent;
                            this.rotateLeft(node);
                        }
                        if (node.parent) {
                            node.parent.color = Color.BLACK;
                            if (node.parent.parent) {
                                node.parent.parent.color = Color.RED;
                                this.rotateRight(node.parent.parent);
                            }
                        }
                    }
                } else {
                    const uncle = node.parent.parent.left;
                    if (uncle && uncle.color === Color.RED) {
                        node.parent.color = Color.BLACK;
                        uncle.color = Color.BLACK;
                        node.parent.parent.color = Color.RED;
                        node = node.parent.parent;
                    } else {
                        if (node === node.parent.left) {
                            node = node.parent;
                            this.rotateRight(node);
                        }
                        if (node.parent) {
                            node.parent.color = Color.BLACK;
                            if (node.parent.parent) {
                                node.parent.parent.color = Color.RED;
                                this.rotateLeft(node.parent.parent);
                            }
                        }
                    }
                }
            }
        }
        if (this.root) {
            this.root.color = Color.BLACK;
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
