import { getCurrentUser } from "@/lib/auth"
import LogoutButton from "./LogoutButton";

export default async function UserMenu(){
const user = await getCurrentUser();
    return(
<>
<p>
    {user?.name}
</p>
<p>
    {user?.email}
</p>
<LogoutButton/>

</>

    )
}