const file = require('fs');
file.unlink("hello1.txt",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("deleted");
    }
})