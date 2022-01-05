import PrivatePromise from "./promise.js";

PrivatePromise.resolve = function (value) {
  if (value instanceof PrivatePromise) {
    return value;
  }

  return new PrivatePromise(resolve => resolve(value));
}

// setTimeout(() => {
//   PrivatePromise.resolve('Success').then((value) => {
//     console.log(value);
//   });

//   var original = PrivatePromise.resolve(33);
//   var cast = PrivatePromise.resolve(original);
//   cast.then((value) => {
//     console.log('value: ' + value);
//   });
//   console.log('original === cast ? ' + (original === cast));
// })
