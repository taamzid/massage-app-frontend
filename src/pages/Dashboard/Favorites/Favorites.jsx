import { useEffect, useState } from "react";
// import { FaCar } from "react-icons/fa6";
// import { MdLocationPin } from "react-icons/md";
import locationIcon from "./../../../assets/icons/Location.svg";
import carIcon from "./../../../assets/icons/car.svg";
import { Link } from "react-router-dom";
import Pagination from "../../../components/shared/Pagination/Pagination";
import Cookies from "js-cookie";
import { decodeToken } from "../../../utils/jwt";
// import { decodeToken } from "../utils/jwt";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [decodedToken, setDecodedToken] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
      setCustomerId(decoded?.id);
    }
  }, []);

  // console.log(decodedToken);
  // console.log(customerId);

  useEffect(() => {
    if (!customerId) {
      return;
    }
    // fetch("/therapist.json")
    fetch(`http://localhost:8800/api/customer/favorites/${customerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setData(data?.therapists);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [decodedToken, customerId]);

  // Adjust itemsPerPage based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const isLargeScreen = window.innerWidth >= 768; // Define breakpoint for large devices
      setItemsPerPage(isLargeScreen ? 10 : 8);
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage); // Listen for resize events

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // Cleanup
    };
  }, []);

  if (data?.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center text-2xl font-medium text-gray-400">
        No Favorites Yet
      </div>
    );
  }

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-[#EEF2F5] p-6 min-h-screen"
    >
      <h3 className="text-[18px] font-[500] mb-4">Your Favorites List</h3>

      {/* favorites card */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-x-2.5 gap-y-4 md:gap-4 ">
        {currentItems?.map((thp, i) => (
          <div
            className="w-[290px] md:w-[207px] border p-2 rounded-xl bg-white relative"
            key={i}
          >
            {/* img */}
            <div className="rounded-lg overflow-hidden">
              {thp?.profilePicture ? (
                <img
                  src={thp?.profilePicture}
                  alt={thp?.name || "Image"}
                  className="w-[270px] md:w-[187px] h-[270px] md:h-[186px]"
                />
              ) : (
                <div className="w-[270px] md:w-[187px] h-[270px] md:h-[186px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No image available
                </div>
              )}
            </div>

            {/* name */}
            <h4 className="text-[14px] font-[500] mb-2 ml-2 mt-3">
              {thp?.name || "Name not provided"}
            </h4>

            {/* location */}
            <p className="text-gray-600 flex items-start mb-2 text-[13px] ml-1.5 gap-1.5 text-wrap">
              <img className="mt-0.5" src={locationIcon} alt="location icon" />
              {thp?.address || "Address not provided"}
            </p>

            {/* available in */}
            <p className="text-gray-600 flex items-start gap-2 ml-2 text-[13px] mb-2 text-wrap">
              {/* <FaCar /> */}
              {/* Mobile & In-Studio */}
              <img className="mt-[0.20rem]" src={carIcon} alt="availability" />
              {thp?.availableIn || "Availability not specified"}
            </p>

            {/* rate */}
            <p className="flex items-center gap-2 ml-3 text-xs md:text-sm mb-12 text-[#1BC738]">
              <span>$</span>
              {thp.massageTypesAndRates?.[0]?.rate
                ? `${thp.massageTypesAndRates?.[0]?.rate} & Up`
                : "Rate not added"}
            </p>

            {/* details */}
            {/* <Link to={`new-listing/${thp?._id}`}> */}
            <Link to={`${thp._id}`}>
              <button className="bg-[#E1FCD6] hover:bg-[#1BC738] text-black hover:text-white py-2 px-4 rounded-b-lg transition-all underline w-full absolute bottom-0 right-0 text-[14px]">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Favorites;
