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

    switch (this.PromiseState) {
      case "pending":
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
        break;
      case "fulfilled":
        setTimeout(() => {
          onFulfilled(this.PromiseResult);
        });
        break;
      case "rejected":
        setTimeout(() => {
          onRejected(this.PromiseResult);
        });
        break;
    }
  }
};

console.log("start");

const promise = new PrivatePromise((resolve, reject) => {
  console.log("promise")
  setTimeout(() => {
    resolve("123");
    console.log("setTimeout");
  })
});


promise.then(result => {
  console.log(result);
}, reason => {
  console.log(reason);
});

console.log("end");
