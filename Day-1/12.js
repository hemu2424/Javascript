console.log(typeof null);               // "object"      // Historical bug

console.log(typeof []);                 // "object"      // Arrays are objects

console.log(typeof function(){});       // "function"    // Special case

console.log(typeof NaN);                // "number"      // NaN is still a number

console.log(typeof typeof 1);           // "string"      // typeof always returns a string

console.log(typeof undefined);          // "undefined"   // Undefined primitive

console.log(typeof abc);                // "undefined"   // Undeclared variable (no error with typeof)

console.log(typeof new Number(5));      // "object"      // Wrapper object

console.log(typeof Object);             // "function"    // Constructor function

console.log(typeof class Test {});      // "function"    // Classes are functions