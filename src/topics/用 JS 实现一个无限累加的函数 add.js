function add(a) {
  function sum(b) {
    // 使用闭包
    a = a + b; // 累加
    return sum;
  }

  sum.toString = function () {
    // 重写toString()方法
    return a;
  };

  return sum; // 返回一个函数
}

console.log(add(1).toString());
console.log(add(1)(2).toString());
console.log(add(1)(2)(6).toString());
