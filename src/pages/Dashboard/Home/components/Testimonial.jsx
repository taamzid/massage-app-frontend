import { FaLocationDot } from "react-icons/fa6";
import img1 from "../../../../assets/images/image 116.svg"

const Testimonial = ({ reviewPair }) => {
  return (
    <div className="bg-white px-3 md:px-6 pt-3 md:pt-7 pb-12 rounded-lg">
      <div className="flex flex-col space-y-4">
        {reviewPair.map((review, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-4 border rounded-lg bg-white px-3">
              <img src={img1} alt="profile" className="w-[130px] h-[140px]" />
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 text-[13px] text-[#5C635A]">
                    <FaLocationDot />
                    <p>{review?.address}</p>
                </div>
                <h4 className="text-[13px] md:text-14 font-[500px]">
                  {review?.name} by{" "}
                  <span className="text-[#1BC738]">{review?.service}</span>
                </h4>
                <p className="text-[13px] md:text-[14px] text-[#7E7E7E]">{review?.company}</p>
                    <p className="text-[11px] md:text-[13px] text-[#5C635A]">
                  {review?.review}...<span className="text-[#1BC738] underline font-[500]">Read More</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
