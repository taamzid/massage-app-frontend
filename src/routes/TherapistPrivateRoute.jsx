/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "../utils/jwt";
import { Navigate } from "react-router-dom";

// therapist
const TherapistPrivateRoute = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    console.log("cookieToekn is", cookieToken);
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  // console.log(decodedToken);
  return decodedToken?.role === "therapist" ? children : <Navigate to="/" />;
};

export default TherapistPrivateRoute;
