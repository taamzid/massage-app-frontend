import { Outlet, useLocation } from "react-router-dom";
import TherapistAccountSidebar from "../components/UI/Sidebar/TherapistAccountSidebar";

const TherapistAccountLayout = () => {
  const location = useLocation();
  // console.log(location)
  const licensePath = location.pathname === "/therapist/license";
  const professionalDetailsPath =
    location?.pathname === "/therapist/professional-details";

  // console.log(licensePath, professionalDetailsPath);
  return (
    <div className="md:flex h-full bg-[#EEF2F5] py-[4px] md:py-0">
      <TherapistAccountSidebar className="fixed left-0 top-0 h-full " />
      {/* <div className="col-span-10 overflow-y-auto relative md:w-[500px] mx-5 my-6 md:mx-auto md:my-10"> */}
      <div
        className={`col-span-10 overflow-y-auto relative px-5 py-6 md:mx-auto md:py-10 lg:py-12 xl:py-14 ${
          licensePath || professionalDetailsPath
            ? "md:w-full md:px-8 lg:p-11 xl:p-12 2xl:p-14 "
            : "md:w-[500px] "
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default TherapistAccountLayout;
