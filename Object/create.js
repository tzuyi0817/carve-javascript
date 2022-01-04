Object.privateCreate = function (proto, propertiesObject) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError(`Object prototype may only be an Object or null: ${proto}`);
  }

  function F() { }
  F.prototype = proto;
  const result = new F();

  propertiesObject !== undefined && Object.defineProperties(result, propertiesObject);
  proto === null && Object.setPrototypeOf(result, null);
  return result;
}

setTimeout(() => {
  function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
  };
  
  function Rectangle() {
    Shape.call(this);
  }
  
  Rectangle.prototype = Object.privateCreate(Shape.prototype);
  Rectangle.prototype.constructor = Rectangle;
  
  const rect = new Rectangle();
  
  console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);// true
  console.log('Is rect an instance of Shape?', rect instanceof Shape);// true
  rect.move(1, 1); // Outputs, 'Shape moved.'
})
