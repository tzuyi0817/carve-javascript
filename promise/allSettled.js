import PrivatePromise from "./promise.js";

PrivatePromise.allSettled = function (iterable) {
  const result = [];
  let progress = 0;

  const checkProgress = (resolve) => {
    progress += 1;
    progress === iterable.length && resolve(result);
  };

  return new PrivatePromise(resolve => {
    iterable.forEach((promise, index) => {
      PrivatePromise.resolve(promise).then(value => {
        result[index] = { status: "fulfilled", value };
        checkProgress(resolve);
      }, reason => {
        result[index] = { status: "rejected", reason };
        checkProgress(resolve);
      });
    });
  });
}

// setTimeout(async () => {
//   PrivatePromise.allSettled([
//     PrivatePromise.resolve(33),
//     new PrivatePromise(resolve => setTimeout(() => resolve(66), 0)),
//     99,
//     PrivatePromise.reject(new Error('an error'))
//   ])
//   .then(values => console.log(values));
  
//   const values = await PrivatePromise.allSettled([
//     PrivatePromise.resolve(11),
//     new PrivatePromise(resolve => setTimeout(() => resolve(22), 0)),
//     33,
//     PrivatePromise.reject(new Error('an error'))
//   ])
//   console.log(values)
// })
