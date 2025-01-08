import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/Therapist.css";
// import { MdLocationPin } from "react-icons/md";
// import { FaCar } from "react-icons/fa";
import locationIcon from "./../../../../assets/icons/Location.svg";
import carIcon from "./../../../../assets/icons/car.svg";
import { useNavigate } from "react-router-dom";

const FeaturedTherapist = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch("/therapist.json")
    fetch("http://localhost:8800/api/therapist/professional-details")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.therapists);
        // filter for paymentToken
        const featuresData = data?.data?.filter((therapist) => {
          const tokenExpirationDate = new Date(therapist?.paymentTokenExpires);
          const currentDate = new Date();

          // return if payment token !==null and if its not expired
          return (
            therapist?.payment !== null && tokenExpirationDate > currentDate
          );
        });
        // console.log(featuresData);
        setData(featuresData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 mx-4 md:mx-0 relative ">
      <h3 className="text-[18px] font-[500] m-2 text-center md:text-left">
        Featured Therapist
      </h3>

      <div className="bg-white pt-6 pb-20 md:p-6 rounded-lg swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView="auto"
          // breakpoints={{
          //   // when window width is >= 320px
          //   320: {
          //     slidesPerView: 2,
          //     spaceBetween: 5,
          //   },
          //   // when window width is >= 640px
          //   640: {
          //     slidesPerView: 3,
          //     spaceBetween: 5,
          //   },
          //   1024: {
          //     slidesPerView: 3,
          //     spaceBetween: 20,
          //   },
          //   // when window width is >= 1280px
          //   1280: {
          //     slidesPerView: 4,
          //     spaceBetween: 20,
          //   },
          // }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="custom-swiper "
        >
          {data?.map((therapist, i) => (
            <SwiperSlide
              style={{ width: "207px", marginRight: "25px" }}
              key={i}
            >
              <div className="card bg-white rounded-lg lg:mx-2 relative text-left shadow-lg border">
                <div className="rounded-lg overflow-hidden">
                  {therapist?.profilePicture ? (
                    <img
                      src={therapist.profilePicture}
                      alt={therapist?.name || "Image"}
                      className="w-[187px] h-[187px] "
                    />
                  ) : (
                    <div className="w-[187px] h-[187px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm text-center">
                      <p className="lg:mr-3 text-center">No image</p>
                    </div>
                  )}
                </div>

                <h4 className="text-[14px] font-[500]  mb-2 ml-2 mt-3">
                  {therapist?.name || "Name not provided"}
                </h4>

                <p className="text-gray-600 flex items-start mb-2 text-[13px] ml-1.5 gap-1.5 text-wrap">
                  <img
                    className="mt-0.5"
                    src={locationIcon}
                    alt="location icon"
                  />
                  {therapist?.address || "Address not provided"}
                </p>

                {/* available in */}
                <p className="text-gray-600 flex items-start gap-2 ml-2 text-[13px] mb-10 text-wrap">
                  {/* Mobile & In-Studio */}
                  <img
                    className="mt-[0.20rem]"
                    src={carIcon}
                    alt="availability"
                  />
                  {therapist?.availableIn || "Availability not specified"}
                </p>
                {/* <p className="text-gray-600 flex items-center gap-2 ml-2 text-[13px] mb-12">
                  <FaCar />

                  {therapist?.availableIn}
                </p> */}

                {/* navigate to details */}
                <button
                  onClick={() =>
                    navigate(`/dashboard/featured/${therapist?._id}`)
                  }
                  className="bg-[#E1FCD6] hover:bg-[#1BC738] text-black hover:text-white py-2 px-4 rounded-b-lg transition-all underline w-full absolute bottom-0 right-0 text-[14px]"
                >
                  See Details
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:block">
          <div className="swiper-button-next custom-swiper-button"></div>
          <div className="swiper-button-prev custom-swiper-button"></div>
        </div>

        <div className="absolute md:hidden bottom-10 right-[50%]">
          <div
            className="swiper-button-prev custom-swiper-button"
            style={{ transform: "rotate(180deg)" }}
          ></div>
          <div
            className="swiper-button-next custom-swiper-button"
            style={{ transform: "rotate(180deg)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTherapist;
