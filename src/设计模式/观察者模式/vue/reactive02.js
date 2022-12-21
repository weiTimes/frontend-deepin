/*
 * @Author: ywhoo
 * @Date: 2022-12-19 16:32:58
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-20 18:17:58
 *
 * vue 的响应式原理 - 第二版
 * Proxy and Reflect
 * 第一版中当访问属性和更新属性值时，均需要手动地进行存储依赖关系和触发更新操作，在这一版中使用 Proxy 拦截 getter/setter 操作，
 * 并使用 Reflect 将操作原样转发给原始对象
 */
// 拦截 getter/setter 自动收集依赖关系和触发更新
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(target, key);

      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      if (oldValue !== value) {
        trigger(target, key);
      }

      return result;
    },
  };

  return new Proxy(target, handler);
}

const product = reactive({ price: 5, quantity: 2 });
let total = 0;

// 更新目标状态的值
function effect() {
  return (total = product.price * product.quantity);
}

// 存储不同对象
const targetMap = new WeakMap();

// 保存依赖关系
function track(target, key) {
  // 存储不同对象属性
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  // 存储对应的 effects
  let dep = depsMap.get(key);

  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(effect);
}

// 运行所有运行的 effect
function trigger(target, key) {
  const depsMap = targetMap.get(target);

  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    dep.forEach((effect) => effect());
  }
}

effect();

console.log(total);

product.price = 20;

console.log(total);
