import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginRole from "../../components/LoginComponent/LoginRole";
import { setSuccessLogin } from "../../store/slices/user.slice";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");

  const dispatch = useDispatch();

  console.log("selected role", role);

  const onSubmit = async (data) => {
    setIsLoader(true);
    try {
      const { email, password } = data;
      console.log(data);

      if (!email || !password) {
        alert("Please fill all required fields");
        setIsLoader(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          email,
          password,
          role,
        },
        { withCredentials: true }
      );

      if (res?.status === 200) {
        dispatch(setSuccessLogin(res?.data?.userData));
        setIsLoader(false);
        if (role === "therapist") {
          toast.success("Therapist login successful");
          navigate("/thp/inbox");
          // window.location.reload();
        } else {
          toast.success("Customer login successful");
          navigate("/dashboard/home");
          // window.location.reload();
        }
      } else {
        toast.error("Invalid credentials");
        setIsLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setIsLoader(false);
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div>
      <h2 className="text-[22px] md:text-[30px] text-center md:text-left font-semibold mt-4 mb-3">
        Sign In To Your Account
      </h2>
      <p className="text-[#5C635A] text-[14px] md:text-[16px] text-center md:text-left mb-8 md:mb-0">
        Welcome Back! Select a method to log in:
      </p>
      <div className="text-[14px] md:text-[16px] flex md:flex-row md:items-center gap-4 md:gap-8 mt-8 mb-8">
        <LoginRole
          role="customer"
          currentRole={role}
          handleRoleChange={handleRoleChange}
        />
        <LoginRole
          role="therapist"
          currentRole={role}
          handleRoleChange={handleRoleChange}
        />
      </div>
      {role !== "therapist" && (
        <>
          <SocialLogin role={role} />
          <div className="flex items-center justify-center gap-1 text-sm mt-6">
            <hr className="w-[20%] md:w-[30%] border border-gray-200" />
            <p className="text-center text-[14px] md:text-[16px]">
              Or Continue with Email
            </p>
            <hr className="w-[20%] md:w-[30%] border border-gray-200" />
          </div>
        </>
      )}

      <div className="mt-8 md:mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4">
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
          <div className="flex flex-col gap-2 mb-4 relative">
            <label htmlFor="password" className="font-semibold text-md">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="******"
              className="border p-2.5 placeholder:text-[#5C635A] rounded-lg  "
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">Password is required</span>
            )}

            {/* show password toggle button */}
            <div className="absolute right-4 top-11">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="text-[#5C635A]">
                  Remember me
                </label>
              </div>
              <p className="text-[#1BC738] underline">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>

            <div className="mt-8 md:mb-5 flex items-center justify-center">
              {isLoader ? (
                <button
                  type="submit"
                  className="bg-[#1BC738] text-white w-[50%] py-3 rounded-lg"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1BC738] text-white w-[50%] py-3 rounded-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center mb-5 lg:mb-0">
          <p>
            Don&apos;t Have an Account? {"  "}
            <Link
              to="/sign-up"
              className="text-[#1BC738] font-semibold underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
