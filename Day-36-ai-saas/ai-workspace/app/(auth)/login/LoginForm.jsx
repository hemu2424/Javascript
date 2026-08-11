"use client";


import {
 useActionState
} from "react";

import { login } 
from "@/actions/auth/login";
import Link from "next/link";


const initialState={
 success:false,
 message:""
};


export default function LoginForm(){


const [
 state,
 formAction,
 pending
]=useActionState(
 login,
 initialState
);



return (

<form action={formAction}>


<input
name="email"
placeholder="Email"
/>


<input
name="password"
type="password"
placeholder="Password"
/>


<button disabled={pending}>

{
pending
?"Logging in..."
:"Login"
}

</button>
<h1> <Link href="verify-otp">Lets login with otp</Link></h1>



<p>
{state.message}
</p>


</form>

);

}