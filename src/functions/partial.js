/**
 * 偏函数/部分应用
 * 接收不定参数
 *
 * @author 和风 wei.ye@perfma.com
 * @param {*} fn
 * @param {*} presetArgs
 */
const partical =
  (fn, ...presetArgs) =>
  (...lastArgs) =>
    fn(...presetArgs, ...lastArgs);

function orderEventHandler(url, data, callback) {
  console.log('event handler', url, data, callback);
}

const fetchOrder = partical(orderEventHandler, 'https://www.baidu.com');

const getCurrentOrder = partical(fetchOrder, { order: '1' });

getCurrentOrder(() => console.log('callback'));

// - 过程

// fetchOrder: (...lastArgs) => orderEventHandler([ 'https://www.baidu.com'], ...lastArgs)

// getCurrentOrder: (...lastArgs) => fetchOrder({ order: '1' }, ...lastArgs)

// 调用getCurrentOrder: (() => console.log('callback')) => fetchOrder({ order: '1' }, () => console.log('callback'))
