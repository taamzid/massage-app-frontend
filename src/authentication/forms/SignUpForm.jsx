import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [terms, setTerms] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // handle submit 
  const onSubmit = async (data) => {
    console.log(data);
    const { displayName, email, password, confirm_password } = data;

    if (!displayName || !email || !password || !confirm_password) {
      alert("Please fill all required fields");
      return;
    }

    if (!terms) {
      alert("Please accept the terms");
      return;
    }

    if (password !== confirm_password) {
      alert("Password did not match");
      return;
    }
    try {
      // "https://massage-app-backend.onrender.com/api/auth/register",
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        {
          name: displayName,
          email,
          password,
          role: "customer",
        },
        { withCredentials: true }
      );
      console.log("response", response);

      const { user, token } = response.data;

      console.log("user", user, "token", token);

      if (response?.status === 201) {
        // Show success toaster
        toast.success(response?.data?.message);
        alert(response?.data?.message);
        navigate("/checkout");
        // navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.field]: curr.message }),
          {}
        );
        // setErrors(apiErrors);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleAcceptTerms = () => {
    const terms = document.getElementById("terms");
    if (terms.checked) {
      console.log("Terms Accepted");
      setTerms(true);
    } else {
      console.log("Please accept the terms");
      setTerms(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-4 md:mt-[30px]">
          <label htmlFor="name" className="font-semibold text-md">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="border p-2.5 placeholder:text-[#5C635A] rounded-lg  "
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <span className="text-red-600">User Name is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4 md:mt-[25px]">
          <label htmlFor="email" className="font-semibold text-md">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border p-2.5 placeholder:text-[#5C635A] rounded-lg  "
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4 relative md:mt-[25px]">
          <label htmlFor="password" className="font-semibold text-md">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="*******"
            className="border p-2.5 placeholder:text-[#5C635A] rounded-lg  "
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password is required</span>
          )}

          {/* show password toggle button */}
          <div className="absolute right-4 top-11">
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <BsEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4 relative md:mt-[25px]">
          <label htmlFor="confirm_password" className="font-semibold text-md">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm_password"
            placeholder="Re-type password"
            className="border p-2.5 placeholder:text-[#5C635A] rounded-lg  "
            {...register("confirm_password", { required: true })}
          />
          {errors.confirm_password && (
            <span className="text-red-600">Password did not match</span>
          )}

          {/* show password toggle button */}
          <div className="absolute right-4 top-11">
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BsEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" onClick={handleAcceptTerms} />
          <label htmlFor="terms" className="text-[#1BC738]">
            Accept Terms of Service
          </label>
        </div>
        <div className="mt-6 md:mt-8 mb-3 md:mb-5 flex items-center justify-center w-[50%] mx-auto">
          {isLoader ? (
            <button
              type="submit"
              className="bg-[#1BC738] text-white w-full py-3 rounded-lg"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-[#1BC738] text-white w-full py-3 rounded-lg md:mt-[40px] ${
                terms ? "cursor-pointer" : "disabled:true cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          )}
        </div>
      </form>
      <div className="flex items-center justify-center md:mt-[30px]">
        <p>
          Already Have an Account? {"  "}
          <Link to="/" className="text-[#1BC738] font-semibold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
