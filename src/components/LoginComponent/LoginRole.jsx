/* eslint-disable react/prop-types */

const LoginRole = ({ role, currentRole, handleRoleChange }) => {
  return (
    <div className="flex items-center gap-2 text-primary">
      <input
        type="checkbox"
        id={role}
        checked={currentRole === role}
        onChange={() => handleRoleChange(role)}
        className="peer hidden"
      />
      <div
        className={`w-4 h-4 flex items-center justify-center border-2 rounded cursor-pointer ${
          currentRole === role
            ? "border-[#1BC738] bg-[#1BC738]"
            : "border-black"
        }`}
        onClick={() => handleRoleChange(role)}
      >
        {currentRole === role && (
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
        htmlFor={role}
        className={`cursor-pointer ${
          currentRole === role ? "text-[#1BC738]" : "text-black"
        }`}
      >
        Login as {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
        {/* Capitalize role */}
      </label>
    </div>
  );
};

export default LoginRole;
