/*
    1. Create a Promise that resolves with the number 10 after
       3 seconds
    2. Create another Promise that resolves with the number
       20 after 5 seconds

    How can we log out the sum (30) of these two resolved values
    once, after BOTH promises successfully fulfill?

    HINT: Use Google/Documentation to help find an answer
    HINT2: You can Google for something like:
           "resolve 2 promises at the same time javascript"
*/

const promise1 = new Promise((resolve, reject) => {
  const timer = 3 * 1000;
  setTimeout(() => {
    resolve(10);
  }, timer);
});

const promise2 = new Promise((resolve, reject) => {
  const timer = 5 * 1000;
  setTimeout(() => {
    resolve(20);
  }, timer);
});

Promise.all([promise1, promise2]).then((result) => {
  console.log(result[0] + result[1]);
});

// calling one promise inside another

// promise2.then((res) => {
//     promise1.then((res2) => {
//       console.log(res + res2);
//     });
//   });
