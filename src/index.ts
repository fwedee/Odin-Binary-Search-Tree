import {NodeTree, Tree} from "./BinarySearchTree";

// index.ts is just here to test if my Binary-Search-Tree implementation works


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



// let test = [1,2,3,4,5,6,7,8,9]
// let tree = new Tree(test);
// tree.insert(10)
// // @ts-ignore
// prettyPrint(tree.root)
// // @ts-ignore
// prettyPrint(tree.find(3))
// tree.delete(5)
// @ts-ignore
// prettyPrint(tree.root)
// tree.levelOrderForEach(printAddPlus1)
// tree.inOrderForEach()
// console.log()
// console.log(tree.height(5))
// console.log(tree.depth(4))
// console.log(tree.isBalanced())
// tree.inOrderForEach((node) => {
// tree.insert(10)
// tree.insert(11)
// tree.insert(12)
// tree.insert(13)
// console.log(tree.isBalanced())
// tree.rebalance()
// console.log(tree.isBalanced())

function getRendInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(size : number, minRandom : number, maxRandom :number) : number[]{
    let randomArray : number[] = [];
    for (let i = 0; i < size; i++){
        randomArray.push(getRendInteger(minRandom, maxRandom))
    }
    return randomArray;
}


let tree = new Tree(randomArray(1000, 100, 10000))
console.log(tree.isBalanced())


// let s : string = "";
// tree.postOderForEach((node) => {
//     s += node.data.toString() + " ";
// });
// console.log(s)

for (let i = 0; i < 20; i++){
    tree.insert(getRendInteger(1, 100))
}

console.log()
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())