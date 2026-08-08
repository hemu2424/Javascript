const file = require('fs');

file.readFile("hello1.txt","utf-8",(err,data)=>{
    if(err) console.log(err);
    console.log("File has been written successfully:",data);
})