import { sendOtpEmail } from "@/lib/email";
import {
  generateOtp,
  hashOtp,
  verifyOtp,
} from "@/lib/otp";

import { prisma } from "@/lib/prisma";

const OTP_EXPIRY = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5

export async function createOtp(email: string) {
  const otp = generateOtp();

  const codeHash = await hashOtp(otp);

  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY
  );

  await prisma.otp.deleteMany({
    where: {
      email,
    },
  });
  await sendOtpEmail(email, otp);


  await prisma.otp.create({
    data: {
      email,
      codeHash,
      expiresAt,
    },
  });


}

export async function verifyEmailOtp(
  email: string,
  otp: string
) {
  const record = await prisma.otp.findFirst({
    where: {
      email,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!record) {
    return {
      success: false,
      message: "OTP not found",
    };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await prisma.otp.delete({
      where: {
        id: record.id,
      },
    });

    return {
      success: false,
      message: "Too many attempts. Request a new OTP.",
    };
  }

  if (record.expiresAt < new Date()) {
    await prisma.otp.delete({
      where: {
        id: record.id,
      },
    });

    return {
      success: false,
      message: "OTP expired. Request a new OTP.",
    };
  }

  const valid = await verifyOtp(
    otp,
    record.codeHash
  );

  if (!valid) {
    await prisma.otp.update({
      where: {
        id: record.id,
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
      id: record.id,
    },
  });
  

  return {
    success: true,
    message: "OTP verified",
  };
}