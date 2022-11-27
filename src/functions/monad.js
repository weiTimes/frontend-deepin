function Just(val) {
  return { map, chain };

  function map(fn) {
    return Just(fn(val));
  }

  function chain(fn) {
    return fn(val);
  }
}

var A = Just(10);
// var B = A.map((v) => v * 2); // 20
var B = A.chain((v) => v * 2);

console.log(B, 'B');
