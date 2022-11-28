// 模拟抽象类

// 1. 抽象工厂 - 约定手机的基本组成
class MobilePhoneFactory {
  createOS() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }

  createHardware() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 2. 具体工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS();
  }

  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare();
  }
}

// 3. 抽象产品类
class OS {
  controlHardWare() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 4. 具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log("我会用安卓的方式去操作硬件");
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log("我会用🍎的方式去操作硬件");
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log("我会用高通的方式去运转");
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log("我会用小米的方式去运转");
  }
}

const fakeStar = new FakeStarFactory();
const os = fakeStar.createOS();
const hardware = fakeStar.createHardWare();

os.controlHardWare();
hardware.operateByOrder();
