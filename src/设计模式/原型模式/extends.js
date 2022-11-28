/*
 * @Author: ywhoo
 * @Date: 2022-11-28 10:16:07
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-11-28 10:21:39
 *
 * 继承
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
};

function Ywhoo(work) {
  this.work = work;
}

Ywhoo.prototype = new Person();

Object.defineProperty(Ywhoo.prototype, "constructor", {
  enumerable: false,
  value: Ywhoo,
});

const user = new Ywhoo("frontend");

console.log(user);
