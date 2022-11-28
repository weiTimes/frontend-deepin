/**
 * 使用类创建单例模式
 *
 * @class SingleDog
 */
// class SingleDog {
//   show() {
//     console.log("我是一个单例对象");
//   }

//   static getInstance() {
//     if (!SingleDog.instance) {
//       SingleDog.instance = new SingleDog();
//     }

//     return SingleDog.instance;
//   }
// }

// const s1 = SingleDog.getInstance();
// const s2 = SingleDog.getInstance();

// console.log(s1 === s2); // true

/**
 * 使用闭包实现单例模式
 *
 * @class SingleDog
 */
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
}

SingleDog.getInstance = (function () {
  let instance = null;

  return function () {
    if (!instance) {
      instance = new SingleDog();
    }

    return instance;
  };
})();

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1 === s2);
