const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];

// 方法一
// console.log(Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b));

// 方法二
console.log(
  Array.from(new Set(arr.toString().split(',')))
    .map(Number)
    .sort((a, b) => a - b)
);
