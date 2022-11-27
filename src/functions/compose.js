// ----
// const remainderOfTwo = (x) => x % 2;

// const equalsToOne = (x) => x === 1;

// const isOdd = (x) => equalsToOne(remainderOfTwo(x));

// console.log(isOdd(3));

// ----

// // x % y 的余数
const divideBy = (y) => (x) => x % y;

// // x 是否等于 y
const equalsTo = (y) => (x) => x === y;

// // Point Free 函数
const remainderOfTwo = divideBy(2);
const equalsToOne = equalsTo(1);

// const isOdd = (x) => equalsToOne(remainderOfTwo(x));

// console.log(isOdd(3));

// ----组合

function compose(...fns) {
  return fns.reverse().reduce(function reducer(fn1, fn2) {
    return function composed(...args) {
      return fn2(fn1(...args));
    };
  });
}

// 实参：从右往左，先取余数，再判断是否等于1
// 反直觉
// const isOdd = compose(equalsToOne, remainderOfTwo);

// console.log(isOdd(2));

// ---- 管道，和组合的参数顺序相反
const reverseArgs = (fn) => {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
};

const pipe = reverseArgs(compose);

const isOdd = pipe(remainderOfTwo, equalsToOne);

console.log(isOdd(3));
