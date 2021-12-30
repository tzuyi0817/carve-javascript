Array.prototype.privateSome = function (callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);

  for (let index = 0; index < array.length; index++) {
    const judge = callback.call(thisArg, array[index], index, array);

    if (judge) return true;
  }
  return false;
}

// setTimeout(() => {
//   const some = [1, 2, 3, 4].privateSome((num, index, array) => {
//     console.log(num, index, array);
//     return num > 2;
//   });

//   console.log(some);
// })
