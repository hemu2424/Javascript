"use client";

import { useActionState } from "react";
import { signup } from "@/actions/auth/signup";
import Link from "next/link"

const initialState = {
  success: false,
  message: "",
};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signup,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
      />

      <button disabled={pending}>
        {pending ? "Creating..." : "Create Account"}
      </button>
      <h1>
        <Link href = "/login">login via password</Link>
      </h1><br></br>
       
      <h1>
        <Link href = "/verify-otp">login via otp</Link>
      </h1>
      

      <p>{state.message}</p>
    </form>
  );
}