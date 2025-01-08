import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import swiperImg from "../../../assets/images/loginBG.png";
const AuthSwiper = () => {
    const images = [swiperImg, swiperImg, swiperImg];
    return (
        <div className="lg:mt-5 max-w-2xl mx-auto p-3 lg:p-0">
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img src={img} alt="" className="w-full mx-auto "/>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}
export default AuthSwiper;