"use server";

import { deleteSessionCookie, getSessionCookie } from "@/lib/cookies";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout(){
    const sessionId =   await getSessionCookie();

    if(sessionId){
        deleteSession(sessionId);
    }
    await deleteSessionCookie();

    redirect("/login")
}