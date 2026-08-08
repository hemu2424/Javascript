const Event = require("events");

const emitter = new Event();
console.log(emitter._events);

emitter.on("login",()=>{
    console.log("User logged in sms");
})
emitter.on("login",()=>{
    console.log("User logged in phone");
})
emitter.on("login",()=>{
    console.log("User logged in mail");
})
emitter.on("login",()=>{
    console.log("User logged in alert");
})

emitter.emit("login");