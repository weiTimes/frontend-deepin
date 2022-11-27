/**
 * 柯里化
 * 每次接收一个参数
 *
 * 柯里化 是一种转换，将 f(a,b,c) 转换为可以被以 f(a)(b)(c) 的形式进行调用。
 * JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏函数。
 *
 * https://zh.javascript.info/currying-partials
 *
 * @author 和风 wei.ye@perfma.com
 * @param {*} fn
 * @param {*} [arity=fn.length]
 * @return {*}
 */

// 实现1
// function curry(fn) {
//   const arity = fn.length;

//   return (function nextCurried(prevArgs) {
//     return function curried(nextArg) {
//       var args = [...prevArgs, nextArg];

//       if (args.length >= arity) {
//         return fn(...args);
//       } else {
//         return nextCurried(args);
//       }
//     };
//   })([]);
// }

// 实现2-推荐
const curry = (fn) => {
  const arity = fn.length;

  return function curried(...prevArgs) {
    if (prevArgs.length >= arity) {
      return fn.apply(this, prevArgs);
    } else {
      return function (nextArgs) {
        return curried.apply(this, prevArgs.concat(nextArgs));
      };
    }
  };
};

const add = (a, b, c) => {
  return a + b + c;
};

const curried = curry(add);

console.log(curried(1, 2, 3));

// reduce 实现累加
// const test = (...args) => args.reduce((a, b) => a + b);
// console.log(test(1,2));
