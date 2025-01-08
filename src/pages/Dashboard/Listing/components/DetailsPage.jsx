import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailsCard from "./DetailsCard";
import RightParts from "./RightParts";

const DetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [therapistData, setTherapistData] = useState({});

  //   get therapist info
  const getTherapistDetails = async () => {
    // `https://massage-app-backend.onrender.com/api/therapist/professional-details/${id}`
    try {
      const response = await axios.get(
        `http://localhost:8800/api/therapist/professional-details/${id}`
      );

      //   console.log(response)
      if (response.status === 200) {
        // console.log(response.data.data);
        setTherapistData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching therapist details:", error);
    }
  };

  useEffect(() => {
    getTherapistDetails();
  }, []);

  console.log(therapistData);

  // handle go back navigation
  const handleNavigation = () => {
    const currentPath = location.pathname;

    // check if route is from featured or not
    const isFeaturedRoute = /^\/dashboard\/featured\/[a-zA-Z0-9]+$/.test(
      currentPath
    );

    if (isFeaturedRoute) {
      navigate("/dashboard/featured");
    } else {
      navigate("/dashboard/new-listing");
    }
  };

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-[#EEF2F5] lg:p-6 "
    >
      <button
        onClick={handleNavigation}
        className="flex items-center gap-1 text-[15px] font-[500] pt-5 px-6 lg:pt-0 lg:px-0"
      >
        <FaChevronLeft />
        <span className="underline">Back to Result</span>
      </button>

      {/* <div className="grid grid-cols-1 md:grid-cols-[3fr,8fr,1fr] gap-10 md:gap-6 my-6"> */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-3 lg:gap-6 py-6 max-w-[100%] overflow-hidden">
        <DetailsCard therapistData={therapistData} />
        <div className="flex-1">
          <RightParts therapistData={therapistData} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
