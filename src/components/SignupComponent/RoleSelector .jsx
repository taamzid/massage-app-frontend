import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RoleSelector = ({ role, currentRole, handleRoleChange }) => (
    <Link to={`/sign-up`}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={role}
          name="role"
          checked={currentRole === role}
          onChange={() => handleRoleChange(role)}
          className="peer hidden"
        />
        <div
          className={`w-4 h-4 flex items-center justify-center border-2 rounded cursor-pointer ${
            currentRole === role ? "border-[#1BC738] bg-[#1BC738]" : "border-black"
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
          Create as {role.charAt(0).toUpperCase() + role.slice(1)}
        </label>
      </div>
    </Link>
  );

  export default RoleSelector