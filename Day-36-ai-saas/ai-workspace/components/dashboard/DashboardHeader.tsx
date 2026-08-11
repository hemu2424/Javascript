

import UserMenu from "./UserMenu";
import DashboardNavigation from "./DashboardNavigation";

export default function DashboardHeader(){

    return(

        <>
             <header className="flex h-16 items-center justify-between border-b px-6">
    <DashboardNavigation/>


      <UserMenu />
    </header>
        </>
    )
}