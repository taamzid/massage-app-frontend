import { Link } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";
import QuickLinks from "../../../components/shared/QuickLinks/QuickLinks";

const About = () => {
    return(
        <div
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="bg-[#EEF2F5] p-6 lg:w-[80%] mx-auto"
        >
            <h2 className="text-[#152A16] font-[500] text-[30px] leading-[40px] mb-4">About <br />Zentitood</h2>
            <img src={logo} alt="Zentitood" />
            <p className="text-justify text-[15px] font-[400] text-[#5C635A] my-4 leading-[30px]">
                Welcome to Zenitood, your ultimate destination for discovering the finest massage therapists in the industry. Our mission is to connect you with highly skilled professionals who are dedicated to enhancing your well-being through the art of therapeutic touch. <br />At Zenitood, we believe that a great massage is not just a luxury, but a pathway to a healthier, more balanced life. Whether you’re seeking relief from stress, pain management, or simply a moment of relaxation, our curated selection of therapists is here to meet your unique needs. Each therapist in our network is carefully vetted to ensure they meet our high standards of excellence and professionalism. <br />Our user-friendly platform makes it easy to find and book appointments with top-rated massage therapists in your area. Browse detailed profiles, read reviews from other clients, and choose the perfect therapist for your specific requirements. We take pride in offering a seamless and secure booking experience, so you can focus on what matters most – your well-being. <br />Join the Zenitood community today and embark on a journey towards rejuvenation and tranquility. Let us help you find the perfect balance of mind, body, and spirit through the healing power of massage.
            </p>
            
            <QuickLinks />
        </div>
    )
}

export default About;