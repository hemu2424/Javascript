
"use client";

import { useState } from "react";
import { useActionState } from "react";

import { sendLoginOtp } from "@/actions/auth/send-login-otp";
import { verifyLoginOtp } from "@/actions/auth/verify-login-otp";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [sendState, sendAction, sending] =
    useActionState(
      async (
        prevState: typeof initialState,
        formData: FormData
      ) => {
        const result = await sendLoginOtp(
          prevState,
          formData
        );

        if (result.success) {
          setOtpSent(true);
          setEmail(
            formData.get("email") as string
          );
        }

        return result;
      },
      initialState
    );

  const [verifyState, verifyAction, verifying] =
    useActionState(
      verifyLoginOtp,
      initialState
    );

  if (otpSent) {
    return (
      <form action={verifyAction}>
        <h2>Verify OTP</h2>

        <p>
          OTP sent to:
          <br />
          {email}
        </p>

        <input
          type="hidden"
          name="email"
          value={email}
        />

        <input
          name="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter OTP"
        />

        <button
          type="submit"
          disabled={verifying}
        >
          {verifying
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <p>{verifyState.message}</p>
      </form>
    );
  }

  return (
    <form action={sendAction}>
      <h1>Login with OTP</h1>

      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <button
        type="submit"
        disabled={sending}
      >
        {sending
          ? "Sending..."
          : "Send OTP"}
      </button>
      <h2><Link href="/login">lets login with password </Link></h2>

      <p>{sendState.message}</p>
    </form>
  );
}

