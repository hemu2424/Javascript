"use server";

import { createOtp } from "@/services/otp";

export async function testOtp() {
  const otp = await createOtp("test@example.com");

  console.log("OTP:", otp);
}