const sessions = new Map<string,string>();
export  function createSession(userId:string){
const sessionId = crypto.randomUUID();
sessions.set(sessionId,userId)
return sessionId;
}

export function getUserIdFromSession(sessionId:string){
    return sessions.get(sessionId);
}

export function deleteSession(sessionId:string){
    sessions.delete(sessionId);
}