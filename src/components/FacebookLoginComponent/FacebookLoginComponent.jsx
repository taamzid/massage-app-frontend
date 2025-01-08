/* eslint-disable react/prop-types */
import React from "react";
import { FacebookLogin } from "react-facebook-login-lite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFacebookF } from "react-icons/fa";

const FacebookLoginComponent = ({ role }) => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      if (!response.authResponse) {
        toast.error("Facebook login failed.");
        return;
      }

      const { accessToken } = response.authResponse;

      const result = await axios.post(
        "https://massage-app-backend.onrender.com/api/auth/facebook",
        { token: accessToken, role },
        { withCredentials: true }
      );

      localStorage.setItem("fbToken", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      if (result.status === 200) {
        toast.success(`${role} login successful`);

        if (role === "customer") {
          navigate("/");
        } else if (role === "therapist") {
          navigate("/therapist/professional-details");
        }
      }
    } catch (error) {
      console.error(
        "Facebook login failed:",
        error.response?.data || error.message
      );
      toast.error("Login failed. Please try again.");
    }
  };

  const handleFailure = (error) => {
    console.error("Facebook login error:", error);
    toast.error("Facebook login was unsuccessful.");
  };

  return (
    <div>
      <FacebookLogin
        appId="944537854316927"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        render={({ onClick }) => (
          <button
            onClick={onClick}
            className="facebook-button"
            style={{
              backgroundColor: "#4267B2",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default FacebookLoginComponent;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { FaFacebookF } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const FacebookLoginComponent = ({ role }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load the Facebook SDK script dynamically when the component mounts
//     if (window.FB) {
//       window.FB.XFBML.parse();
//     } else {
//       window.fbAsyncInit = function () {
//         window.FB.init({
//           appId: "944537854316927", // Replace with your Facebook App ID
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: "v21.0", // Use the latest version or your preferred version
//         });
//       };

//       // Load the SDK asynchronously
//       (function (d, s, id) {
//         var js,
//           fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         js = d.createElement(s);
//         js.id = id;
//         js.src = "https://connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//       })(document, "script", "facebook-jssdk");
//     }
//   }, []);

//   const handleFacebookLogin = () => {
//     window.FB.login(
//       (response) => {
//         if (response.authResponse) {
//           // Call the async function to handle login logic
//           handleLoginSuccess(response.authResponse.accessToken);
//         } else {
//           toast.error("User login failed.");
//         }
//       },
//       { scope: "public_profile,email" }
//     );
//   };

//   const handleLoginSuccess = async (accessToken) => {
//     try {
//       // Make a request to your backend to handle Facebook authentication
//       const result = await axios.post(
//         "https://massage-app-backend.onrender.com/api/auth/facebook", // Your backend endpoint for Facebook login
//         { token: accessToken, role },
//         { withCredentials: true }
//       );

//       localStorage.setItem("fbToken", result.data.token);
//       localStorage.setItem("user", JSON.stringify(result.data.user));

//       if (result.status === 200) {
//         toast.success(`${role} logged in successfully`);
//         if (role === "customer") {
//           navigate("/");
//         } else if (role === "therapist") {
//           navigate("/therapist/professional-details");
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Facebook login failed:",
//         error.response?.data || error.message
//       );
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleFacebookLogin}
//       className="bg-[#156BCA] text-[14px] md:text-[16px] text-white px-2 md:px-8 py-2 rounded-md flex items-center justify-center w-full gap-2 shadow-lg"
//     >
//       <FaFacebookF />
//       <span>Login with Facebook</span>
//     </button>
//   );
// };

// export default FacebookLoginComponent;
