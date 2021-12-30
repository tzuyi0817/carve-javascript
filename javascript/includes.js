Array.prototype.privateIncludes = function (searchElement, fromIndex) {
  if (this == null) throw new TypeError("this is null or not defined");

  const array = Object(this);
  const length = array.length;
  if (length === 0) return false;

  const check = (a, b) => a === b || (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b));
  let k = fromIndex | 0;
  k = k < 0 ? length + k : k;
  k = Math.max(k, 0);

  for (let index = k; index < length; index++) {
    if (check(array[index], searchElement)) return true;
  }
  return false;
}

// setTimeout(() => {
//   const includes = [1, 2, 3].privateIncludes(2, -1);

//   console.log(includes);
// })
