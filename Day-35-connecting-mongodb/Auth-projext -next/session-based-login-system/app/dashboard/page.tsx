import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
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
    </main>
  );
}