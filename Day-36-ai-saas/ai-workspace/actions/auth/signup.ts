"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { signupSchema } from "@/lib/validations/auth";
import { createOtp } from "@/services/otp";
import { redirect } from "next/navigation";

export async function signup(
  prevState: any,
  formData: FormData
) {
 

  let email: string;

  try {
    const values = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = signupSchema.safeParse(values);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    email = result.data.email;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const hashedPassword = await hashPassword(
      result.data.password
    );

    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        emailVerified: false,
      },
    });

    console.log("User created:", user.email);
    return {
      success: true,
      message: "chal have login kar",
    };
   
    
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
  

  
}