import jwt from "jsonwebtoken"

export const generateToken = (user) =>{
    return jwt.sign({
        
            userId : user._id.toString(),
            role : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.EXPIRESIN || "30m"
        
    }
)
}


export const verifyAccessToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}