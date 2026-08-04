"use server"

import { createSession, generateSessionId } from "@/lib/session";
import { users } from "@/lib/users";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  message: string;
};

export async function loginUser(prevstate:unknown,formData:FormData): Promise<LoginState> {

    const email = formData.get("email") as string;;
    const password = formData.get("password") as string;

    const user = users.find((user) => user.email === email && user.password === password);
    if(!user){
        return {
            success:false,
            message:"Invalid email or password"
        }
    }
     const sessionId = generateSessionId();

  const cookieStore = await cookies();
  createSession(sessionId, user);

  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, 
  });


    return {
        success:true,
        message:"Login successful"
    }


}