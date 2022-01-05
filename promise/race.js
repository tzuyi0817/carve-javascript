import PrivatePromise from "./promise.js";

PrivatePromise.race = function (iterable) {
  return new PrivatePromise((resolve, reject) => {
    iterable.forEach(promise => {
      PrivatePromise.resolve(promise).then(value => {
        resolve(value);
      }, error => {
        reject(error);
      })
    });
  });
}

setTimeout(() => {
  const p1 = new PrivatePromise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
  });
  const p2 = new PrivatePromise(function(resolve, reject) {
    setTimeout(resolve, 100, 'two');
  });

  PrivatePromise.race([p1, p2]).then((value) => {
    console.log(value); // "two"
  });

  const p3 = new PrivatePromise(function(resolve, reject) {
    setTimeout(resolve, 100, 'three');
  });
  const p4 = new PrivatePromise(function(resolve, reject) {
    setTimeout(reject, 500, 'four');
  });

  PrivatePromise.race([p3, p4]).then((value) => {
    console.log(value); // "three"
  }, function(reason) {
    console.log(reason);
  });

  const p5 = new PrivatePromise(function(resolve, reject) {
    setTimeout(resolve, 500, 'five');
  });
  const p6 = new PrivatePromise(function(resolve, reject) {
    setTimeout(reject, 100, 'six');
  });

  PrivatePromise.race([p5, p6]).then((value) => {
    // Not called
  }, function(reason) {
    console.log(reason); // "six"
  });
})
