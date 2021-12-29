Array.prototype.privateMap = function(callback, thisArg) {
  if (this == null) throw TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);
  const result = [];

  for (let index = 0; index < array.length; index++) {
    result[index] = callback.call(thisArg, array[index], index, array);
  }
  return result;
}

setTimeout(() => {
  const map = [1, 2, 3].privateMap((num, index, array) => {
    console.log(num, index, array)
    return num * 2;
  })

  console.log(map);
})
