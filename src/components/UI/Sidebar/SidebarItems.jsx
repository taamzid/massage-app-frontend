import { NavLink } from "react-router-dom";
import homeIcon from "../../../assets/icons/home.svg";
import listingIcon from "../../../assets/icons/listing.svg";
import aboutIcon from "../../../assets/icons/about.svg";
import heartIcon from "../../../assets/icons/heart.svg";
import mailIcon from "../../../assets/icons/mail.svg";
import setting from "../../../assets/icons/Setting.svg";

const SidebarItems = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };

  return (
    <nav className="py-8 flex flex-col">
      {[
        { to: "/dashboard/home", icon: homeIcon, label: "Home" },
        { to: "/dashboard/featured", icon: listingIcon, label: "Featured" },
        {
          to: "/dashboard/new-listing",
          icon: listingIcon,
          label: "New Listing",
        },
        { to: "/dashboard/about", icon: aboutIcon, label: "About" },
        { to: "/dashboard/favorites", icon: heartIcon, label: "Favorites" },
        { to: "/dashboard/inbox", icon: mailIcon, label: "Inbox" },
        { to: "/dashboard/profile", icon: setting, label: "My Profile" },
      ].map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          onClick={handleMenuClick}
          className={({ isActive }) =>
            `py-3 transition-all flex items-center gap-3 px-6 ${
              isActive ? "bg-[#E1FCD6] border-l-4 border-l-[#152A16]" : ""
            }`
          }
        >
          <img src={item.icon} alt={item.label} className="shrink-0" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarItems;
