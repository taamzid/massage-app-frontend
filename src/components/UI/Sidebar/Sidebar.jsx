import { NavLink } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";
import SidebarItems from "./SidebarItems";


const Sidebar = () => {
  return (
    <div className="border hidden lg:block lg:sticky top-0 left-0 overflow-auto py-12 w-[300px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={logo} alt="" />
        <h2 className="text-[#152A16] font-[600] text-[20px] leading-[24px]">Zentitood</h2>
      </div>

      <SidebarItems />
    </div>
  );
};

export default Sidebar;
