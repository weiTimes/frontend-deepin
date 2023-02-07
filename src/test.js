function deepClone(obj) {
  if (!obj) return obj;

  const res = {};

  const root = {
    parent: res,
    key: null,
    data: obj,
  };

  const stack = [root];

  const memoMap = new WeakMap();

  while (stack.length > 0) {
    const { parent, key, data } = stack.pop();

    let currentRes = parent;

    if (memoMap.has(data)) {
      parent[key] = memoMap.get(data);

      break;
    }

    if (key !== null) {
      currentRes = parent[key] = Array.isArray(data) ? [] : {};
    }

    memoMap.set(data, currentRes);

    for (let prop in data) {
      if (data.hasOwnProperty(prop)) {
        const value = data[prop];
        const isObject =
          Object.prototype.toString.call(value) === '[object Object]';
        const isArray =
          Object.prototype.toString.call(value) === '[object Array]';

        if (isObject || isArray) {
          stack.push({
            parent: currentRes,
            key: prop,
            data: value,
          });
        } else {
          currentRes[prop] = value;
        }
      }
    }
  }

  return res;
}

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

const newObj = deepClone(obj);

// const subsets = function (nums) {
//   // 初始化结果数组
//   const res = [];
//   // 缓存数组长度
//   const len = nums.length;
//   // 初始化组合数组
//   const subset = [];
//   // 进入 dfs
//   dfs(0);

//   // 定义 dfs 函数，入参是 nums 中的数字索引
//   function dfs(index) {
//     // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
//     res.push(subset.slice());
//     // 从当前数字的索引开始，遍历 nums
//     for (let i = index; i < len; i++) {
//       // 这是当前数字存在于组合中的情况
//       subset.push(nums[i]);
//       // 基于当前数字存在于组合中的情况，进一步 dfs
//       dfs(i + 1);
//       // 这是当前数字不存在与组合中的情况
//       subset.pop();
//     }
//   }
//   // 返回结果数组
//   return res;
// };

// subsets([1, 2, 3]);
