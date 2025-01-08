/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { LuEyeOff } from "react-icons/lu";
import dolarIcon from "../../../../assets/icons/doler.svg";
import timerIcon from "../../../../assets/icons/timer1.svg";
import Map from "../../../../components/shared/Map/Map";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "../../../../utils/jwt";
import axios from "axios";
import { toast } from "react-toastify";
// import { space } from "postcss/lib/list";

const RightParts = ({ therapistData }) => {
  const features = [
    {
      title: "Spa-quality bodywork",
      time: "30 mins",
      pay: "150",
    },
    {
      title: "Blending Deep Tissue",
      time: "30 mins",
      pay: "150",
    },
    {
      title: "Spa-quality bodywork",
      time: "30 mins",
      pay: "150",
    },
  ];
  // console.log(therapistData);

  // const [decodedToken, setDecodedToken] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // get user info from token
  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      // setDecodedToken(decoded);
      setCustomerId(decoded?.id);
    }
  }, []);

  // add therapist to favorite
  const handleFavorite = () => {
    // console.log(customerId, therapistData?._id);
    const therapistId = therapistData?._id;
    axios
      .post(`http://localhost:8800/api/customer/favorite`, {
        customerId,
        therapistId,
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          toast.success("Therapist added to favorites");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        toast.error("Couldn't add to favorites.Try again later");
      });
  };

  return (
    <div>
      {/* heading */}
      <div className="flex items-center  justify-between">
        <h2 className="text-[22px] mx-6 md:mx-0">
          {therapistData?.name || "Not Specified"}
        </h2>
        {/* button */}
        <div className="flex items-center gap-4 mx-6">
          {/* add to favorites */}
          <button
            onClick={handleFavorite}
            className="text-lg bg-white p-1.5 rounded-full "
          >
            <CiHeart />
          </button>
          <button className="text-lg bg-white p-1.5 rounded-full text-[#152A16]">
            <LuEyeOff />
          </button>
        </div>
      </div>
      {/* short bio */}
      <p className="text-[#5C635A] font-[15px] mb-4 mx-6 md:mx-0">
        US Licensed Clinical Therapist
      </p>

      {/* services section */}
      <p className="text-[18px] mx-6 md:mx-0">Therapist's Services</p>
      <div className="hidden md:flex items-center gap-3 my-3">
        <div className="border bg-white rounded-lg p-3">
          <p className="text-[15px]">Spa-quality bodywork</p>
          <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <img src={timerIcon} alt="timer" />
              <p>30 mins</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={dolarIcon} alt="payment" className="w-3" />
              <p>150</p>
            </div>
          </div>
        </div>
        <div className="border bg-white rounded-lg p-3">
          <p className="text-[15px]">Blending Deep Tissue</p>
          <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <img src={timerIcon} alt="timer" />
              <p>30 mins</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={dolarIcon} alt="payment" className="w-3" />
              <p>150</p>
            </div>
          </div>
        </div>
        <div className="border bg-white rounded-lg p-3">
          <p className="text-[15px]">Lymphatic Drainage</p>
          <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <img src={timerIcon} alt="timer" />
              <p>30 mins</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={dolarIcon} alt="payment" className="w-3" />
              <p>150</p>
            </div>
          </div>
        </div>
      </div>

      {/* mobile only */}
      <div className="my-6 ml-6 rounded-lg swiper-container w-full md:hidden">
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="custom-swiper "
        >
          {features?.map((ft, i) => (
            <SwiperSlide key={i}>
              <div className="border bg-white rounded-lg p-3 cursor-pointer">
                <p className="text-[15px]">{ft.title}</p>
                <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <img src={timerIcon} alt="timer" />
                    <p>{ft.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={dolarIcon} alt="payment" className="w-3" />
                    <p>{ft.pay}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* about section */}
      <div className="mx-6 lg:mx-0">
        <button className="bg-[#E1FCD6] font-medium rounded-lg px-2 py-1 border">
          About me
        </button>
        <p className="text-[#5C635A] text-[15px] font-[400] m-2 mb-4 text-justify">
          {/* Therapy is the first small step towards restoring your connection to
          YOU. A successful outcome looks like you living the whole, connected
          life that you have worked so hard towards. It is possible to move
          through life's ups and downs with ease and curiosity (instead of being
          stuck in old habit patterns which are no longer serving you well). You
          too can do it. Our work together would take us deeper into your
          unique, lived reality. I firmly believe that your true, authentic self
          is within you all along. My goal is to help identify and remove the
          barriers along the way. Virtual therapy is easier than ever: Just pop
          in your earbuds and open your laptop. Schedule a free 20-min consult
          with me whenever you are ready! */}
          {therapistData?.about}
        </p>

        {/* Location section */}
        <button className="bg-[#E1FCD6] font-medium rounded-lg px-2 py-1 border">
          Location
        </button>
        <div>
          <Map />
        </div>

        {/* Additional Information Section */}
        <button className="bg-[#E1FCD6] font-medium rounded-lg px-2 py-1 mb-2 mt-6">
          Additional Information
        </button>
        <div className="flex flex-col gap-3">
          {/* massage types/ techniques */}
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">Techniques: </span>
            <span>
              {therapistData?.massageTypesAndRates
                ?.map((massage) => massage?.massageType)
                .join(", ")}
            </span>
            {/* Deep Tissue, Lomi Lomi, Lymphatic drainage */}
          </p>

          {/* experience */}
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">Experience: </span>
            {therapistData?.experience} years
          </p>

          {/* In-studio amenities */}
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">In-studio amenities: </span>
            {/* Bottled Water. Drinking Water Free Parking. Massage Table. */}
            Not specified
          </p>

          {/* Mobile Extras */}
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">Mobile extras: </span>
            {/* Cupping, Facials, Waxing */}
            Not specified
          </p>

          {/* additional services*/}
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">Additional Services: </span>
            {/* Cupping, Facials, Waxing */}
            Not specified
          </p>
        </div>

        {/* education section */}
        <button className="bg-[#E1FCD6] font-medium rounded-lg px-2 py-1 mb-2 mt-6">
          Education
        </button>
        <div className="flex flex-col gap-3">
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">2010: </span>Master in
            Social Work, Texas State University, San Marcos{" "}
          </p>
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">2011: </span>Licensed Master
            Social Worker (Texas Behavioral Health Council){" "}
          </p>
          <p className="text-[15px] font-[400] text-[#5C635A]">
            <span className="text-black font-[500]">2016: </span>Licensed
            Clinical Social Worker (Texas Behavioral Health Council){" "}
          </p>
        </div>

        {/* uploaded pictures section */}
        <button className="bg-[#E1FCD6] font-medium rounded-lg px-2 py-1 border mb-2 mt-6">
          Uploaded Pictures
        </button>
        <div>{/* for pictures */}</div>
      </div>
    </div>
  );
};

export default RightParts;
