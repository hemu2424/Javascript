import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export async function setSessionCookie(sessionId:string){
    const cookiestore = await cookies();
    cookiestore.set(SESSION_COOKIE,sessionId,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:60*60*24*7,
    })
}


export async function getSessionCookie(){
    const cookiestore = await cookies();
    return cookiestore.get(SESSION_COOKIE)?.value;
}

export async function deleteSessionCookie(){
    const cookiestore = await cookies();
    cookiestore.delete(SESSION_COOKIE);
}