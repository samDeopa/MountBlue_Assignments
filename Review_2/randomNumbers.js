function getRandomNumber() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * 10);
      console.log(`Generated random number: ${num}`);
      resolve(num);
    }, (Math.floor(Math.random() * 2) + 1) * 1000);
  });
}

const generateNRandeomNumbers = (n) => {
  let promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(getRandomNumber());
  }
  Promise.all(promises).then((result) => {
    const sum = result.reduce((accumulator, curr) => {
      accumulator += curr;
      return accumulator;
    }, 0);
    console.log(sum);
  });
};

const generateNRandeomNumberPairs = (n) => {
  const promises = [];
  for (let i = 0; i < n; i++) {
    const promise = new Promise((resolve, reject) => {
      getRandomNumber().then((num1) => {
        getRandomNumber().then((num2) => resolve([num1, num2]));
      });
    });
    promises.push(promise);
  }
  return Promise.all(promises).then((res) => {
    const sum = res.reduce((accumulator, curr) => {
      accumulator = accumulator + curr[0] + curr[1];
      return accumulator;
    }, 0);
    return sum;
  });
};

generateNRandeomNumberPairs(10).then((res) => console.log(res));
