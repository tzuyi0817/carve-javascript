class PrivatePromise {
  static pending = "pending";
  static fulfilled = "fulfilled";
  static rejected = "rejected";

  constructor (fun) {
    this.PromiseState = PrivatePromise.pending;
    this.PromiseResult = null;

    try {
      fun((result) => this.resolve(result), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.PromiseState === PrivatePromise.pending) {
      this.PromiseState = PrivatePromise.fulfilled;
      this.PromiseResult = result;
    }
  }

  reject(reason) {
    if (this.PromiseState === PrivatePromise.pending) {
      this.PromiseState = PrivatePromise.rejected;
      this.PromiseResult = reason;
    }
  }

  then(onFulfilled, onRejected) {
    switch (this.PromiseState) {
      case "fulfilled":
        onFulfilled(this.PromiseResult);
        break;
      case "rejected":
        onRejected(this.PromiseResult);
        break;
    }
  }
};

const promise = new PrivatePromise((resolve, reject) => {
  resolve("123");
});

const promise1 = new PrivatePromise((resolve, reject) => {
  reject("456");
});

const promise2 = new PrivatePromise((resolve, reject) => {
  throw new Error('throw error');
});

promise.then(result => {
  console.log(result);
}, reason => {
  console.log(reason);
});

promise1.then(
  undefined,
  reason => {
  console.log(reason);
});

promise2.then(
  undefined,
  reason => {
  console.log(reason);
});
