"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { setSessionCookie } from "@/lib/cookies";

export default async function verifyOtpAction(
  prevState: any,
  formData: FormData
) {
  console.log("VERIFY OTP ACTION");

  const email = formData.get("email");
  const otp = formData.get("otp");

  console.log("email:", email);
  console.log("otp:", otp);

  if (
    typeof email !== "string" ||
    typeof otp !== "string"
  ) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!otpRecord) {
    return {
      success: false,
      message: "OTP not found",
    };
  }

  console.log("OTP attempts:", otpRecord.attempts);

  if (otpRecord.attempts >= 5) {
    await prisma.otp.delete({
      where: {
        id: otpRecord.id,
      },
    });

    return {
      success: false,
      message: "Too many attempts. Request a new OTP.",
    };
  }

  if (otpRecord.expiresAt < new Date()) {
    await prisma.otp.delete({
      where: {
        id: otpRecord.id,
      },
    });

    return {
      success: false,
      message: "OTP expired. Request a new OTP.",
    };
  }
  console.log("ENTERED OTP:", otp);
console.log("STORED HASH:", otpRecord?.codeHash);

  const isValid = await bcrypt.compare(
    otp,
    otpRecord.codeHash
  );

  console.log("OTP valid:", isValid);

  if (!isValid) {
    await prisma.otp.update({
      where: {
        id: otpRecord.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  await prisma.otp.delete({
    where: {
      id: otpRecord.id,
    },
  });

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
  await prisma.user.update({
    where:{
        id:user.id,
    },
    data:{
        emailVerified:true,
    }
  })

  const sessionToken = await createSession(
    user.id
  );

  await setSessionCookie(sessionToken);

  redirect("/dashboard");
}