Array.prototype.privateReduce = function (callback, initialValue) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);
  let accumulator = initialValue;
  let k = 0;

  if (arguments.length === 1) {
    while (!(k in array)) {
      if (k > array.length - 1) throw new TypeError("Reduce of empty array with no initial value");
      k += 1;
    }
    accumulator = array[k++];
  }

  for (let index = k; index < array.length; index++) {
    if (index in array) accumulator = callback(accumulator, array[index], index, array);
  }
  return accumulator;
}

// setTimeout(() => {
//   const reduce = [15, 5, 5, 6].privateReduce((accumulator, currentValue, currentIndex, array) => {
//     console.log(accumulator, currentValue, currentIndex, array);
//     return accumulator + currentValue;
//   }, 10)

//   console.log(reduce);
// })
