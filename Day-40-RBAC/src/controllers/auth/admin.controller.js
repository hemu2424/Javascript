import User from "../../models/User.js"

export const getUsersadminController = async(req,res,next)=>{
    try{
    const users = await User.find({});
    
    return res.status(200).json({
        success:true,
        users:users
    })
    }catch(error){
        console.log(error)
    }


}