const assert = require("assert");

function Person() {}

Person.prototype.dance = function () {
  console.log("dance");
};

function Ywhoo() {}

Ywhoo.prototype = new Person();

Object.defineProperty(Ywhoo.prototype, "constructor", {
  enumerable: false,
  writable: true,
  value: Ywhoo,
});

const ywhoo = new Ywhoo();

assert(ywhoo instanceof Ywhoo, "ywhoo");
assert(ywhoo instanceof Person, "ywhoo");
assert(typeof ywhoo.dance === "function", "ywhoo");
assert(ywhoo.constructor === Ywhoo, "person");
