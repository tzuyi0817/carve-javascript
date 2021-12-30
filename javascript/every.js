Array.prototype.privateEvery = function (callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);

  for (let index = 0; index < array.length; index++) {
    const judge = callback.call(thisArg, array[index], index, array);

    if (!judge) return false;
  }
  return true;
}

// setTimeout(() => {
//   const every = [1, 30, 39, 29, 10, 13].privateEvery((num, index, array) => {
//     console.log(num, index, array);
//     return num < 40;
//   })

//   console.log(every);
// })
