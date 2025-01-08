/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "../utils/jwt";
import { Navigate } from "react-router-dom";

const CustomerPrivateRoute = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"));
    setUserRole(role?.role || (localStorage.getItem("user") && "customer"));
  }, []);

  console.log("role from local storage", userRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  console.log("from customer private route", decodedToken);
  return (decodedToken?.role || userRole) === "customer" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default CustomerPrivateRoute;
