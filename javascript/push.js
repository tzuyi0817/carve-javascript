Array.prototype.privatePush = function (...args) {
  const array = Object(this);

  for (const value of args) {
    array[array.length] = value;
  }
  return array.length;
}

// setTimeout(() => {
//   const animals = ['pigs', 'goats', 'sheep'];

//   const count = animals.privatePush('cows');
//   console.log(count);
//   console.log(animals);

//   animals.privatePush('chickens', 'cats', 'dogs');
//   console.log(animals);

//   null.privatePush(1);
// })
