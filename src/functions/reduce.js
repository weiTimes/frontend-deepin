var half = (v) => v / 2;
[2, 4, 6, 8, 10].map(half);

// push 具有副作用，但是用 concat 会有性能问题，这里使用了副作用来增加性能，由于是在函数内部的副作用，对外部不影响，所以仍然是个纯函数
const res = [2, 4, 6, 8, 10].reduce(
  (list, v) => (list.push(half(v)), list),
  []
);
