import PrivatePromise from "./promise.js";

PrivatePromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

setTimeout(() => {
  PrivatePromise
    .reject("error")
    .finally(val => console.log(val)) // undefined
    .catch(reason => console.log(reason)) // error
})