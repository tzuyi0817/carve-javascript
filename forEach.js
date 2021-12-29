Array.prototype.privateForEach = function(callback, thisArg) {
  if (this == null) throw new TypeError("this is null or not defined");
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  const array = Object(this);

  for (let index = 0; index < array.length; index++) {
    callback.call(thisArg, array[index], index, array);
  }
}

setTimeout(() => {
  [1, 2, 3, 5].privateForEach((num, index, array) => {
    console.log(num, index, array);
  });
})
