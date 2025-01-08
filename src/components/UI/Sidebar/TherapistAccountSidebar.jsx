import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";

const TherapistAccountSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Personal Information", path: "/therapist/sign-up" },
    { label: "Email Verification", path: "/therapist/email-verification" },
    { label: "Phone Verification", path: "/therapist/phone-verification" },
    { label: "License & Certificate", path: "/therapist/license" },
    { label: "Professional Details", path: "/therapist/professional-details" },
  ];

  const selectedPath = menuItems.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    // <div className="border hidden lg:block lg:sticky top-0 left-0 overflow-auto py-12 col-span-2 bg-white shadow-md h-screen w-[260px] min-w-[260px]">
    <div className="border hidden lg:block lg:sticky top-0 left-0 overflow-auto py-12 col-span-2 bg-white shadow-md h-screen w-[260px] min-w-[260px]">
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
            to={item.path}
            key={index}
            className={`py-3 transition-all flex items-center gap-3 px-6 ${
              selectedPath === index ? "bg-[#E1FCD6] font-bold" : ""
            }`}
          >
            {/* Custom Checkbox */}
            <div
              className={`w-5 h-5  flex items-center justify-center border-2 rounded-md ${
                selectedPath === index
                  ? "bg-black border-black"
                  : "border-gray-400"
              } cursor-pointer`}
            >
              {selectedPath === index && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 16.5L4.5 12l-1.5 1.5 6 6 12-12L19.5 6 9 16.5z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Label */}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default TherapistAccountSidebar;
