let ar1 = [1,2];
let ar2 = [2,1];

console.log(JSON.stringify(ar1.sort()) == JSON.stringify(ar2.sort())); // T or F
// console.log(ar1===ar2); // F OR T

// console.log([1,2,3,45] == [1,3,4,6,5]);

// function num1(a,b,a){
//     console.log(a,b,a);
// }
// const num2 = (a,b,a)=>{
//     console.log(a, b, a);
// }
// num1(1,2,3);