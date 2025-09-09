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

    levelOrderForEach(func: (node: NodeTree) => void){
        if (!this.root) return;

        let queue : NodeTree[] = [this.root];

        while(queue.length > 0){
            let currentNode = queue.shift()!;

            func(currentNode);

            if (currentNode?.left) queue.push(currentNode.left)
            if (currentNode?.right) queue.push(currentNode.right)

        }
    }


    //Preorder ---> root --> left --> right
    preOderForEach(func: (node: NodeTree) => void){
        if (this.root) this.preOrderForEachRec(this.root, func);
    }

    preOrderForEachRec(currentNode: NodeTree, func: (node: NodeTree) => void){
        func(currentNode)
        if (currentNode?.left){
            this.preOrderForEachRec(currentNode.left, func)
        }
        if (currentNode?.right){
            this.preOrderForEachRec(currentNode.right, func)
        }
    }

    //Postorder ---> left --> right --> root
    postOderForEach(func: (node: NodeTree) => void){
        if (this.root) this.postOderForEachRec(this.root, func);
    }

    postOderForEachRec(currentNode: NodeTree, func: (node: NodeTree) => void) {
        if (currentNode?.left) {
           this.postOderForEachRec(currentNode.left, func)
        }
        if (currentNode?.right) {
           this.postOderForEachRec(currentNode.right, func)
        }
        func(currentNode)
    }

    //Inorder --> left --> root --> right
    inOrderForEach(func: (node: NodeTree) => void){
        if (this.root) this.inOrderForEachRec(this.root, func)
    }

    inOrderForEachRec(currentNode: NodeTree, func: (node: NodeTree) => void){
        if (currentNode?.left) {
            this.inOrderForEachRec(currentNode.left, func)
        }
        func(currentNode)
        if (currentNode?.right) {
            this.inOrderForEachRec(currentNode.right, func)
        }
    }

    height(value: number) : number | null{
        const node = this.find(value);
        if (!node) return null;
        return this.getHeight(node)
    }

    getHeight(node: NodeTree | null): number{
        if (!node) return -1
        return 1 + Math.max(
            this.getHeight(node.left),
            this.getHeight(node.right)
        );
    }

    depth(value: number) : number | null {
        let depth = -1;
        let found = false;

        const travers = (node: NodeTree | null, currentDepth: number) => {
            if (!node || found) return;
            if (node.data === value){
               depth = currentDepth;
               found = true;
               return;
            }
            travers(node.left, currentDepth + 1);
            travers(node.right, currentDepth + 1);
        };

        travers(this.root, 0);
        return depth;
    }

    isBalanced() : boolean {
        let balanced = true;

        this.levelOrderForEach((node) =>{
            const leftHeight = this.getHeight(node.left);
            const rightHeight = this.getHeight(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1){
                balanced = false;
            }
        });

        return balanced;
    }

    rebalance(){
        let allNodes : number[] = [];

        this.inOrderForEach((node) => {
            allNodes.push(node.data)
        });

        this.root = Tree.buildTree(allNodes)
    }

}