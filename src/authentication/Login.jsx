import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo.svg";
import AuthSwiper from "../components/shared/Swiper/AuthSwiper";
import LoginForm from "./forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex items-center justify-center mx-auto mt-8 md:mt-0 2xl:mt-[100px]">
      <div className="md:grid md:grid-cols-[5fr,7fr] items-center justify-center md:gap-[50px] 2xl:gap-[100px]">
        <div className="">
          <div className="flex flex-col items-start justify-center gap-2">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt=""
              className="cursor-pointer"
            />
            <h2 className="text-[#152A16] font-[600] text-[20px] leading-[24px]">
              Zentitood
            </h2>
          </div>

          <div className={` bg-white pt-4 md:pt-8 pb-5 rounded-t-[50px] `}>
            <LoginForm />
          </div>
        </div>

        <div className="hidden md:block relative w-full">
          <div className="">
            {/* <img src={swiperImg1} alt="" className="w-full mx-auto blur" /> */}
            <AuthSwiper />
          </div>
          <div
            className="z-[100] bg-[#152A16] p-8 rounded-lg text-center absolute top-[42%] right-[28%] text-[22px] font-['Poppins', sans-serif]"
            style={{ opacity: "0.7" }}
          >
            <p className="text-[#1BC738] font-semibold">
              Sign In{" "}
              <span className="text-white">
                to view all the <br />
                message therapists
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
