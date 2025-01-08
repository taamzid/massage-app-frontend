import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Sidebar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import ResponsiveSidebar from "../components/UI/Sidebar/ResponsiveSidebar";


const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar className="hidden md:fixed left-0 top-0 h-full" />
      <div className="w-full overflow-y-auto lg:bg-[#EEF2F5] relative">
        <div className="lg:hidden">
          <ResponsiveSidebar />
        </div>
        <div className="absolute w-full sticky top-0 z-[10]">
          <Navbar />
        </div>
        <div className="mt-28 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
