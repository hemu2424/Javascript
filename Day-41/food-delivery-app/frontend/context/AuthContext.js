"use client"

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);
    const router = useRouter()



    useEffect(()=>{
        async function checkAuth(){
            try{
                const response = await api.get("/auth/me")
                
                setUser(response.data.user ?? response.data);

            }
            catch(error){

                setUser(null);
            }
            finally{
                setLoading(false)
            }
        }
        checkAuth()

    },[])


async function login(email,password){

    const response = await api.post("/auth/login",{email,password})
    const user = response.data.user ?? response.data;
    setUser(user);
    redirectedByRole(user.role);
    return user;
}

async function register(formData){

    const response = await api.post("/auth/register",formData);
    const user = response.data.user ?? response.data;
    setUser(user);
    redirectedByRole(user.role);
    return user
}
  async function logout() {
    await api.post("/auth/logout"); 
    setUser(null);
    router.push("/login");
  }

function redirectedByRole(role){
    if(role === "admin"){ router.push("/admin/dashboard"); }
    else if(role === "delivery") { router.push("/delivery/dashboard"); }
    else { router.push("/user/dashboard"); }

}

return (
    <AuthContext.Provider value = {{user,loading,register,login,logout}}>
        {children}
    </AuthContext.Provider>
)

}
//bhai aa custom hook che jo usethisstrt thai che etle k reusable logic
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}