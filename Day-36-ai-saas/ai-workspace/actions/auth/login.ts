"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { LoginSchema } from "@/lib/validations/auth";
import { createSession } from "@/lib/session";
import { setSessionCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";


export async function login(
  prevState:any,
  formData:FormData
){

  const values = {
    email: formData.get("email"),
    password: formData.get("password"),
  };


  const result =
    LoginSchema.safeParse(values);


  if(!result.success){
    return {
      success:false,
      message:
      result.error.issues[0].message
    };
  }


  const user =
    await prisma.user.findUnique({
      where:{
        email:
        result.data.email
      }
    });


  if(!user){
    return {
      success:false,
      message:
      "Invalid credentials"
    };
  }


  const passwordMatch =
    await comparePassword(
      result.data.password,
      user.password
    );


  if(!passwordMatch){
    return {
      success:false,
      message:
      "Invalid credentials"
    };
  }


  const sessionId =
    await createSession(user.id);


  await setSessionCookie(
    sessionId
  );


  redirect("/dashboard");
}