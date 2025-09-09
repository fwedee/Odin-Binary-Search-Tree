import {NodeTree, Tree, CallbackFunction} from "./BinarySearchTree";

const prettyPrint = (node :NodeTree, prefix ='', isLeft = true) => {
    if (node === null){
        return;
    }
    if (node.right != null){
        prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '   '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Function to test the callback function of tree.levelOderForEach
const printAddPlus1 = (a :number) =>{
    console.log(a + 1);
};


let test = [1,2,3,4,5,6,7,8,9]
let tree = new Tree(test);
// tree.insert(10)
// // @ts-ignore
// prettyPrint(tree.root)
// // @ts-ignore
// prettyPrint(tree.find(3))
// tree.delete(5)
// @ts-ignore
prettyPrint(tree.root)
// tree.levelOrderForEach(printAddPlus1)
// tree.inOrderForEach()
console.log()
console.log(tree.height(5))
console.log(tree.depth(4))