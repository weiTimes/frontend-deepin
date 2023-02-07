const array = ['h', 'e', 'l'];

const proxyArray = new Proxy(array, {
  get: (target, key) => {
    key = +key;

    return target[key < 0 ? target.length + key : key];
  },
  set: (target, key, value) => {
    key = +key;

    target[key < 0 ? target.length + key : key] = value;
  },
});

// proxyArray[-1] = 'ywhoo';

console.log(proxyArray[-1]);
