/* eslint-disable no-unused-vars */
import logo from "../assets/logos/logo.svg";

import AuthSwiper from "../components/shared/Swiper/AuthSwiper";

import SignUpForm from "./forms/SignUpForm";
import SignUpFormTherapist from "./forms/SignUpFormTherapist";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole((prevRole) => (prevRole === selectedRole ? "" : selectedRole));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePage = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatePage()) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        formData,
        { withCredentials: true }
      );
      const { user, token } = response.data;

      console.log("user", user, "token", token);

      // Show success toaster
      toast.success("User successfully registered!");
      navigate("/checkout");
      // navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.field]: curr.message }),
          {}
        );
        setErrors(apiErrors);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container flex items-center justify-center mx-auto mt-6 md:mt-0 2xl:mt-[60px] px-6 md:px-0">
      {/* <ToastContainer /> */}
      <div className="md:grid md:grid-cols-[6fr,7fr] items-center justify-center md:gap-[50px] 2xl:gap-[100px]">
        <div className="md:w-[90%] mx-auto ">
          <div className="flex flex-col items-start justify-center gap-2">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="logo"
              className="cursor-pointer"
            />
            <h2 className="text-[#152A16] font-[600] text-[20px] leading-[24px]">
              Zentitood
            </h2>
          </div>
          <h2 className="text-[22px] md:text-[30px] font-semibold mt-4 md:mt-[50px] mb-3 md:mb-[25px]">
            Create Account
          </h2>
          <p className="text-[#5C635A] hidden md:block md:leading-[28px]">
            Welcome Back! By click the sign up button, you&apos;re agree <br />
            to Zenitood Terms and Service and acknowledge the <br />
            <a href="/privacy-policy" className="text-[#1BC738] underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms-conditions" className="text-[#1BC738] underline">
              Terms of Service.
            </a>
          </p>
          <p className="text-[#5C635A] md:hidden">
            Welcome Back! By click the sign up button, you&apos;re agree to
            Zenitood Terms and Service and acknowledge the &nbsp;
            <a href="/privacy-policy" className="text-[#1BC738] underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms-conditions" className="text-[#1BC738] underline">
              Terms of Service.
            </a>{" "}
          </p>
          <form className="flex md:flex-row items-center gap-2 text-[14px] md:text-[16px] md:gap-8 mt-4 md:mt-[35px]">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="customer"
                name="role"
                checked={role === "customer"}
                onChange={() => handleRoleChange("customer")}
                className="peer hidden"
                onKeyDown={handleKeyDown}
              />
              <div
                className={`w-4 h-4 flex items-center justify-center border-2 rounded cursor-pointer ${
                  role === "customer"
                    ? "border-[#1BC738] bg-[#1BC738]"
                    : "border-black"
                }`}
                onClick={() => handleRoleChange("customer")}
              >
                {role === "customer" && (
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
              <label
                htmlFor="customer"
                className={`cursor-pointer ${
                  role === "customer" ? "text-[#1BC738]" : "text-black"
                }`}
              >
                Create as Customer
              </label>
            </div>
            <Link to="/therapist/sign-up">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="therapist"
                  name="role"
                  checked={role === "therapist"}
                  onChange={() => handleRoleChange("therapist")}
                  className="peer hidden"
                />
                <div
                  className={`w-4 h-4 flex items-center justify-center border-2 rounded ${
                    role === "therapist"
                      ? "border-[#1BC738] bg-[#1BC738]"
                      : "border-black"
                  }`}
                  onClick={() => handleRoleChange("therapist")}
                >
                  {role === "therapist" && (
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
                <label
                  htmlFor="therapist"
                  className={`cursor-pointer ${
                    role === "therapist" ? "text-[#1BC738]" : "text-black"
                  }`}
                >
                  Create as Therapist
                </label>
              </div>
            </Link>
          </form>
          <div className="my-5">
            {role === "customer" ? <SignUpForm /> : <SignUpFormTherapist />}
          </div>
        </div>
        <div className="hidden md:block  relative w-full">
          <div>
            <AuthSwiper />
          </div>
          <div
            className="z-[100] bg-[#152A16] p-8 rounded-lg text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[22px] font-['Poppins', sans-serif]"
            style={{ opacity: "0.7" }}
          >
            <p className="text-[#1BC738] font-semibold">Create Account</p>
            <p className="text-white">to view all the message therapists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
