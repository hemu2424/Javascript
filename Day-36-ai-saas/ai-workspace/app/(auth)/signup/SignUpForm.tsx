"use client";

import { useActionState } from "react";
import { signup } from "@/actions/auth/signup";

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

      <p>{state.message}</p>
    </form>
  );
}