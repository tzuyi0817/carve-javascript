import PrivatePromise from "./promise.js";

PrivatePromise.any = function (iterable) {
  let progress = 0;

  return new PrivatePromise((resolve, reject) => {
    iterable.forEach(promise => {
      PrivatePromise.resolve(promise).then(value => {
        resolve(value);
      }, () => {
        progress += 1;
        progress === iterable.length && reject("AggregateError: All promises were rejected");
      });
    });
  });
}

setTimeout(() => {
  const pErr = new PrivatePromise((resolve, reject) => {
    reject("Always fails");
  });
  const pSlow = new PrivatePromise((resolve, reject) => {
    setTimeout(resolve, 500, "Done eventually");
  });
  const pFast = new PrivatePromise((resolve, reject) => {
    setTimeout(resolve, 100, "Done quick");
  });
  
  PrivatePromise.any([pErr, pSlow, pFast]).then((value) => {
    console.log(value);
  })

  const aErr = new Promise((resolve, reject) => {
    reject('Always fails');
  });
  
  Promise.any([aErr]).then((value) => {
    console.log(value);
  })
})