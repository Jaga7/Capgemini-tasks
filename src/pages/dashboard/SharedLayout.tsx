import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";

const SharedLayout = () => {
  return (
    <main className='dashboard'>
      <NavBar />
      <div className='dashboard-page'>
        <Outlet />
      </div>
    </main>
  );
};
export default SharedLayout;
