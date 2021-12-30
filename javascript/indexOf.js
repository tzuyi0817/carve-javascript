Array.prototype.privateIndexOf = function (searchElement, fromIndex) {
  if (this == null) throw new TypeError("this is null or not defined");

  const array = Object(this);
  const length = array.length;
  if (length === 0) return -1;

  let k = fromIndex | 0;
  k = k < 0 ? k + length : k;
  k = Math.max(k, 0);

  for (let index = k; index < array.length; index++) {
    if (array[index] === searchElement) return index;
  }
  return -1;
}

String.prototype.privateIndexOf = function (searchElement, fromIndex) {
  if (searchElement instanceof RegExp) throw new TypeError("first argument must not be a RegExp");

  const length = this.length;
  if (length === 0) return -1;

  let k = fromIndex | 0;
  k = k < 0 ? k + length : k;
  k = Math.max(k, 0);

  for (let index = k; index < length; index++) {
    if (this[index] === searchElement[0]) {
      if (this.slice(index, index + searchElement.length) === searchElement) return index;
    }
  }
  return -1;
}

setTimeout(() => {
  const indexOfArray = ['ant', 'bison', 'camel', 'duck', 'bison'].privateIndexOf('bison', -2);
  const indexOfString = "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?".privateIndexOf("dog", -30);

  console.log(indexOfArray);
  console.log(indexOfString);
})
