// let name = "Global";

// function outer() {

//     let name = "Outer";

//     return function () {
//         console.log(name);
//     };
// }

// const show = outer();

// function another(fn) {

//     let name = "Another";

//     fn();
// }

// another(show);

// let a = 10;

// function first() {

//     let a = 20;

//     function second() {

//         let a = 30;

//         function third() {
//             console.log(a);
//         }

//         third();
//     }

//     second();
// }

// first();

// let a = 10;

// function first() {

//     let a = 20;

//     function second() {

//         let a = 30;

//         function third() {
//             console.log(a);
//         }

//         third();
//     }

//     second();
// }

// first();

// function debounce(fn, delay) {

//     let timer;

//     return function () {

//         clearTimeout(timer);

//         timer = setTimeout(() => {

//             fn();

//         }, delay);

//     };

// }

function multiply(a) {

    return function (b) {

        return a / b;

    };

}

const double = multiply(1);

console.log(double(2));
console.log(double(10));
console.log(double(100));

function outer(a) {

    return function (b) {

        return function (c) {

            console.log(a, b, c);

        };

    };

}

const fn = outer(1);

const fn2 = fn(2);

fn2(3);