Array.prototype.privateSplice = function (start, deleteCount, ...args) {
  const array = Object(this);
  const length = array.length;
  const firstHalf = [];
  const lastHalf = [];
  const result = [];

  start = start | 0;
  if (start < 0) start = length + start;
  start = Math.max(start, 0);
  deleteCount = deleteCount ?? length;

  for (let index = 0; index < length; index++) {
    const value = array[index];

    if (index < start) firstHalf.push(value);
    else {
      index <= (start + deleteCount - 1) ? result.push(value) : lastHalf.push(value);
    }
  }

  array.length = 0;
  [...firstHalf, ...args, ...lastHalf].forEach((value, index) => array[index] = value);
  return result;
}

setTimeout(() => {
  const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
  const removed = myFish.privateSplice(-2, 2, 'parrot', 'anemone', 'blue');

  console.log(myFish);
  console.log(removed);
})