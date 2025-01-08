import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";
// import { useState } from "react";
import paperIcon from "../../../assets/icons/Paper.svg";
import settingsIcon from "../../../assets/icons/Setting.svg";
import msgIcon from "../../../assets/icons/Message.svg";
import bookingIcon from "../../../assets/icons/bookings.svg";

const TherapistSidebar = () => {
  // const [selectedItem, setSelectedItem] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inbox", path: "/thp/Inbox", icon: msgIcon },
    { label: "Bookings", path: "/thp/booking", icon: bookingIcon },
    { label: "My Profile", path: "/thp/my-profile", icon: settingsIcon },
    { label: "About", path: "/thp/about", icon: paperIcon },
  ];

  const selectedPath = menuItems.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <div className="border hidden lg:block lg:sticky top-0 left-0 overflow-auto py-12 w-[300px] bg-white shadow-md h-screen">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Zentitood Logo"
          className="h-16 w-16 cursor-pointer"
        />
        <h2 className="text-[#152A16] font-semibold text-[20px] leading-[24px]">
          Zentitood
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="py-8 flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={`py-3 transition-all flex items-center gap-3 px-6 ${
              selectedPath === index
                ? "bg-[#E1FCD6] font-bold border-l-[3px] border-[#152A16]"
                : ""
            }`}
            // onClick={() => setSelectedItem(index)}
          >
            {/* Icon */}
            <img
              src={item.icon}
              alt={`${item.label} Icon`}
              className="w-5 h-5"
            />
            {/* Label */}
            <span className="text-[#152A16]">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default TherapistSidebar;
