"use client";

import { useActionState } from "react";
import { registerStudent } from "./actions";
import SubmitButton from "./components/SubmitButton";

const initialState = {
  success: false,
  message: "",
  error:""
};

export default function HomePage() {
  const [state, formAction] = useActionState(
    registerStudent,
    initialState
  );

  return (
    <main>
      <h1>Student Registration</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <SubmitButton />
      </form>

      <br />

      {state.success && <p>{state.message}</p>}

      {!state.success && state.error && <p>{state.error}</p>}
    </main>
  );
}