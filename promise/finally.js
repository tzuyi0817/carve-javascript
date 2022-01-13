import PrivatePromise from "./promise.js";

PrivatePromise.prototype.finally = function (callback) {
  return this.then(
    value => PrivatePromise.resolve(callback()).then(() => value),
    reason => PrivatePromise.resolve(callback()).then(() => { throw reason })
  );
}

// setTimeout(() => {
//   PrivatePromise
//     .resolve(1)
//     .finally(val => console.log(val)) // undefined
//     .then(val => console.log(val)) // 1
// })