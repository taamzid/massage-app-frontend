import { useEffect, useState } from "react";
import VerticalSwiper from "../../../../components/shared/Swiper/VerticalSwiper";

const Testimonials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data?.reviews);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  return (
    <div className="w-full ">
      <h3 className="text-[18px] font-[500px] pl-2 md:pl-0 text-center md:text-left">Featured Testimonial</h3>

      <VerticalSwiper reviews={data} />
    </div>
  );
};

export default Testimonials;
