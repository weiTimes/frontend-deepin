// 方法1，迭代
// function fn(n) {
//   if (n < 0) return undefined;

//   let total = 1;

//   for (let i = n; i > 1; i--) {
//     total = total * i;
//   }

//   return total;
// }

// 方法二，递归
function fn(n) {
  if (n === 1 || n === 0) return 1;

  return n * fn(n - 1);
}

console.log(fn(7));
