
import DashboardStats from "@/components/dashboard/DashboardStats";
import LogoutButton from "@/components/dashboard/LogoutButton";
import StatsSleleton from "@/components/dashboard/StatsSkeleton";
import { getCurrentUser } from "@/lib/auth";
import {redirect} from "next/navigation"
import { Suspense } from "react";

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if(!user){
    redirect("/login")
  }

  return(<>
    <div>
      <h1 className="text-2xl font-bold">
        Welcome back, {user.name}
      </h1>

      <p className="mt-2 text-gray-500">
        Manage your AI workspace from here.
      </p>

      <div className="mt-8">
        <Suspense fallback={<StatsSleleton />}>
          <DashboardStats userId={user.id} />
        </Suspense>
      </div>
    </div>
  </>) ;
}