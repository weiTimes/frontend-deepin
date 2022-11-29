const assert = require('assert');

const daimyo = { name: 'Matusu', clan: 'Takasu' };

const proxy = new Proxy(daimyo, {
  get: (target, key) => {
    if (key === 'clan') {
      return 'Ywhoo';
    }
  },
  set: (target, key, value) => {
    target[key] = value;
  },
});

proxy.clan = 'abc';

console.log(daimyo);
console.log(proxy);
