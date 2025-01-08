import { useEffect, useState } from "react";

const PopularCities = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch('/cities.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data?.cities);
                setData(data?.cities);
            })
            .catch((error) => console.log('Error fetching data: ', error))
    } ,[]);

    if(data?.length == 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="mx-6">
            <h3 className='text-[18px] font-[500px] my-6 md:mt-0 mb-5 text-center md:text-left'>Popular Cities</h3>

            <div className="bg-white grid grid-cols-2 md:grid-cols-3 justify-between items-center border border-b-2 rounded-lg">
                {
                    data?.map((city) => (
                        <div key={city?.id} className=" mb-2">
                            <p className={`text-[#156BCA] underline text-[14px] px-6 py-2 ${city?.id && parseInt(city?.id) < 4 ? "mt-2" : ""}`}>{city?.name}</p>
                            {
                                city?.id < 19 ? <hr className="mt-2"/> : ""
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularCities;