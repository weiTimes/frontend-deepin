/*
 * @Author: ywhoo
 * @Date: 2022-11-27 20:11:39
 * @Last Modified by: ywhoo
 * @Last Modified time: 2023-02-02 20:40:18
 *
 * 实现对象深拷贝/模拟 JAVA 中的克隆接口/JavaScript 实现原型模式
 */

const isType = (obj) => (key) => {
  return Object.prototype.toString.call(obj) === `[object ${key}]`;
};

const liLei = {
  name: 'lilei',
  age: 28,
  habits: ['coding', 'hiking', 'running'],
};

// 方法1，使用 JSON.stringify，仅在严格对象中可使用，因为它无法处理 function/正则等，会将其丢失
// 核心也是使用递归的方式，所以存在爆栈的风险，不过它有做循环引用检测
function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 方法2，递归实现
function deepClone(obj) {
  const isQuoteType = (o) => {
    const typeByToString = isType(o);
    const isObject = typeByToString('Object');
    const isArray = typeByToString('Array');

    return isObject || isArray;
  };

  if (!obj || !isQuoteType(obj)) return obj;

  let res = isType(obj)('Array') ? [] : {};

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const item = obj[prop];

      if (isQuoteType(item)) {
        res[prop] = deepClone(item);
      } else {
        res[prop] = item;
      }
    }
  }

  return res;
}

// ----------方法三 迭代，解决爆栈
function deepLoop(obj) {
  let root = {};
  let stack = [
    {
      parent: root,
      key: undefined,
      data: obj,
    },
  ];

  while (stack.length) {
    const node = stack.pop();
    const { parent, key, data } = node;

    let res = parent;

    if (key !== undefined) {
      res = parent[key] = isType(data)('Array') ? [] : {};
    }

    for (let prop in data) {
      const item = data[prop];
      const isArray = isType(item)('Array');
      const isQuote = isType(item)('Object') || isArray;

      if (isQuote) {
        // 只有引入类型才会入栈
        stack.push({
          parent: res,
          key: prop,
          data: item,
        });
      } else {
        res[prop] = item;
      }
    }
  }

  return root;
}

// ----------方法四 基于方法三，解决丢失引用关系/循环引用报错

/**
 * 从缓存的数据中找到 data，如果能找到，说明已经拷贝过了
 *
 * @param {*} list
 * @param {*} data
 */
function find(list, data) {
  if (!list.length) return null;

  return list.find((item) => item.source === data);
}

function deepCloneNoCircle(obj) {
  let root = {};
  let stack = [
    {
      parent: root,
      key: undefined,
      data: obj,
    },
  ];
  // 缓存已经拷贝过的引用数据，如果遇到同样的原数据，直接从缓存中拿到上一次拷贝原数据时获得新的引用，用于保存原数据的引用关系，同时能解决循环引用的问题
  const memoMap = new WeakMap();

  while (stack.length) {
    const node = stack.pop();
    const { parent, key, data } = node;

    let res = parent;

    if (memoMap.has(data)) {
      res[key] = memoMap.get(data);
      break;
    }

    if (key !== undefined) {
      res = parent[key] = isType(data)('Array') ? [] : {};
    }

    memoMap.set(data, res);

    for (let prop in data) {
      const item = data[prop];
      const isArray = isType(item)('Array');
      const isQuote = isType(item)('Object') || isArray;

      if (isQuote) {
        stack.push({
          parent: res,
          key: prop,
          data: item,
        });
      } else {
        res[prop] = item;
      }
    }
  }

  return root;
}

// 造数据
function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
    temp = temp['data'] = {};

    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data;
}

// const looped = {};

// // 循环引用
// looped.looped = looped;

// console.log(cloneLoop(looped));

var obj = {
  a1: 1,
  a2: {
    b1: 1,
    b2: {
      c1: 1,
    },
  },
  a3: ['h', 'e', 'l'],
};

// var b = {};
// var a = { a1: b, a2: b };

// console.log(a.a1 === a.a2);

// var c = cloneLoop(a);
// console.log(c.a1 === c.a2);

// const copy = cloneLoop(obj);
// copy.a2.b2.c1 = 3;
// copy.a3[0] = "";

// console.log(obj);
// console.log(copy);
