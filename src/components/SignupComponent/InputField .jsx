/* eslint-disable react/prop-types */
const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
}) => (
  <div className="flex flex-col gap-4 mb-4">
    <label htmlFor={id} className="font-semibold text-md">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="border p-2.5 placeholder:text-[#5C635A] rounded-lg"
      {...register}
    />
    {error && <span className="text-red-600">{error.message}</span>}
  </div>
);

export default InputField;
