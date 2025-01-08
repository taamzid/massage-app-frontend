import { Link } from "react-router-dom";
import locationIcon from "../../../../assets/icons/Location.svg";
import carIcon from "../../../../assets/icons/car.svg";
import dolarIcon from "../../../../assets/icons/doler.svg";
import fillHeartIcon from "../../../../assets/icons/fillHeart.svg";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,  Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MostViewed = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("./therapist.json")
            .then(res => res.json())
            .then(data => {
                setData(data?.therapists);
                console.log(data?.therapists);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })
    }, [])

    if(data.length === 0){
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <h2 className="text-[18px]">Todays Most Viewed Therapist</h2>

            <div className="my-6 rounded-lg swiper-container w-full">
                <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={10}
                breakpoints={{
                    320: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                    },
                    640: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                    },
                    768: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    },
                    1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    },
                    1280: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    },
                }}
                
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className="custom-swiper "
                >
                {data?.map((therapist, i) => (
                    <SwiperSlide key={i}>
                    <div className="card bg-white rounded-lg relative text-left shadow-lg border">
                        <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="card-image w-full h-40 object-cover rounded-lg mb-4 mx-auto"
                        />
                        <h4 className="text-[14px] font-[500]  mb-2 ml-2">
                        {therapist.name}
                        </h4>
                        <p className="text-gray-600 flex items-center mb-2 text-[13px] ml-2">
                        <img src={locationIcon} alt="" />
                        {therapist.address}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2 ml-2 text-[13px] mb-2">
                        <img src={carIcon} alt="" />
                        Mobile & In-Studio
                        </p>
                        <p className="text-[#1BC738] flex items-center gap-1 ml-2 text-[13px] mb-12">
                        <img src={dolarIcon} alt="" />
                        {therapist.payment}
                        </p>
                        <Link to={`${therapist.id}`}>
                        <button className="bg-[#E1FCD6] hover:bg-[#1BC738] text-black hover:text-white py-2 px-4 rounded-b-lg transition-all underline w-full absolute bottom-0 right-0 text-[14px]">
                        See Details
                        </button>
                        </Link>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
}

export default MostViewed;