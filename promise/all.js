import PrivatePromise from "./promise.js";

PrivatePromise.all = function (iterable) {
  const result = [];
  let progress = 0;

  return new PrivatePromise((resolve, reject) => {
    iterable.forEach((promise, index) => {
      PrivatePromise.resolve(promise).then(value => {
        progress += 1;
        result[index] = value;
        progress === iterable.length && resolve(result);
      }, error => {
        reject(error);
      })
    })
  })
}

// setTimeout(() => {
//   const p1 = PrivatePromise.resolve(3);
//   const p2 = 1337;
//   const p3 = new PrivatePromise((resolve, reject) => {
//     setTimeout(resolve, 100, 'foo');
//   });

//   PrivatePromise.all([p1, p2, p3]).then(values => {
//     console.log(values); // [3, 1337, "foo"]
//   });

//   const a1 = new PrivatePromise((resolve, reject) => {
//     setTimeout(resolve, 1000, 'one');
//   });
//   const a2 = new PrivatePromise((resolve, reject) => {
//     setTimeout(resolve, 2000, 'two');
//   });
//   const a3 = new PrivatePromise((resolve, reject) => {
//     setTimeout(resolve, 3000, 'three');
//   });
//   const a4 = new PrivatePromise((resolve, reject) => {
//     setTimeout(resolve, 4000, 'four');
//   });
//   const a5 = new PrivatePromise((resolve, reject) => {
//     reject('reject');
//   });
  
//   PrivatePromise.all([a1, a2, a3, a4, a5]).then(values => {
//     console.log(values);
//   }, reason => {
//     console.log(reason); // "reject"
//   });
// })
