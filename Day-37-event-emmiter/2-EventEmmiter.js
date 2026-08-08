const EventEmmiter = require("events");

const emitter = new EventEmmiter();


emitter.on("login",(name,phone,age)=>{
    console.log(name)
    console.log(phone)
    console.log(age)


})

emitter.emit("login","hemanshu","1234455667",25);