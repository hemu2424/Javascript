import { verifyAccessToken } from "../../utils/jwt.js";
import User from "../../models/User.js";

export const authenticate  = async(req,res,next) =>{
    try{
    const authorize = req.headers.authorization;

    if(!authorize ){
        return res.status(401).json({
            success:false,
            message:"Authentication failed. Please login."
        })
    }

    const [schema,token ] = authorize.split(" ");

    if(schema !== "Bearer" || !token){
        return res.status(401).json({
            success:false,
            message:"Invalid authorization header"
        })
    }

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user does not exist"
            })
        }

        if(!user.isActive){
            return res.status(401).json({
                success:false,
                message:"inactive"
            })
        }


        req.user = user
        next()
    }catch(error){
        res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }

}