Array.prototype.privateFilter = function (callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);
  const result = [];

  for (let index = 0; index < array.length; index++) {
    const judge = callback.call(thisArg, array[index], index, array);
    judge && result.push(array[index]);
  }
  return result;
}

setTimeout(() => {
  const filter = [1, 2, 3, 4].privateFilter((num, index, array) => {
    console.log(num, index, array);
    return num > 1;
  });

  console.log(filter);
})
