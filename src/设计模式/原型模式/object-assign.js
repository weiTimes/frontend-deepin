if (typeof Object.assign2 !== 'function') {
  // Object 上的方法是不可枚举的，所以用 defineProperty 定义 assin2 方法，配置项默认都是关闭的，需要配置可写和可配置
  Object.defineProperty(Object, 'assign2', {
    writable: true,
    configurable: true,
    value: function (target, ...args) {
      // 判断参数是否正确
      if (!target) {
        throw new TypeError('target 不合法');
      }

      const o = Object(target);

      for (let i = 0; i < args.length; i++) {
        const curObj = args[i];

        if (curObj) {
          for (let prop in curObj) {
            // 不能直接 curObj.hasOwnProperty，因为 curObj 有可能是用 Object.create(null) 创建的，其没有 hasOwnProperty 方法
            if (Object.prototype.hasOwnProperty.call(curObj, prop)) {
              o[prop] = curObj[prop];
            }
          }
        }
      }

      return o;
    },
  });
}

let a = {
  name: 'advanced',
  age: 18,
};
let b = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45',
  },
};

let c = Object.assign2(a, b);

console.log(c === a); // true
