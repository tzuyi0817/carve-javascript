class PrivatePromise {
  static pending = "pending";
  static fulfilled = "fulfilled";
  static rejected = "rejected";

  constructor (fun) {
    this.PromiseState = PrivatePromise.pending;
    this.PromiseResult = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    try {
      fun((result) => this.resolve(result), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.PromiseState === PrivatePromise.pending) {
      setTimeout(() => {
        this.PromiseState = PrivatePromise.fulfilled;
        this.PromiseResult = result;
        this.onFulfilledCallback.forEach(onFulfilled => onFulfilled(result));
      });
    }
  }

  reject(reason) {
    if (this.PromiseState === PrivatePromise.pending) {
      setTimeout(() => {
        this.PromiseState = PrivatePromise.rejected;
        this.PromiseResult = reason;
        this.onRejectedCallback.forEach(onRejected => onRejected(reason));
      });
    }
  }

  then(onFulfilled, onRejected) {
    typeof onFulfilled !== "function" && (onFulfilled = (value) => value);
    typeof onRejected !== "function" && (onRejected = (reason) => { throw reason });

    const callbackPromise = new PrivatePromise((resolve, reject) => {
      switch (this.PromiseState) {
        case "pending":
          this.onFulfilledCallback.push(() => {
            processPromise(callbackPromise, resolve, reject, onFulfilled(this.PromiseResult));
          });
          this.onRejectedCallback.push(() => {
            processPromise(callbackPromise, resolve, reject, onRejected(this.PromiseResult));
          });
          break;
        case "fulfilled":
          processPromise(callbackPromise, resolve, reject, onFulfilled(this.PromiseResult));
          break;
        case "rejected":
          processPromise(callbackPromise, resolve, reject, onRejected(this.PromiseResult));
          break;
      }
    });
  }
};

function processPromise() {
  const [promise, resolve, reject, callback] = arguments;

  setTimeout(() => {
    try {
      if (promise === callback) return reject(new TypeError("Chaining cycle detected for promise")); // 避免引用同個 promise 報錯
      if (callback instanceof PrivatePromise) {
        switch (callback.PromiseState) {
          case "pending":
            callback.then(result => {
              processPromise(promise, resolve, reject, result);
            }, reject);
            break;
          case "fulfilled":
            resolve(callback.PromiseResult);
            break;
          case "rejected":
            reject(callback.PromiseResult);
            break;
        }
      } else {
        resolve(callback);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const promise = new Promise((resolve, reject) => {
  resolve("resolve")
});

promise.then(value => {
  console.log(value)
  return value + "1";
}).then(value => {
  console.log(value)
  return value + "2";
}).then(value => {
  console.log(value)
  return value + "3";
}).then(value => {
  console.log(value)
  return value + "4";
})
