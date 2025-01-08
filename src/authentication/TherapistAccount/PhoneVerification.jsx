/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const PhoneVerification = () => {
  const [isLoader, setIsLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="md:px-10 px-5 py-6 md:py-8 bg-white rounded-xl">
      <h1 className="text-xl md:text-[24px] font-[600] mb-1">
        Let's verify your phone number
      </h1>
      <p className="text-[15px] ">
        Enter the 6 digit Code we sent to +1 (650) 245-54-89.
      </p>

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

        <Link to="/phone-verification">
          <div className="mt-8 mb-3 md:mb-5 flex items-center justify-center w-3/4 md:w-[50%] mx-auto">
            <button
              type="submit"
              className={`bg-[#1BC738] text-white w-full py-3  rounded-lg
                        }`}
            >
              Verify Phone Number
            </button>
          </div>
        </Link>

        <p className="text-[#1BC738] underline font-[600] text-[15px] text-center">
          Resend Code
        </p>
      </form>
    </div>
  );
};

export default PhoneVerification;
