import profile from "../../../assets/images/profile.svg";
import notificationIcon from "../../../assets/icons/notification.svg";
import logoutIcon from "../../../assets/icons/logoutIcon.svg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { decodeToken } from "../../../utils/jwt";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
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

  console.log("decoded data", decodedToken);

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

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="hidden lg:flex h-20  px-8 py-5  items-center justify-between border-b bg-white z-1001">
      <div className="flex items-center justify-center gap-4">
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
          <p className="font-semibold">{decodedToken?.name || "Mr. John"}</p>
          <p className="text-[+#5C635A] text-sm">{decodedToken?.email}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="border w-9 h-9 rounded-full flex items-center justify-center">
          <img src={notificationIcon} alt="Notification" className="text-xl" />
        </div>
        <div>
          <button
            onClick={handleLogOut}
            className="border-l-2 text-[#F15E4A] font-semibold px-6 py- flex items-center gap-2"
          >
            Log Out
            <img src={logoutIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
