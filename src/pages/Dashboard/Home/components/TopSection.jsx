import { Link, useNavigate } from "react-router-dom";
import spa1 from "../../../../assets/images/spa1.svg";
import spa2 from "../../../../assets/images/spa2.svg";
import vector from "../../../../assets/images/Vector.svg";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

const TopSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      navigate("/dashboard/search", {
        state: {
          therapists: [],
          searchValue,
          errorMsg: "Please enter a valid ZIP code or city name",
        },
      });
      return;
    }

    try {
      console.log("Search Value:", searchValue);

      const response = await axios.get(
        searchValue.match(/^\d+$/)
          ? `http://localhost:8800/api/therapist/zip/${searchValue}`
          : `http://localhost:8800/api/therapist/city/${searchValue}`
      );

      console.log("Therapists:", response?.data?.data);

      const therapists = response.data;

      navigate("/dashboard/search", {
        state: {
          therapists,
          searchValue,
          searchType: searchValue.match(/^\d+$/) ? "ZIP Code" : "City",
          errorMsg:
            therapists.length === 0
              ? `No therapists found for ${searchValue}`
              : "",
        },
      });
    } catch (error) {
      console.error("Error fetching therapists:", error);
      navigate("/dashboard/search", {
        state: {
          therapists: [],
          searchValue,
          errorMsg: "Something went wrong. Please try again later.",
        },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg px-6 py-4 lg:flex items-center justify-between">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h3 className="text-[#152A16] text-[20px] font-[500] text-bold">
          I'm Looking for Massage Therapist Near...
        </h3>
        <p className="text-[15px] py-2">
          In using this site, I agree to be bound by the{" "}
          <Link to="/terms&conditions" className="text-[#1BC738] underline">
            Terms of Service
          </Link>{" "}
          <br className="hidden lg:block" />
          and {""}
          <a href="/sign-up" className="text-[#1BC738] underline">
            Privacy Policy
          </a>
        </p>
        <div className="hidden lg:block relative lg:mt-2">
          <input
            type="text"
            placeholder="ZIP code or city name"
            className="border rounded-lg py-2 px-3 w-full placeholder:text-[#5C635A] text-[15px] bg-[#EEF2F5]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-[#1BC738] px-7 h-[32px] text-white rounded-lg absolute right-1 top-[4.5px] text-[14px]"
            onClick={handleSearch} // Fixed: Calls handleSearch instead of handleKeyDown
          >
            GO
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden relative lg:mt-5 text-center">
        <h3 className="text-[#152A16] text-[18px] font-[500] text-bold  leading-[28px] mt-5">
          I'm Looking for Massage <br />
          Therapist Near...
        </h3>
        <div className="flex items-center gap-2 justify-center my-3">
          <FaLocationDot />
          <p>260 Meserole Street, NY</p>
        </div>
        <p className="text-[15px] pb-6">
          In using this site, I agree to be bound by <br />
          the
          <Link to="/terms&conditions" className="text-[#1BC738] underline">
            Terms of Service
          </Link>{" "}
          <br className="hidden lg:block" />
          and {""}
          <a href="/sign-up" className="text-[#1BC738] underline">
            Privacy Policy
          </a>
        </p>
        <input
          type="text"
          placeholder="ZIP code or city name"
          className="border rounded-lg py-2 px-3 w-full bg-[#EEF2F5]"
          value={searchValue} // Fixed: Binds to searchValue
          onChange={(e) => setSearchValue(e.target.value)} // Fixed: Updates searchValue
          onKeyDown={handleKeyDown} // Fixed: Allows search on Enter key
        />
        <button
          className="bg-[#1BC738] px-7 py-2 text-white rounded-lg mt-5"
          onClick={handleSearch} // Fixed: Calls handleSearch
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default TopSection;
