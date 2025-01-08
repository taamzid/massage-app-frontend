/* eslint-disable react/prop-types */
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
import GoogleLoginComponent from "../../components/GoogleLoginComponent/GoogleLoginComponent";
import FacebookLoginComponent from "../../components/FacebookLoginComponent/FacebookLoginComponent";

const SocialLogin = ({ role }) => {
  // console.log('role',role)
  // const navigate = useNavigate();

  return (
    <div>
      <div className="md:flex justify-center md:justify-between gap-4 md:gap-8 items-center my-4">
        <div className="w-full ">
          <GoogleLoginComponent role={role} />
        </div>

        {/* <div className="w-full mt-4 md:mt-0">
          <FacebookLoginComponent role={role} />
        </div> */}
      </div>
    </div>
  );
};

export default SocialLogin;
