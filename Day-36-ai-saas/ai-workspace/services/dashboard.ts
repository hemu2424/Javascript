import { prisma } from "@/lib/prisma"

export async function getdashboardStats(userId:string){
    const user = await prisma.user.findUnique({
        where:{
            id:userId,
        },
        select:{
            name:true,
            email:true,
            role:true,
            createdAt:true
        }
    })

    return{
        user,
    }
}