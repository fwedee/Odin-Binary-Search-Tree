export class NodeTree{
    data : number;
    left: NodeTree | null;
    right: NodeTree | null;


    constructor(data:number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


export class Tree{
    root: NodeTree | null;

    constructor(array:number[]) {
       this.root = Tree.buildTree(array);
    }

    static buildTree(array:number[]) :NodeTree | null{
       // First sort array
       array.sort((a, b) => a - b);
       // Remove duplicate numbers
       array = [...new Set(array)] ;

       return Tree.sortedArrayToBSTRecur(array, 0, array.length - 1);
    }

    static sortedArrayToBSTRecur(array: number[], start: number, end: number) :NodeTree | null{

        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let root = new NodeTree(array[mid]);
        root.left = Tree.sortedArrayToBSTRecur(array, start, mid - 1);
        root.right = Tree.sortedArrayToBSTRecur(array, mid + 1, end);

        return root;
    }

    private insertRec(node: NodeTree | null, value: number): NodeTree {
        if (node === null) return new NodeTree(value);
        if (value < node.data) node.left = this.insertRec(node.left, value);
        else if (value > node.data) node.right = this.insertRec(node.right, value);
        return node;
    }

    insert(value: number) {
        this.root = this.insertRec(this.root, value);
    }

    delete(value: number) {
    this.root = this.deleteRec(this.root, value);
}

private deleteRec(root: NodeTree | null, value: number): NodeTree | null {
    if (root === null) return root;

    if (value < root.data) {
        root.left = this.deleteRec(root.left, value);
    } else if (value > root.data) {
        root.right = this.deleteRec(root.right, value);
    } else {
        // Case 1: No child
        if (root.left === null && root.right === null) {
            return null;
        }

        // Case 2: One child
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        // Case 3: Two children → find inorder successor
        let successor = this.findMin(root.right);
        root.data = successor.data;
        root.right = this.deleteRec(root.right, successor.data);
    }
    return root;
}

private findMin(node: NodeTree): NodeTree {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}


    find(value: number) :NodeTree | null{
        let current = this.root;

        while (true) {
            if (current === null) return null;
            if (value === current.data) return current;

            if (value < current.data) {
                current = current.left
            } else if (value > current.data) {
                current = current.right
            }
        }
    }


}