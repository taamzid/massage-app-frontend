import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { AiOutlineEyeInvisible } from "react-icons/ai";
// import { BsEye } from "react-icons/bs";
// import { Link } from "react-router-dom";
import PasswordField from "../../components/SignupComponent/PasswordField";
import InputField from "../../components/SignupComponent/InputField ";
import RoleSelector from "../../components/SignupComponent/RoleSelector ";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUpFormTherapist = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [role, setRole] = useState("therapist");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRoleChange = (selectedRole) => {
    setRole((prevRole) => (prevRole === selectedRole ? "" : selectedRole));
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch(
        "http://localhost:8800/api/otp/send-email-otp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("OTP sent to email:", data);
      } else {
        console.log("Failed to send OTP:", data);
      }
    } catch (error) {
      console.log("Error fetching OTP API:", error);
    }
  };

  const handleSignupError = (errorMessage) => {
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const onSubmit = async (data) => {
    const { password, confirm_password, displayName, email, phone } = data;

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      name: displayName,
      email,
      password,
      phoneNumber: phone,
      role,
    };

    try {
      setIsLoader(true);
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registered Data:", result);

        if (result.token) {
          await sendOtp(email);
          Cookies.set("token", result.token, { expires: 7 });
          setTermsAccepted(false);
          reset();
          navigate("/therapist/email-verification");
        }
      } else {
        console.error("Error:", result.message);
        handleSignupError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoader(false);
    }
  };

  // console.log("email error", error);

  const handleAcceptTerms = (event) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <div className="rounded-lg md:px-8 px-5 py-6 md:py-5 bg-white">
      <h2 className="text-xl md:text-[30px] font-semibold mb-3">
        Create Account
      </h2>
      <p className="text-[#5C635A] text-[15px] md:text-lg">
        Welcome Back! By clicking the sign-up button, you agree to Zenitood{" "}
        <a href="/terms-conditions" className="text-[#1BC738] underline">
          Terms and Service.
        </a>
      </p>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-8 mb-8">
        <RoleSelector
          role="customer"
          currentRole={role}
          handleRoleChange={handleRoleChange}
        />
        <RoleSelector
          role="therapist"
          currentRole={role}
          handleRoleChange={handleRoleChange}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Name"
          id="name"
          placeholder="@username"
          register={register("displayName", {
            required: "User name is required",
          })}
          error={errors.displayName}
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="(650) 245-54-89"
          register={register("phone", { required: "Phone number is required" })}
          error={errors.phone}
        />

        <PasswordField
          label="Password"
          id="password"
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          register={register("password", { required: "Password is required" })}
          error={errors.password}
        />

        <PasswordField
          label="Confirm Password"
          id="confirm_password"
          showPassword={showConfirmPassword}
          toggleShowPassword={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          register={register("confirm_password", {
            required: "Confirming your password is required",
          })}
          error={errors.confirm_password}
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" onChange={handleAcceptTerms} />
          <label htmlFor="terms" className="text-[#1BC738] font-[500]">
            Accept Terms of Service
          </label>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold mt-4">{error}</p>}

        <div className="mt-8 mb-3 md:mb-5 flex items-center justify-center w-[50%] mx-auto">
          {isLoader ? (
            <button
              type="submit"
              className="bg-[#1BC738] text-white w-full py-3 rounded-lg flex items-center justify-center"
              disabled
            >
              <div className="w-5 h-5 border-2 border-t-white border-b-transparent border-l-transparent border-r-white rounded-full animate-spin"></div>
            </button>
          ) : (
            <button
              disabled={!termsAccepted}
              type="submit"
              className={`bg-[#1BC738] text-white w-full py-3 rounded-lg ${
                termsAccepted
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpFormTherapist;
