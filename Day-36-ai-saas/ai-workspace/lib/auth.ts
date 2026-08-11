
import { getSessionCookie } from "./cookies";
import { prisma } from "./prisma";
import { getUserIdFromSession } from "./session";

export async function getCurrentUser(){
    const token = await getSessionCookie();


if(!token){
return null
}
const session = await getUserIdFromSession(token);

if(!session){
    return null
}

const user = await prisma.user.findUnique({
where:{
    id:session.userId,
},
})
return user;

}