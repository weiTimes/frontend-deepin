/*
 * @Author: ywhoo
 * @Date: 2022-12-19 16:32:58
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-20 18:02:37
 *
 * vue 的响应式原理 - 第一版
 */

const product = { price: 5, quantity: 2 };
let total = 0;

// 更新目标状态的值
const effect = () => (total = product.price * product.quantity);

// 存储不同对象
const targetMap = new WeakMap();

// 保存依赖关系
const track = (target, key) => {
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
};

// 运行所有运行的 effect
trigger = (target, key) => {
  const depsMap = targetMap.get(target);

  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    dep.forEach((effect) => effect());
  }
};

track(product, 'quantity');
effect();

console.log(total);

product.quantity = 4;

trigger(product, 'quantity');

console.log(total);
