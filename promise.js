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
    typeof onFulfilled !== "function" && (onFulfilled = (value) => value);
    typeof onRejected !== "function" && (onRejected = (reason) => { throw reason });

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

promise.then(
  undefined,
  reason => {
    console.log(reason);
});
