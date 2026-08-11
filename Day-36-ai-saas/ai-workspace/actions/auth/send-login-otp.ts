
"use server";

import { prisma } from "@/lib/prisma";
import { createOtp } from "@/services/otp";

export async function sendLoginOtp(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email");

  if (typeof email !== "string") {
    return {
      success: false,
      message: "Invalid email",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "No account found with this email",
    };
  }

  // if (!user.emailVerified) {
  //   return {
  //     success: false,
  //     message: "Please verify your email first",
  //   };
  // }

   try {
    await createOtp(email);

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("OTP error:", error);

    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
}
