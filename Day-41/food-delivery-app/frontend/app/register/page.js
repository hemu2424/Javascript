"use client"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage(){

    const {register} = useAuth();
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        role:"user",
        address:"",

    });
    const [error,setError]= useState(false);
    const [isSubmitting,setIssubmitting] = useState(false);    


    const handleChange = (e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
     e.preventDefault();
     setError("");
     setIssubmitting(true);
     try{

        await register(formData);

        
     }
     catch(error){
        setError(error.response.data?.message || "fail to register")
        console.log(error);
     }
     finally{
        setIssubmitting(false);
     }

    }

    return(
        <>
         <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      <form onSubmit={handleSubmit}>
      <button
      type="button"
      onClick={() =>setFormData({...formData,role:"user"})}
  className={`flex-1 border rounded-md py-2 text-sm ${
                formData.role === "user" ? "bg-orange-600 text-white border-orange-600" : ""
              }`}
            >
              Order Food
            </button>
             <button
      type="button"
      onClick={() =>setFormData({...formData,role:"delivery"})}
  className={`flex-1 border rounded-md py-2 text-sm ${
                formData.role === "delivery" ? "bg-orange-600 text-white border-orange-600" : ""
              }`}
            >
              delivery Food
            </button>
<label className="block text-sm font-medium mb-1">Full Name</label>
<label className="block text-sm font-medium mb-1"> Name</label>
            <input
            name="name"
            required
            value = {formData.name}
            onChange={handleChange}

            />
            <label className="block text-sm font-medium mb-1">email</label>
            <input
            type="email"
            onChange={handleChange}
            value={formData.email}

            name="email"
            required
            />
            <label className="block text-sm font-medium mb-1"> phone</label>
             <input
            type="phone"
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            required
            />
            <label className="block text-sm font-medium mb-1">password</label>
             <input
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            min={6}
            /> 
             <label className="block text-sm font-medium mb-1">address</label>
             <input
            
            onChange={handleChange}
            value={formData.address}
            name="address"
            /> 
             <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-2 rounded-md disabled:opacity-50"
          
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
            </form>
             <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-600 hover:underline">
          Login
        </Link>
      </p>


      </div>
        </>

    )

  

}