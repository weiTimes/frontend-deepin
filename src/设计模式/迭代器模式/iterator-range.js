const range = {
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  let current = this.from;
  let to = this.to;

  return {
    next() {
      const done = current > to;
      const value = done ? undefined : current++;

      return {
        done,
        value,
      };
    },
  };
};

for (const value of range) {
  console.log(value);
}
