class PrivatePromise {
  static pending = "pending";
  static fulfilled = "fulfilled";
  static rejected = "rejected";

  constructor (fun) {
    this.PromiseState = PrivatePromise.pending;
    this.PromiseResult = null;
    fun(() => this.resolve, () => this.reject);
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
};

const promise = new PrivatePromise((resolve, reject) => {
  resolve("123");
});

console.log(promise);
