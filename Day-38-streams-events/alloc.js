const buffer = Buffer.allocUnsafe(10);
console.log('Buffer:', buffer);
console.log('Buffer Length:', buffer.length);
console.log('Buffer Content:', buffer.toString());
const ab = new ArrayBuffer(8);
console.log('ArrayBuffer:', ab);
const view = new Uint8Array(ab);
console.log('View:', view);