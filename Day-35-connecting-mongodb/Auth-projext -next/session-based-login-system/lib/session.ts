import { User } from "./users";

export function generateSessionId(): string {
  return crypto.randomUUID();
}

const sessions = new Map<string, User>();

export function createSession(sessionId: string, user: User) {
    console.log("createSession called");
  sessions.set(sessionId, user);
  console.log("Session Created:", sessionId, user);
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}