"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export async function logout() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session_id")?.value;

  if (sessionId) {
    deleteSession(sessionId);
  }

  cookieStore.delete("session_id");

      redirect("/login");
}