Array.prototype.privateSort = function (compareFunction) {
  const arr = Object(this);
  const checkCompare = typeof compareFunction === "function";
  const checkValue = (value) => typeof value === "number" ? `${value}` : value;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i];
      const b = arr[j];
      const judge = checkCompare
        ? compareFunction(a, b) > 0
        : checkValue(a) > checkValue(b);

      if (judge) [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

// setTimeout(() => {
//   const stringArray = ['Blue', 'Humpback', 'Beluga'];
//   const numericStringArray = ['80', '9', '700'];
//   const numberArray = [40, 1, 5, 200];
//   const mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

//   function compareNumbers(a, b) {
//     return a - b;
//   }

//   console.log('stringArray:', stringArray.join());
//   console.log('Sorted:', stringArray.privateSort());

//   console.log('numberArray:', numberArray.join());
//   console.log('Sorted without a compare function:', numberArray.privateSort());
//   console.log('Sorted with compareNumbers:', numberArray.privateSort(compareNumbers));

//   console.log('numericStringArray:', numericStringArray.join());
//   console.log('Sorted without a compare function:', numericStringArray.privateSort());
//   console.log('Sorted with compareNumbers:', numericStringArray.sort(compareNumbers));

//   console.log('mixedNumericArray:', mixedNumericArray.join());
//   console.log('Sorted without a compare function:', mixedNumericArray.privateSort());
//   console.log('Sorted with compareNumbers:', mixedNumericArray.privateSort(compareNumbers));
// })