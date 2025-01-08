import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/jwt";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  const email = decodedToken?.email || "";

  console.log("decoded user", email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailVerify = async (code) => {
    try {
      setIsLoader(true);
      const response = await fetch(
        "http://localhost:8800/api/otp/verify-email-otp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, otp: code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("verify successful", data);
        navigate("/therapist/license");
      } else {
        alert(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoader(false);
    }
  };

  const onSubmit = (data) => {
    console.log("data from email", data.code);
    emailVerify(data.code);
  };

  return (
    <div className="md:px-10 px-5 py-6 md:py-8 bg-white rounded-xl">
      <h1 className="text-xl md:text-[24px] font-[600] mb-1">
        We emailed you a code at:
      </h1>
      <p className="text-[15px] underline">Check jsmith.@gmail.com</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="code">Code</label>
          <input
            type="number"
            id="number"
            placeholder="12345"
            className="border p-2.5 placeholder:text-[#5C635A] rounded-lg focus:outline-none focus:border-[#1BC738] "
            {...register("code", { required: true })}
          />
          {errors.displayName && (
            <span className="text-red-600">Code is required</span>
          )}
        </div>

        <div className="mt-8 mb-3 md:mb-5 flex items-center justify-center w-3/4 md:w-[50%] mx-auto">
          {/* {isLoader ? (
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
              className={`bg-[#1BC738] text-white w-full py-3 rounded-lg
                        }`}
            >
              Verify Email
            </button>
          )} */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white ${
              isLoader ? "bg-gray-400 cursor-not-allowed" : "bg-[#1BC738]"
            }`}
            disabled={isLoader}
          >
            {isLoader ? "Loading..." : "Verify Email"}
          </button>
        </div>

        <p className="text-[#1BC738] underline font-[600] text-[15px] text-center">
          Resend Code
        </p>
      </form>
    </div>
  );
};

export default EmailVerification;
