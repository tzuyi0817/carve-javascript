Array.prototype.privateSlice = function (begin = 0, end = this.length) {
  const arr = Object(this);
  const result = [];
  const init = (index) => {
    index = index | 0;
    return index < 0 ? Math.max(0, index + this.length) : Math.min(index, this.length);
  };

  begin = init(begin);
  end = init(end);

  for (let index = begin; index < end; index++) {
    result.push(arr[index]);
  }
  return result;
}

setTimeout(() => {
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

  console.log(animals.privateSlice(2)); // ["camel", "duck", "elephant"]
  console.log(animals.privateSlice(2, 4)); // ["camel", "duck"]
  console.log(animals.privateSlice(1, 8)); // ["bison", "camel", "duck", "elephant"]
  console.log(animals.privateSlice(-2)); // ["duck", "elephant"]
  console.log(animals.privateSlice(2, -1)); // ["camel", "duck"]
})
