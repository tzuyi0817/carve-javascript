Array.prototype.privateSplice = function (fromIndex, deleteCount, ...args) {
  const array = Object(this);
  const length = array.length;
  const firstHalf = [];
  const lastHalf = [];
  const result = [];

  fromIndex = fromIndex | 0;
  if (fromIndex < 0) fromIndex = length + fromIndex;
  fromIndex = Math.max(fromIndex, 0);
  deleteCount = deleteCount ?? length;

  for (let index = 0; index < length; index++) {
    const value = array[index];

    if (index < fromIndex) firstHalf.push(value);
    else {
      index <= (fromIndex + deleteCount - 1) ? result.push(value) : lastHalf.push(value);
    }
  }

  array.length = 0;
  [...firstHalf, ...args, ...lastHalf].forEach((value, index) => array[index] = value);
  return result;
}

// setTimeout(() => {
//   const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
//   const removed = myFish.privateSplice(0, 2, 'parrot', 'anemone', 'blue');

//   console.log(myFish);
//   console.log(removed);
// })