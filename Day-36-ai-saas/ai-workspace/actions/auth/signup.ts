"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { signupSchema } from "@/lib/validations/auth";

export async function signup(
  prevState: any,
  formData: FormData
) {
   console.log("Signup action called");

  try {
    const values = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(values);

    const result = signupSchema.safeParse(values);

    if (!result.success) {
      console.log(result.error.flatten());
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    console.log("4. Existing user:", existingUser);

console.log("5. Hashing password");


    const hashedPassword = await hashPassword(
      result.data.password
    );
    console.log("7. Creating user");

    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
    console.log("8. User created");

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch(error) { 
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}