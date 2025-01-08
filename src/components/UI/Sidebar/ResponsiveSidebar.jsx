import { FaBars, FaCross } from "react-icons/fa";
import logoutIcon from "../../../assets/icons/logoutIcon.svg";
import notification from "../../../assets/icons/notification.svg";
import profile from "../../../assets/images/profile.svg";
import cross from "../../../assets/icons/cross.svg";
import logo from "../../../assets/logos/logo.svg";
import { useEffect, useState } from "react";
import SidebarItems from "./SidebarItems";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { decodeToken } from "../../../utils/jwt";
import { useQuery } from "@tanstack/react-query";

const ResponsiveSidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  const apiUrl =
    decodedToken?.role === "customer"
      ? "http://localhost:8800/api/customer/all"
      : "http://localhost:8800/api/therapist/professional-details";

  const { data, isLoading } = useQuery({
    queryKey: [
      decodedToken?.role === "customer"
        ? "customerDetails"
        : "professionalDetails",
    ],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }
      return response.json();
    },
    enabled: !!decodedToken?.role,
  });

  useEffect(() => {
    if (data?.data) {
      const matchedData = data.data.find(
        (item) => item.email === decodedToken?.email
      );
      if (matchedData) {
        setProfilePicture(matchedData.profilePicture);
      }
    }
  }, [data, decodedToken]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/auth/logout");
      const data = await response.json();
      if (response.ok) {
        Cookies.remove("token");
        console.log("logout successful", data);
        navigate("/");
      } else {
        toast.error("failed to logout");
      }
    } catch (error) {
      console.log("Fetching api failed", error);
      toast.error("Fetching api failed");
    }
  };

  return (
    <div className=" fixed top-0 left-0 z-[100] w-full bg-white">
      <div className=" flex items-center justify-between p-6 bg-white ">
        <div className="flex items-center justify-center gap-3">
          <img src={logo} alt="" />
          <h2 className="text-[#152A16] font-[600] text-[20px] leading-[24px]">
            Zentitood
          </h2>
        </div>
        <button
          className="text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaCross className="text-white text-2xl " />
          ) : (
            <FaBars className=" text-2xl " />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-[150] transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center relative my-6 ">
          <div className="flex items-center justify-between  border-b-2 pb-5 w-full">
            <div className="flex gap-6 items-center justify-center pl-6">
              <img src={notification} alt="" />
              <hr className="border border-gray-400 h-10 " />
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 text-[#F15E4A] text-[15px]"
              >
                <span>Log Out</span>
                <img src={logoutIcon} alt="" />
              </button>
            </div>
            <button
              className="pr-6 text-2xl text-[#F47108]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={cross} alt="arrow" className=" text-white" />
            </button>
          </div>

          <div className="w-full mt-6 px-6">
            <div className="flex items-center justify-start gap-4">
              <div>
                {isLoading ? (
                  <div className="spinner border-t-4 border-green-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                ) : (
                  <img
                    src={profilePicture || profile}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                )}
              </div>
              <div>
                <p className="font-semibold">
                  {decodedToken?.name || "Mr. John"}
                </p>
                <p className="text-[#5C635A] text-[14px] font-[400]">
                  {decodedToken?.email}
                </p>
              </div>
            </div>
            <SidebarItems
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
