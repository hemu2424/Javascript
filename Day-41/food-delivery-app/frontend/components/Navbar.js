"use client"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navabar(){

    const{logout,user} = useAuth()

    const homeLink = !user ? "/" : user.role === "user" ? "/user/dashboard" : user.role === "delivery" ? "/delivery/dashboard"  : "/user/dashboard"


    return(
        <>
        <nav>
            <Link href={homeLink}>
            Food Delivery
            
            </Link>
            {
                !user &&(
                    <>
                    <Link href="/login">login</Link>
                    <Link href="/register"> register </Link>
                    </>
                )
             
              
            }
              {user && user.role === "user" && (
                <>
                <Link href="/user/cart">mycart</Link>
                <Link href = "/user/dashboard"> restaurant</Link>
                <Link href= "/user/order"> order</Link>
                </>

             )}
              {user && user.role === "delivery" && (
                <>
                <Link href="/delivery/dashboard">delivery</Link>
            
                </>

             )} {user && user.role === "admin" && (
                <>
                <Link href="/admin/dashboard">dashboard</Link>
                <Link href="/admin/restaurants">Resturants</Link>
                <Link href="/admin/cart">mycart</Link>
                <Link href = "/admin/users"> users</Link>
                <Link href= "/admin/order"> order</Link>
                </>

             )}
             {
                user && (
                    <>
                    <span>Hi {user.name}</span>    
                    <button onClick={logout}>
                        logout
                    </button>
                    </>
                )
             }


        </nav>
        </>
    )
}