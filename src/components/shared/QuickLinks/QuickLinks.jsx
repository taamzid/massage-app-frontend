import { Link } from "react-router-dom";


const QuickLinks = () => {
    return (
        <div
          className="p-6 rounded-lg"
          style={{background: "linear-gradient(90deg, #FAFFFB 0%, #EEF2F5 100%)"}}>
            <div
              className=" flex gap-16"
            >
                <div className="text-[15px] flex flex-col gap-3">
                    <h2>Quick Links</h2>
                    <Link className="underline text-[#5C635A]" to="/">Home</Link>
                    <Link className="underline text-[#5C635A]" to="/new-listing">New Listing</Link>
                    <Link className="underline text-[#5C635A]" to="/search">Search</Link>
                    <Link className="underline text-[#5C635A]" to="/favorites">Favorites</Link>
                </div>
                <div className="text-[15px] flex flex-col gap-3">
                    <h2>Follow Us</h2>
                    <Link className="underline text-[#5C635A]" to="/">Facebook</Link>
                    <Link className="underline text-[#5C635A]" to="/new-listing">Instagram</Link>
                    <Link className="underline text-[#5C635A]" to="/search">Twitter</Link>
                </div>
                <div className="text-[15px] md:flex flex-col gap-3 hidden">
                    <h2>Legal</h2>
                    <Link className="underline text-[#5C635A]" to="/terms&conditions">terms & Condition of Service</Link>
                    <Link className="underline text-[#5C635A]" to="/privacy-policy">Privacy Policy</Link>
                    <Link className="underline text-[#5C635A]" to="/report">Report</Link>
                </div>
            </div>
            <div className="text-[15px] flex flex-col gap-3 md:hidden mt-8">
                    <h2>Legal</h2>
                    <Link className="underline text-[#5C635A]" to="/terms&conditions">terms & Condition of Service</Link>
                    <Link className="underline text-[#5C635A]" to="/privacy-policy">Privacy Policy</Link>
                </div>
        </div>
    )
};

export default QuickLinks;