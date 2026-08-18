import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users } from "../models/Users.js";

function generateToken(user){
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
}

function setTokenCookie(res,token){
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};


async function register (req,res,next){
try{
const {name,email,phone,password,address,role} = req.body;
const existingUser = await Users.findOne({email});
if(existingUser){
    return res.status(400).json({
        message:"user already exist"
    });
}
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password,salt);

const user = await Users.create({
    name,
    email,
    phone,
    password: hashPassword,
    address,
    role,
});

    const token = generateToken(user);

    setTokenCookie(res,token);
    res.status(201).json({
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
            isApproved:user.isApproved,

        },
        token:token
    });

}
catch(error){
next(error)

}
}


async function login (req,res,next){
    try{
        const {email,password} = req.body;
        const user = await Users.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"this user is not existing in database"
            });

        }
        if(user.isBlocked){
            return res.status(403).json({
                message:"this user does not exist"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user);
        setTokenCookie(res, token);
        res.status(200).json({
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            isApproved:user.isApproved,

        },
        token: token
    });

    
    }

    catch(error){
        next(error)

    }


    
}

    async function logout(req,res,next){
        try{
            res.clearCookie("token", COOKIE_OPTIONS);
            res.status(200).json({
                message:"u are logged out"
            })

        }
        catch(error){
            next(error)
        }
    }


async function getProfile(req, res, next) {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
}

export {register,login,logout,getProfile};