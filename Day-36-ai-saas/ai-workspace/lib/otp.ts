import crypto from "crypto"
import bcrypt from "bcrypt"



export  function generateOtp(){
    return crypto
    .randomInt(100000,1000000)
    .toString();
}
export  function hashOtp(otp:string){
    return bcrypt.hash(otp,10)

}

export function verifyOtp(otp:string,hash:string){
    return bcrypt.compare(otp,hash)
}