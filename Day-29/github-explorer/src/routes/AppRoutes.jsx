import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import UserPage from "../pages/user/UserPage";

function AppRoutes() {
  return (
  
 
<Routes>
    <Route path ="/" element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path ="/users/:userName" element={<UserPage/>}/>
    </Route>
    <Route path="*" element={<NotFound/>}/>
</Routes>  
);
}

export default AppRoutes;