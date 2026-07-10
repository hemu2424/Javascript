console.log("A");

Promise.resolve().then(() => {
    console.log("B");

    Promise.resolve().then(() => {
        console.log("C");
    });

    queueMicrotask(() => {
        console.log("D");
    });

    console.log("E");
});

queueMicrotask(() => {
    console.log("F");

    Promise.resolve().then(() => {
        console.log("G");
    });
});

setTimeout(() => {
    console.log("H");
}, 0);

console.log("I");
// --------------------------------------------------
console.log('start');

function recurse(n) {
  if (n <= 0) return;
  Promise.resolve().then(() => {
    console.log('micro', n);
    recurse(n - 1);
  });
}

setTimeout(() => console.log('timeout'), 0);
recurse(3);

console.log('end');

// --------------------------------------------------


setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => console.log('micro1'));
}, 0);

setTimeout(() => {
  console.log('timeout2');
  Promise.resolve().then(() => console.log('micro2'));
}, 0);

Promise.resolve().then(() => console.log('micro0'));

// --------------------------------------------------

console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve()
  .then(() => {
    console.log(3);
    return Promise.resolve();
  })
  .then(() => console.log(4));

console.log(5);