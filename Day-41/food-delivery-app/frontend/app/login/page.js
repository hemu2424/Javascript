"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link";
import { useState } from "react";


export default function loginPage(){
    const{login} = useAuth();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    const[isSubmitting,setIsSubmitting] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setIsSubmitting(true);


        try{
            await login(email,password);
        }
        catch(err){
          setError(err.response?.data?.message || "Login failed Please try again.");
        }
        finally{
            setIsSubmitting(false);
        }
    }


 return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-orange-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );

}