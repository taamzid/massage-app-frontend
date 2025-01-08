import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TopCities = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch('/cities.json')
            .then(res => res.json())
            .then(data => {
                console.log(data?.cities);
                setData(data?.cities);
            })
            .catch((error) => console.log('Error fetching data: ', error))
    } ,[]);

    if(data?.length == 0) {
        return <div>Loading...</div>
    }

    return(
        <div className="">
            <h3 className='text-[18px] font-[500px] mb-5'>Popular Cities</h3>

            <div className="bg-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-between items-center border border-b-2 rounded-lg">
                {
                    data?.map((city) => (
                        <div key={city?.id} className=" mb-2">
                            <Link to={`city/${city?.id}`}>
                                <p className={`text-[#156BCA] underline text-[14px] px-6 py-4 cursor-pointer ${city?.id && parseInt(city?.id) < 4 ? "mt-2" : ""}`}>{city?.name}</p>
                            </Link>
                            {
                                city?.id < 19 ? <hr className="mt-2"/> : ""
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopCities;