import PrivatePromise from "./promise.js";

PrivatePromise.reject = function (reason) {
  return new PrivatePromise((resolve, reject) => reject(reason));
}

setTimeout(() => {
  PrivatePromise.reject(new Error('fail')).then(function (error) {
    // not called
  }, function (error) {
    console.log(error); // Stacktrace
  });
})
