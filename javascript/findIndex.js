Array.prototype.privateFindIndex = function (callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);

  for (let index = 0; index < array.length; index++) {
    const judge = callback.call(thisArg, array[index], index, array);

    if (judge) return index;
  }
  return -1;
}

setTimeout(() => {
  const findIndex = [5, 12, 8, 130, 44].privateFindIndex((num, index, array) => {
    console.log(num, index, array);
    return num > 13;
  });

  console.log(findIndex);
})
