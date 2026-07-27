import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <h2>GitHub Explorer</h2>

      <Outlet />
    </>
  );
}

export default MainLayout;