/**
 * 方法1 静态方法
 *
 * @class Storage
 */
// class Storage {
//   static getInstance() {
//     if (!Storage.instance) {
//       Storage.instance = new Storage();
//     }

//     return Storage.instance;
//   }

//   getItem(key) {
//     return `get ${key}`;
//   }

//   setItem(key, value) {
//     return `set ${key}, ${value}`;
//   }
// }

/**
 * 方法2 闭包
 *
 * @class Storage
 */
class Storage {
  getItem(key) {
    return `get ${key}`;
  }
  setItem(key, value) {
    return `set ${key}, ${value}`;
  }
}

Storage.getInstance = (function () {
  let instance = null;

  return function () {
    if (!instance) {
      instance = new Storage();
    }

    return instance;
  };
})();

let s1 = Storage.getInstance();
let s2 = Storage.getInstance();

console.log(s1.getItem("hello"));
console.log(s2.setItem("name", "hefeng"));
console.log(s1 === s2); // true
