
"use server";

import { prisma } from "@/lib/prisma";
import { verifyEmailOtp } from "@/services/otp";
import { createSession } from "@/lib/session";
import { setSessionCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export async function verifyLoginOtp(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email");
  const otp = formData.get("otp");

  if (
    typeof email !== "string" ||
    typeof otp !== "string"
  ) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  const result = await verifyEmailOtp(
    email,
    otp
  );

  if (!result.success) {
    return result;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  

  // if (!user.emailVerified) {
  //   return {
  //     success: false,
  //     message: "Email is not verified",
  //   };
  // }

  const sessionToken = await createSession(
    user.id
  );

  await setSessionCookie(sessionToken);

  redirect("/dashboard");
}
