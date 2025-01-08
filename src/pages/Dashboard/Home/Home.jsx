import FeaturedTherapist from "./components/FeaturedTherapist";
import PopularCities from "./components/PopularCities";
import Testimonials from "./components/Testimonials";
import TopSection from "./components/TopSection";

const Home = () => {
  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-[#EEF2F5] lg:p-6 "
    >
      <TopSection />
      <FeaturedTherapist />
      <div className="pb-4 md:pb-0 lg:flex gap-6 md:m-2 lg:m-0">
        <div className="lg:w-1/2">
          <Testimonials />
        </div>
        <div className="lg:w-1/2">
          <PopularCities />
        </div>
      </div>
    </div>
  );
};

export default Home;
