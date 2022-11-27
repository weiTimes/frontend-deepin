const isType = (type) => (obj) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;

console.log(isType('Object')({}));
console.log(isType('Number')(2));
console.log(isType('Array')([1]));
