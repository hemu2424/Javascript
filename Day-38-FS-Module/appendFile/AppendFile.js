const file = require('fs');

file.appendFile("hello1.txt","\n how are u",(err)=>{
    if(err) console.log(err)
        console.log("file appended")
})

file.readFile("hello1.txt","utf-8",(err,data)=>{
    if(err){
        console.log(err)
    }
    else
    {
        console.log(data)
    }

})