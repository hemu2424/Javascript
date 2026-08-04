import { getSession } from "@/lib/session";
import { logout } from "./actions";
import { cookies } from "next/headers";

export default async function LogoutPage() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) {
    return <h1>Please Login</h1>;
  }

  const user = getSession(sessionId);

  if (!user) {
    return <h1>Invalid Session</h1>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Welcome {user.name}</h1>

      <p>Email: {user.email}</p>

      <form action={logout}>
        <button type="submit">
          Logout
        </button>
      </form>
    </main>
  );
}