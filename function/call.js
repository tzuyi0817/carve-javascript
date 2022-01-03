Function.prototype.privateCall = function (thisArg, ...args) {
  thisArg = thisArg ?? window;
  thisArg.fn = this;
  
  const result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
}

// setTimeout(() => {
//   function Test(name) {
//     this.value = "123";
//     this.name = name;
//   }

//   function TestSub(name) {
//     Test.privateCall(this, name);
//   }

//   const test = new TestSub("???");
//   console.log(test);
//   console.log(test.name);
//   console.log(test.value);

//   const personOne = {
//     name: "張三",
//     age: 12,
//     say: function (gender, phone) {
//       console.log(`${this.name}, ${this.age}, ${gender}, ${phone}`);
//     }
//   };

//   const personTwo = {
//     name: "李四",
//     age: 24
//   };

//   personOne.say.privateCall(personTwo, "male", 123456789);
// })
