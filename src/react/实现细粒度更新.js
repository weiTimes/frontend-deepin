/*
 * @Author: ywhoo
 * @Date: 2023-01-31 19:39:51
 * @Last Modified by: ywhoo
 * @Last Modified time: 2023-02-02 18:55:28
 *
 * 在 react 中，需要显示地指明所依赖的状态，如 const y = useMemo(() => 2 * x + 1, [x]);
 * 而在 vue 中不需要，vue 可以实现细粒度更新，即 const y = computed(() => 2 * x + 1);
 * 这里将模拟实现 react api 的细粒度更新，即 const y = useMemo(() => 2 * x + 1);
 */

const effectStack = [];

function subscribe(effect, subs) {
  subs.add(effect); // 添加订阅者
  effect.deps.add(subs);
}

function cleanup(effect) {
  for (const subs of effect.deps) {
    subs.delete(effect);
  }

  effect.deps.clear();
}

// 借助闭包的特性，value 不会被垃圾回收掉，而是持续地存在于内存中。
function useState(value) {
  // 保存订阅该 state 变化的 effect
  const subs = new Set();

  // getter 这里是一个函数
  const getter = () => {
    const effect = effectStack[effectStack.length - 1];

    if (effect) {
      subscribe(effect, subs);
    }

    return value;
  };

  const setter = (newValue) => {
    value = newValue;

    for (const effect of [...subs]) {
      effect.execute();
    }
  };

  return [getter, setter];
}

/**
 * 期待的行为：
 * 1. useEffect 执行后，立即执行回调函数
 * 2. 依赖发生变化后，立即执行回调函数
 * 3. 不需要显示指明依赖
 */
function useEffect(callback) {
  const execute = () => {
    cleanup(effect);
    effectStack.push(effect);

    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };

  const effect = {
    execute,
    deps: new Set(),
  };

  execute();
}

function useMemo(callback) {
  const [s, set] = useState();
  useEffect(() => set(callback()));

  return s;
}

// 示例
const [name1, setName1] = useState('Yetao');
const [name2, setName2] = useState('Yewei');
const [showAll, triggerShowAll] = useState(true);

const whoIsHere = useMemo(() => {
  if (!showAll()) {
    return name1();
  }

  return `${name1()} 和 ${name2()}`;
});

useEffect(() => console.log(`谁在那儿! ${whoIsHere()}`));

setName1('Ywhoo');

triggerShowAll(false);
