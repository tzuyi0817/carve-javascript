Array.prototype.privateFind = function (callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);

  for (let index = 0; index < array.length; index++) {
    const judge = callback.call(thisArg, array[index], index, array);

    if (judge) return array[index];
  }
  return undefined;
}

// setTimeout(() => {
//   const find = [
//     { id: 1, num: 5 },
//     { id: 2, num: 12 },
//     { id: 3, num: 8 },
//     { id: 4, num: 130 },
//     { id: 5, num: 44 },
//   ].privateFind((item, index, array) => {
//     console.log(item, index, array);
//     return item.num > 130;
//   });

//   console.log(find);
// })