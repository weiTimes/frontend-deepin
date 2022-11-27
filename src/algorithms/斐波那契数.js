/**
 * 1 1 2 3 5 8 13 21 34 55
 *
 * 极客时间教程
 * https://time.geekbang.org/column/article/580442
 *
 * @param {*} n  表示第几项，从 1 开始
 * @returns
 */
// 方法1，迭代
// function fib(n) {
//   if (n < 1) return 0;
//   if (n <= 2) return 1;

//   let fib1 = 0;
//   let fib2 = 1;
//   let res;

//   // 先从 f(2) 开始算 = 0 + 1
//   for (let i = 2; i <= n; i++) {
//     // f(n - 2) + f(n - 1)
//     res = fib1 + fib2;
//     fib1 = fib2;
//     fib2 = res;
//   }

//   return res;
// }

// 方法2：递归
// function fib(n) {
//   if (n < 1) return 0;
//   if (n <= 2) return 1;

//   return fib(n - 1) + fib(n - 2);
// }

// 方法3：递归 + 记忆函数
// 时间复杂度：2n
// function fib(n, memo = [0, 1, 1]) {
//   if (memo[n]) return memo[n];

//   return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
// }

// 方法4：尾递归
// 时间复杂度：n
function fib(n, fib1, fib2) {
  if (n < 1) return fib1;
  if (n === 1) return fib2;

  return fib(n - 1, fib2, fib1 + fib2);
}

console.log(fib(3, 0, 1));
