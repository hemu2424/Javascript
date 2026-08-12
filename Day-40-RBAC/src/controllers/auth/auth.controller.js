import { loginUser, registerUser } from "../../services/auth.services.js";

export const registeruser = async(req,res,next)=>{

    try{
        const user = await registerUser(req.body)
        res.status(201).json({
            success:true,
            message:"chal bidu jake login kar",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

            },
        });

    }
    catch(error){
        next(error)
        console.log(error)

    }

}

export const loginuser = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        const {user,accessToken} = await loginUser({email,password})
        res.status(201).json({
            success:true,
            message:"ok bidu tu authorize he",
            accessToken,
            user:{
                id:user._id,
                name:user.name,
                role:user.role
            },

        })

    }
    catch(error){
        next(error)
        console.log(error)
    }
}