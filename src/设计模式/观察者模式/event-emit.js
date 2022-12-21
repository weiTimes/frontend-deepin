/*
 * @Author: ywhoo
 * @Date: 2022-12-21 16:32:44
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-21 16:54:49
 *
 * 发布订阅模式
 * 实现一个 Events 模块，可以实现自定义事件的订阅、触发、移除功能
 */
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, fn, ...args) {
    if (!fn) {
      throw new Error('没有传入处理函数');
    }

    this.addEvent(eventName, fn, false, ...args);
  }

  once(eventName, fn, ...args) {
    if (!fn) {
      throw new Error('没有传入处理函数');
    }

    this.addEvent(eventName, fn, true, ...args);
  }

  off(eventName, fn) {
    if (!eventName) {
      throw new Error('没有传入事件名');
    }

    this.events.get(eventName).delete(fn);
  }

  // 触发
  fire(eventName, ...args) {
    const eventMap = this.events.get(eventName);

    for (const [, fn] of eventMap) {
      fn(...args);
    }
  }

  addEvent(eventName, fn, isOnce, ...args) {
    let eventMap = this.events.get(eventName);

    if (!eventMap) {
      eventMap = this.events.set(eventName, new Map()).get(eventName);
    }

    eventMap.set(fn, (...emitArgs) => {
      fn(...args, ...emitArgs);

      if (isOnce) {
        this.off(eventName, fn);
      }
    });
  }
}

const events = new EventEmitter();

const fn1 = (...args) => console.log('I want sleep1', ...args);
const fn2 = (...args) => console.log('I want sleep2', ...args);
const fn3 = (...args) =>
  console.log('I want sleep2, only trigger once', ...args);

events.on('sleep', fn1, 'by ywhoo');
events.on('sleep', fn2, 'by hefeng');
events.off('sleep', fn1, 'by no one');

// 只会被触发一次，触发后会被自动移除
events.once('sleep', fn3, 'by hefeng');

events.fire('sleep');
events.fire('sleep');
