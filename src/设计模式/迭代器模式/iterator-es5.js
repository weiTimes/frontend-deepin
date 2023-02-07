// 编写一个迭代器生成函数
function iteratorGenerator(list) {
  let index = 0;
  let len = list.length;

  return {
    next() {
      const done = index >= len;
      const value = done ? undefined : list[index++];

      return {
        done,
        value,
      };
    },
  };
}

const iterator = iteratorGenerator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
