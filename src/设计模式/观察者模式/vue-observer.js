/*
 * @Author: ywhoo
 * @Date: 2022-12-21 16:08:08
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-21 16:15:09
 *
 * vue 发布订阅模式实现原理
 */
// 对需要监听的数据对象进行遍历，为其加上 getter/setter
function observe(target) {
  if (target && typeof target === 'object') {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key]);
    });
  }
}

function defineReactive(target, key, value) {
  observe(value);

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get() {
      return value;
    },
    set(newValue) {
      const dep = new Dep();

      value = newValue;

      // 通知所有订阅者
      dep.notify();
    },
  });
}

// 发布者类
// 添加订阅者/通知订阅者
class Dep {
  constructor() {
    // 添加订阅者
    this.subs = [];
  }

  add(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
