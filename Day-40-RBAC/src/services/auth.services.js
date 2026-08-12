import { compare } from "bcrypt";
import User from "../models/User.js"
import { hashpassword } from "../utils/password.js"
import { generateToken } from "../utils/jwt.js";

export const registerUser = async({name,email,password}) =>{
    const kyauserhe = await User.findOne({
        email
    })

    if(kyauserhe){
        const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
    }

        const hashedpassword = await hashpassword(password);


        const user = await User.create({
            name,email,password:hashedpassword

        })
        return user



    }

export const loginUser = async({email,password})=>{
    const user = await User.findOne({
        email
    }).select("+password");
    if(!user){
        const error = new Error("bhai essa koi nai he yaha pe pele jake register kar");
        error.statusCode = 401;
        throw error;
    }
    const ispasswordcorrect =  await compare(password,user.password);

    if(!ispasswordcorrect){
        const error = new Error("bhai password khoto che");
        error.statusCode = 401;
        throw error;
    }

    if(!user.isActive){
        const error = new Error("tu unactive he jaa ke admin ko bol");
        error.statusCode = 403;
        throw error;

    }
    const accessToken = generateToken(user);

    return {
        user,
        accessToken
    }

}