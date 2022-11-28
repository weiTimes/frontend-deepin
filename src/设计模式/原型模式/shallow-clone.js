/*
 * @Author: ywhoo
 * @Date: 2022-11-28 15:30:09
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-11-28 15:33:59
 *
 * 浅拷贝
 */

// 方法1
function shallowClone(obj) {
  let target = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key];
    }
  }

  return target;
}

// 方法二
// 此调用可以对 animal 进行真正准确地拷贝，包括所有的属性：可枚举和不可枚举的，数据属性和 setters/getters —— 包括所有内容，并带有正确的 [[Prototype]]。
const copyByCreate = Object.create(
  Object.getPrototypeOf(animal),
  Object.getOwnPropertyDescriptors(animal)
);

const data = {
  a: 1,
  b: {
    c: "h",
  },
};

const copy = shallowClone(data);

console.log(data.b === copy.b); // true
