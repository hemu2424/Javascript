const Event = require("events");


const emitter = new Event();


emitter.on("login",()=>{

    console.log("User logged in sms");
})
emitter.off("login",()=>{
    console.log("User logged in phone");
})
emitter.on("login",()=>{

    console.log("User logged in 3");
})
emitter.emit("login");


// emitter.off("login",()=>{

// });
