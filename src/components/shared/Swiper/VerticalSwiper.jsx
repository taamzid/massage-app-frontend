import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Testimonial from "../../../pages/Dashboard/Home/components/Testimonial";

const VerticalSwiper = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += 2) {
    groupedReviews.push([reviews[i], reviews[i + 1]]);
  }

  return (
    <div>
      <div className="lg:mt-5  max-w-full mx-auto p-3 lg:p-0">
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
          {groupedReviews.map((reviewPair, index) => (
            <SwiperSlide key={index}>
              <Testimonial reviewPair={reviewPair} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VerticalSwiper;
