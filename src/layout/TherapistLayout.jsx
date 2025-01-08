import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Sidebar/Navbar";
import TherapistSidebar from "../components/UI/Sidebar/TherapistSidebar";
import TherapistMobileNavbar from "../components/UI/Sidebar/TherapistMobileNavbar";

const TherapistLayout = () => {
  return (
    <div className="flex h-screen">
      <TherapistSidebar className="fixed left-0 top-0 h-full " />
      <div className="w-full overflow-y-auto bg-[#EEF2F5] relative">
        <div className="md:hidden">
        <TherapistMobileNavbar />
        </div>
        <div className="absolute w-full sticky top-0 z-[10]">
          <Navbar />
        </div>
        <div className=" mt-32 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TherapistLayout;
