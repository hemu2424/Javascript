const EventEmmiter = require("events");

const event = new EventEmmiter();


event.once("login",()=>{
    console.log("first")


})
event.emit("login")
event.emit("login")
event.emit("login")
event.emit("login")
