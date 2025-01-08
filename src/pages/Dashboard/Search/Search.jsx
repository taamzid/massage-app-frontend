import MostViewed from "./components/MostViewed";
import TopCities from "./components/TopCities";


const Search = () => {
    
    return(
        <div
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="bg-[#EEF2F5] p-6 "
        >
            <MostViewed />
            <TopCities />
        </div>
    )
}

export default Search;