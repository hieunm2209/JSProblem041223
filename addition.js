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

//implement the sum function using promiseAdd to add 2 number, optimize the calculate time by adding pairs of numbers at the same time
const sum = async (...args) => {
  if (args.length === 1) {
    return args[0];
  }
  if (args.length === 2) {
    return await promiseAdd(args[0], args[1]);
  }

  const promiseArr = [];

  for (let i = 0; i < args.length - 1; i += 2) {
    promiseArr.push(promiseAdd(args[i], args[i + 1]));
  }

  const newArgs = await Promise.all(promiseArr);
  if (args.length % 2 === 1) {
    newArgs.push(args[args.length - 1]);
  }

  return await sum(...newArgs);
};

(async () => {
  const result1 = await sum(1, 4, 6, 9, 2, 4);
  const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
  const result3 = await sum(1, 6, 0, 5);
  console.log([result1, result2, result3]); // [26, 36, 12]
})();
