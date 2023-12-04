function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, Math.floor(Math.random() * 1000));
}

/*because we can normally get the result of the addition, we need to make a callback that can send the resolve to take the result
return a promise that have the result on fulfilled state
*/
const promiseAdd = (a, b) => {
  return new Promise((resolve) => {
    const someCB = (nullParam, result) => {
      resolve(result);
    };
    asyncAdd(a, b, someCB);
  });
};

//implement the sum function using promiseAdd to add 2 number
const sum = async (...args) => {
  let result = 0;
  for (let num of args) {
    result = await promiseAdd(result, num);
  }

  return result;
};

(async () => {
  const result1 = await sum(1, 4, 6, 9, 2, 4);
  const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
  const result3 = await sum(1, 6, 0, 5);
  console.log([result1, result2, result3]); // [26, 36, 12]
})();
