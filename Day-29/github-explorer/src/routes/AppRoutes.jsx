import { lazy, Suspense } from "react";
import Loader from "../components/common/Loader";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() =>
  import("../pages/Home/HomePage")
);

const UserPage = lazy(() =>
  import("../pages/User/UserPage")
);

const RepositoryPage = lazy(() =>
  import("../pages/Repository/RepositoryPage")
);

const BookmarksPage = lazy(() =>
  import("../pages/Bookmarks/BookmarksPage")
);

const NotFound = lazy(() =>
  import("../pages/NotFound/NotFound")
);
const MainLayout = lazy(()=>
import ("../components/layout/MainLayout")
)

function AppRoutes() {
  return (
  
 <Suspense fallback={<Loader/>}>
<Routes>
    <Route path ="/" element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path ="/users/:username" element={<UserPage/>}/>
    <Route path="/bookmarks" element={<BookmarksPage/>}/>
    <Route
    path="users/:username/repos/:repoName"
    element={<RepositoryPage />}
/>
    </Route>
    <Route path="*" element={<NotFound/>}/>
</Routes>  
</Suspense>
);
}

export default AppRoutes;