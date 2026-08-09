const str = "😀";

console.log("String:", str);
console.log("String Length:", str.length);
console.log("String Code Points:", [...str].length);
console.log("Buffer Byte Length:", Buffer.byteLength(str, "utf8"));