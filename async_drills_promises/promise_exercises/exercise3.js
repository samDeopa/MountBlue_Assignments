/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 5 seconds with the
       value {data: "Hello, friend!", error: null}
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Create a first Promise chain using the promise above and
       Print out the resolved value when the first promise fulfills
    6. Have this first promise return another new Promise that will
       fulfill after 2 seconds with the message:
       "First promise chain complete!"
    7. Print out the message from the above promise after it
       fulfills ("First promise chain complete!")

    8. Create a second Promise chain using the first promise above and
       Print out the resolved value when the second promise fulfills
    9. Have this second promise return another new Promise that will
       fulfill after 10 seconds with the message:
       "Second promise chain complete!"
   10. Print out the message from the above promise after it
       fulfills ("Second promise chain complete!")

    HINT: Use setTimeout for the delay
    HINT2: This will be using the same promise two times:
           const myPromise = new Promise(...) // step 2
           myPromise.then(...).then(...) // steps 5-7
           myPromise.then(...).then(...) // steps 8-10

    BONUS: WHY does it work this way?
*/

/*
BONUS: Promise with Multiple .then Handlers

Promises allow for multiple .then() handlers to be attached. 
This is because .then() does not consume the promise. Instead, it creates a new promise that resolves with the return value of the handler.
All attached .then() handlers are queued and executed sequentially once the original promise resolves.

Code  utput:

- "First promise chain complete!" will be logged after 7 seconds.
- "Second promise chain complete!" will be logged after 15 seconds.

This demonstrates that multiple .then() calls can be used to perform different operations on the result of a single promise.
*/
console.log("Program started");

const promise = new Promise((resolve, reject) => {
  const resolveTimer = 5 * 1000;
  setTimeout(() => {
    resolve({ data: "Hello, friend!", error: null });
  }, resolveTimer);
});

console.log(promise);
console.log("Program in progress...");

promise
  .then((res) => {
    console.log(res);
    const resolveTimer = 2 * 1000;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("First promise chain complete!");
      }, resolveTimer);
    });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

promise
  .then((res) => {
    const resolveTimer = 10 * 1000;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Second promise chain complete!");
      }, resolveTimer);
    });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
