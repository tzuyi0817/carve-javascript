Function.prototype.privateBind = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  const self = this;
  const result = function () {
    self.privateCall(this instanceof result ? this : thisArg, ...args, ...arguments);
  }

  result.prototype = this.prototype;
  return result;
}

// setTimeout(() => {
//   function Point(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
  
//   Point.prototype.toString = function() {
//     return `${this.x}, ${this.y}, ${this.z}`;
//   };
  
//   const p = new Point(1, 2, 3);
//   console.log(p.toString()); // '1, 2, 3'
  
//   const YAxisPoint = Point.privateBind(null, 0);

//   const axisPoint = new YAxisPoint(9, 5);
//   console.log(axisPoint.toString()); // '0, 9, 5'
//   console.log(axisPoint instanceof Point); // true
//   console.log(axisPoint instanceof YAxisPoint); // true
//   console.log(new Point(17, 42) instanceof YAxisPoint); // true
// })
