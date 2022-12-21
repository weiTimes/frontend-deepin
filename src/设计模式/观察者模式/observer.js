/*
 * @Author: ywhoo
 * @Date: 2022-12-19 23:56:42
 * @Last Modified by: ywhoo
 * @Last Modified time: 2022-12-20 17:25:01
 *
 * 观察者模式
 */
class Publisher {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers.forEach((o, index) => {
      if (o === observer) {
        this.observers.splice(index, 1);
      }
    });
  }

  notify() {
    this.observers.forEach((o) => o.update(this));
  }
}

class PrdPublisher extends Publisher {
  constructor() {
    super();

    this.observers = [];
    this.prdState = null;
  }

  getState() {
    return this.prdState;
  }

  setState(state) {
    this.prdState = state;

    this.notify();
  }
}

class Observer {
  constructor() {}

  update() {}
}

class DevObserver extends Observer {
  constructor() {
    super();

    this.prdState = null;
  }

  update(publisher) {
    console.log('接收到订阅通知');

    this.prdState = publisher.getState();

    this.work();
  }

  work() {
    console.log(`打印需求文档: ${JSON.stringify(this.prdState)}`);
  }
}

const publisher = new PrdPublisher();
const o1 = new DevObserver();
const o2 = new DevObserver();
const o3 = new DevObserver();

publisher.add(o1);
publisher.add(o2);
publisher.add(o3);

publisher.remove(o1);

publisher.setState({
  title: '我是需求文档',
});
