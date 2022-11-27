/*
 * @Author: yewei
 * @Date: 2022-11-19 22:16:05
 * @Last Modified by: yewei
 * @Last Modified time: 2022-11-20 21:28:42
 *
 * 创建私有属性
 */

class Widge {
  static #name = 'ywhoo';
  static staticGetName() {
    return Widge.#name;
  }

  getName() {
    return Widge.#name;
  }
}

const w = new Widge();

console.log(w.getName());
