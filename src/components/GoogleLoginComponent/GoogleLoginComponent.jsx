/* eslint-disable react/prop-types */
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginComponent = ({ role }) => {
  const navigate = useNavigate();
  console.log('role',role)
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const response = await axios.post(
        "https://massage-app-backend.onrender.com/api/auth/google",
        { token, role },
        { withCredentials: true }
      );
      localStorage.setItem("authToken", response.data.token);
      if (response.status === 200) {
        console.log("Login successful:", response.data.message);
        toast.success(`${role} logging successful`);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (role === "customer") {
          navigate("/dashboard");
        } else if (role === "therapist") {
          navigate("/therapist/professional-details");
        }
      }
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Google login failed:",
        error.response?.data || error.message
      );
      alert("Login failed. Please try again.");
    }
  };

  const handleError = () => {
    alert("Google login was unsuccessful.");
  };

  return (
    <GoogleOAuthProvider clientId="406574833768-pdceo305f1850ugfcm08pbhc6tigh3qr.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
