const range = {
  from: 1,
  to: 5,
};

// generator
range[Symbol.iterator] = function* () {
  let current = this.from;
  let to = this.to;

  for (let i = current; i <= to; i++) {
    yield i;
  }
};

for (const value of range) {
  console.log(value);
}
