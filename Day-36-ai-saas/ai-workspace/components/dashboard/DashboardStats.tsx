import { getdashboardStats } from "@/services/dashboard"

export default async function DashboardStats({
    userId,
}:{
    userId:string
})

{
    const {user} = await getdashboardStats(userId);
    
        if(!user){
            return null
        }
    
    return(
        <>
         <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Name
        </p>

        <p className="mt-1 font-semibold">
          {user.name}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Email
        </p>

        <p className="mt-1 font-semibold">
          {user.email}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Role
        </p>

        <p className="mt-1 font-semibold">
          {user.role}
        </p>
      </div>
      </div>


        
        </>
    )
}