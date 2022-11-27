const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];

const arr2 = arr1.filter(
  (value, index, array) => array.indexOf(value) === index
);

console.log(arr2, 'arr2');
