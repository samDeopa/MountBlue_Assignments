/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well
    5. Print out "Program complete" when the promise completes after 3 seconds

    HINT: Use setTimeout for the delay
*/

console.log("Program started");

const promise = new Promise((resolve, reject) => {
  const timer = 3000;
  setTimeout(() => {
    resolve("Program complete");
  }, timer);
});

console.log(promise);
console.log("Program in progress...");

promise.then((res) => {
  console.log(res);
});
