import homeIcon from "../../../assets/icons/home.svg";
import listingIcon from "../../../assets/icons/listing.svg";
import aboutIcon from "../../../assets/icons/about.svg";
import settingsIcon from "../../../assets/icons/Setting.svg";
import mailIcon from "../../../assets/icons/mail.svg";
import booking from "../../../assets/icons/bookings.svg";
import { NavLink } from "react-router-dom";


const TherapistSidebarItems = ({mobileMenuOpen, setMobileMenuOpen}) => {
    return(
        <nav className="py-8 flex flex-col">
        <NavLink
          to="/thp/inbox"
          onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
          className={({ isActive }) =>
            `py-3 transition-all flex items-center gap-3 px-6 ${
              isActive ? "bg-[#E1FCD6] border-l-4 border-l-[#152A16]   " : ""
            }`
          }
        >
          <img src={mailIcon} alt="home" className="shrink-0" />
          <span>Inbox</span>
        </NavLink>
        <NavLink
          to="/thp/booking"
          onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
          className={({ isActive }) =>
            `py-3 transition-all flex items-center gap-3 px-6 ${
              isActive ? "bg-[#E1FCD6] border-l-4 border-l-[#152A16]   " : ""
            }`
          }
        >
          <img src={booking} alt="booking" className="shrink-0" />
          <span>Booking</span>
        </NavLink>
        
        <NavLink
          to="/thp/my-profile"
          onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
          className={({ isActive }) =>
            `py-3 transition-all flex items-center gap-3 px-6 ${
              isActive ? "bg-[#E1FCD6] border-l-4 border-l-[#152A16]  " : ""
            }`
          }
        >
          <img src={settingsIcon} alt="new listing" className="shrink-0" />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to="/thp/about"
          onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
          className={({ isActive }) =>
            `py-3 transition-all flex items-center gap-3 px-6 ${
              isActive ? "bg-[#E1FCD6] border-l-4 border-l-[#152A16] " : ""
            }`
          }
        >
          <img src={aboutIcon} alt="about" className="shrink-0" />
          <span>About</span>
        </NavLink>
        
      </nav>
    )
}

export default TherapistSidebarItems;