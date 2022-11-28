/*
 * @Author: ywhoo
 * @Date: 2022-11-27 20:11:39
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-11-28 17:21:12
 *
 * 实现对象深拷贝/模拟 JAVA 中的克隆接口/JavaScript 实现原型模式
 */

const liLei = {
  name: "lilei",
  age: 28,
  habits: ["coding", "hiking", "running"],
};

// 方法1，使用 JSON.stringify，仅在严格对象中可使用，因为它无法处理 function/正则等，会将其丢失
// 核心也是使用递归的方式，所以存在爆栈的风险，不过它有做循环引用检测
function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 方法2，简单实现深拷贝
function deepClone(obj) {
  // 校验参数，如果是原始类型，直接返回
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let res = {};

  if (Array.isArray(obj)) {
    res = [];
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];

      res[key] = deepClone(element);
    } else {
      res[key] = element;
    }
  }

  return res;
}

// ----------方法三 迭代，解决爆栈问题

function isType(obj, key) {
  return Object.prototype.toString.call(obj) === `[object ${key}]`;
}

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

function cloneLoop(obj) {
  const root = {};
  // 缓存已经拷贝过的引用数据，如果遇到同样的原数据，直接从缓存中拿到上一次拷贝原数据时获得新的引用，用于保存原数据的引用关系
  // 可以用 WeakMap 提高性能
  const memoList = [];

  const stack = [
    {
      parent: root,
      key: undefined,
      data: obj,
    },
  ];

  while (stack.length) {
    const node = stack.pop();
    const { parent, key, data } = node;

    const memoData = find(memoList, data);

    if (memoData?.target) {
      parent[key] = memoData?.target;
      break;
    }

    let cur = parent;

    if (typeof key !== "undefined") {
      const isArray = isType(data, "Array");

      cur = parent[key] = isArray ? [] : {};
    }

    // 保存源数据和拷贝时新的引用
    memoList.push({
      source: data,
      target: cur,
    });

    for (let prop in data) {
      if (data.hasOwnProperty(prop)) {
        const item = data[prop];
        const isObject = isType(item, "Object");
        const isArray = isType(item, "Array");

        if (isObject || isArray) {
          stack.push({
            parent: cur,
            key: prop,
            data: item,
          });
        } else {
          cur[prop] = item;
        }
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
    temp = temp["data"] = {};

    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data;
}

const looped = {};

// 循环引用
looped.looped = looped;

console.log(cloneLoop(looped));

var obj = {
  a1: 1,
  a2: {
    b1: 1,
    b2: {
      c1: 1,
    },
  },
  a3: ["h", "e", "l"],
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
