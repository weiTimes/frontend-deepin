/*
 * @Author: ywhoo
 * @Date: 2022-12-19 16:32:58
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-21 15:09:26
 *
 * vue 的响应式原理 - 第三版
 * 在上一版中，
 * 1. 在非 effect 函数中访问属性仍然会执行 track 去存储依赖关系，这不是我们所期望的，使用 activeEffect 解决
 * 2. salcePrice 应该是响应式的，也就是当它变化时，total 也应该发生变化，如何使普通的值是响应式的呢；使用 ref 函数，定义它有两种方式：
 *   1. reactive
 *   2. 使用对象访问器 getter/setter
 */
// 可确保在 effect 函数中访问属性时才存储依赖关系，trace 存储的是 activeEffect
let activeEffect = null;

// e: 更新目标状态的值的函数
function effect(e) {
  activeEffect = e;
  activeEffect();
  // 存储完之后销毁
  activeEffect = null;
}

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

// ref的实现方法1: reactive
// function ref(initialValue) {
//   return reactive({ value: initialValue });
// }

// ref的实现方法2: 对象访问器 getter/setter
function ref(initialValue) {
  const obj = {
    get value() {
      track(obj, 'value');

      return initialValue;
    },
    set value(value) {
      // if (value !== initialValue) {
      initialValue = value;
      trigger(obj, 'value');
      // }
    },
  };

  return obj;
}

const product = reactive({ price: 5, quantity: 2 });

// 存储不同对象
const targetMap = new WeakMap();

// 保存依赖关系
function track(target, key) {
  if (!activeEffect) return;

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

  dep.add(activeEffect);
}

// 运行所有相关的 effect
function trigger(target, key) {
  const depsMap = targetMap.get(target);

  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    dep.forEach((effect) => effect());
  }
}

let total = 0;
// 响应式值
let salePrice = ref(0);

effect(() => {
  salePrice.value = product.price * 0.9;
});
effect(() => {
  total = salePrice.value * product.quantity;
});

// 测试用例

console.log(
  `当前 total 值应该为 9 = ${total}, salcePrice 应该为 4.5 = ${salePrice.value}`
);

product.quantity = 3;

console.log(
  `当前 total 值应该为 13.5 = ${total}, salcePrice 应该为 4.5 = ${salePrice.value}`
);

product.price = 10;

console.log(
  `当前 total 值应该为 27 = ${total}, salcePrice 应该为 9 = ${salePrice.value}`
);
