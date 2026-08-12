import bcrypt from "bcrypt"

export const hashpassword= async(password)=>{

    return await bcrypt.hash(password,12);
}

export const comparepassword = async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}