Object.privateIs = function (value1, value2) {
  if (value1 === value2) {
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }
  return value1 !== value1 && value2 !== value2;
}

setTimeout(() => {
  console.log(Object.privateIs(25, 25));                // true
  console.log(Object.privateIs('foo', 'foo'));          // true
  console.log(Object.privateIs('foo', 'bar'));          // false
  console.log(Object.privateIs(null, null));            // true
  console.log(Object.privateIs(undefined, undefined));  // true
  console.log(Object.privateIs(window, window));        // true
  console.log(Object.privateIs([], []));                // false
  const foo = { a: 1 };
  const bar = { a: 1 };
  console.log(Object.privateIs(foo, foo));              // true
  console.log(Object.privateIs(foo, bar));              // false

  console.log(Object.privateIs(0, -0));                 // false
  console.log(Object.privateIs(+0, -0));                // false
  console.log(Object.privateIs(-0, -0));                // true
  console.log(Object.privateIs(0n, -0n));               // true

  console.log(Object.privateIs(NaN, 0/0));              // true
  console.log(Object.privateIs(NaN, Number.NaN));        // true
})
