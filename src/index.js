// require('./partial');
// require('./functions/curry');
// require('./algorithm/数组去重');
// require('./functions/isType');
// require('./topics/用 JS 实现一个无限累加的函数 add');
// require('./topics/编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组');
// require('./functions/compose');
// require('./functions/monad');
// require('./functions/static');
// require('./algorithms/斐波那契数');
// require('./algorithms/阶乘');
// require('./algorithms/二叉树遍历');

var isValid = function (s) {
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ]);

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      stack.push(s[i]);
    } else {
      const top = stack.pop();

      if (!stack.length || s[i] !== map.get(top)) return false;
    }
  }

  return stack.length === 0;
};

isValid('()');
