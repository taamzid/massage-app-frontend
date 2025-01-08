/* eslint-disable react/prop-types */
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEye } from "react-icons/bs";

const PasswordField = ({ label, id, showPassword, toggleShowPassword, register, error }) => (
    <div className="flex flex-col gap-2 mb-4 relative">
      <label htmlFor={id} className="font-semibold text-md">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="border p-2.5 placeholder:text-[#5C635A] rounded-lg"
        {...register}
      />
      {error && <span className="text-red-600">{error.message}</span>}
      <div className="absolute right-4 top-11">
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? <BsEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
    </div>
  );

  export default PasswordField