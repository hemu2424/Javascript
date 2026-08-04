"use client";

import { useActionState } from "react";
import { loginUser } from "./actions";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  return (
    <main style={{ padding: "40px" }}>
      <h1>Login</h1>

      <form action={formAction}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
          />
        </div>

        <br />

        <button disabled={isPending}>
          {isPending ? "Logging In..." : "Login"}
        </button>

        <p>{state.message}</p>
      </form>
    </main>
  );
}