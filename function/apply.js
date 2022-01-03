Function.prototype.privateApply = function (thisArg, argsArray = []) {
  thisArg = thisArg ?? window;
  thisArg.fn = this;

  const result = thisArg.fn(...argsArray);
  delete thisArg.fn;
  return result;
}

setTimeout(() => {
  function Test(name) {
    this.value = "123";
    this.name = name;
  }

  function TestSub(name) {
    Test.privateApply(this, [name]);
  }

  const test = new TestSub("???");
  console.log(test);
  console.log(test.name);
  console.log(test.value);

  const personOne = {
    name: "張三",
    age: 12,
    say: function (gender, phone) {
      console.log(`${this.name}, ${this.age}, ${gender}, ${phone}`);
    }
  };

  const personTwo = {
    name: "李四",
    age: 24
  };

  personOne.say.privateApply(personTwo, ["male", 123456789]);
})