/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import dolarIcon from "../../../assets/icons/doler.svg";
import timerIcon from "../../../assets/icons/timer1.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "../../../utils/jwt";
import { toast } from "react-toastify";

const BookingModal = ({ closeModal, data }) => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [selectedService, setSelectedService] = useState({
    name: "",
    price: 0,
    duration: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [service, setService] = useState("incall");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in address) {
      setAddress({ ...address, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      time,
      date,
      address,
      service: selectedService,
      serviceType: service, // Adjust based on how you define serviceType
      totalPrice: Number(totalPrice),
      therapist: data?._id,
      customer: decodedToken?.id, // Assuming you have a customer ID
    };

    if (
      bookingData.time === "" ||
      bookingData.date === "" ||
      bookingData.address.street === "" ||
      bookingData.address.city === "" ||
      bookingData.address.state === "" ||
      bookingData.address.zip === "" ||
      bookingData.service.name === "" ||
      bookingData.service.price === "" ||
      bookingData.service.duration === "" ||
      bookingData.address.apartment === "" ||
      bookingData.service === "" ||
      bookingData.serviceType === "" ||
      bookingData.totalPrice === "" ||
      bookingData.therapist === "" ||
      bookingData.customer === ""
    ) {
      alert("Please fill all required fields");
      return;
    }
    console.log("bookingData", bookingData);

    try {
      const res = await axios.post(
        "http://localhost:8800/api/booking",
        bookingData
      );

      if (res?.data?.status == 200) {
        toast.success("Booking confirmed successfully");
        closeModal();
      } else {
        toast.error("Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error confirming booking", error);
    }

    // Here you would typically make an API call
    // For example: await api.post('/bookings', bookingData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:mt-0 overflow-y-scroll">
      <div className="bg-white w-[600px] max-w-full rounded-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={closeModal}
        >
          <MdClose size={20} />
        </button>
        <h2 className="text-xl text-center ">Almost There!</h2>
        <p className="text-xl text-center mb-6">
          Just fill in the details to confirm booking
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
                className="border px-4 py-1.5 rounded-lg placeholder:text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                className="border px-4 py-1.5 rounded-lg placeholder:text-[15px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Street</label>
              <input
                type="text"
                name="street"
                placeholder="260 Meserole Street"
                className="border px-4 py-1.5 rounded-lg"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Apartment/Building/Suite</label>
              <input
                type="text"
                name="apartment"
                placeholder="Write Here..."
                className="border px-4 py-1.5 rounded-lg"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[5fr,7fr] gap-2 mb-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border px-4 py-1.5 rounded-lg"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-[6fr,6fr] gap-2">
              <div className="flex flex-col gap-2 w-full md:w-[150px]">
                <label htmlFor="">State</label>
                <select
                  name="state"
                  className="border px-3 py-2 rounded-lg bg-white"
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  <option value="NY">NY</option>
                  <option value="CA">CA</option>
                  <option value="TX">TX</option>
                  <option value="FL">FL</option>
                  <option value="IL">IL</option>
                  <option value="PA">PA</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-[110px]">
                <label htmlFor="">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="12345"
                  className="border px-4 py-1.5 rounded-lg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="">Select Service</label>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center my-2 gap-3">
              <div
                className={`border rounded-lg px-3 py-2 cursor-pointer ${
                  selectedService?.name === "Spa-quality bodywork"
                    ? "bg-[#d0eed5]"
                    : "bg-white"
                }`}
                onClick={() => {
                  setSelectedService({
                    name: "Spa-quality bodywork",
                    price: 150,
                    duration: "30 mins",
                  });
                  setTotalPrice(150);
                }}
              >
                <p className="text-[15px]">Spa-quality bodywork</p>
                <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <img src={timerIcon} alt="timer" />
                    <p>30 mins</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={dolarIcon} alt="payment" className="w-3" />
                    <p>150</p>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg px-3 py-2 cursor-pointer ${
                  selectedService?.name === "Blending Deep Tissue"
                    ? "bg-[#d0eed5]"
                    : "bg-white"
                }`}
                onClick={() => {
                  setSelectedService({
                    name: "Blending Deep Tissue",
                    price: 150,
                    duration: "30 mins",
                  });
                  setTotalPrice(150);
                }}
              >
                <p className="text-[15px]">Blending Deep Tissue</p>
                <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <img src={timerIcon} alt="timer" />
                    <p>30 mins</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={dolarIcon} alt="payment" className="w-3" />
                    <p>150</p>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg px-3 py-2 cursor-pointer ${
                  selectedService?.name === "Lymphatic Drainage"
                    ? "bg-[#d0eed5]"
                    : "bg-white"
                }`}
                onClick={() => {
                  setSelectedService({
                    name: "Lymphatic Drainage",
                    price: 150,
                    duration: "30 mins",
                  });
                  setTotalPrice(150);
                }}
              >
                <p className="text-[15px]">Lymphatic Drainage</p>
                <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <img src={timerIcon} alt="timer" />
                    <p>30 mins</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={dolarIcon} alt="payment" className="w-3" />
                    <p>150</p>
                  </div>
                </div>
              </div>
              <div
                className={`border rounded-lg px-3 py-2 cursor-pointer ${
                  selectedService?.name === "Total Body Scrub"
                    ? "bg-[#d0eed5] "
                    : "bg-white"
                }`}
                onClick={() => {
                  setSelectedService({
                    name: "Total Body Scrub",
                    price: 150,
                    duration: "30 mins",
                  });
                  setTotalPrice(150);
                }}
              >
                <p className="text-[15px]">Total Body Scrub</p>
                <div className="text-[14px] text-[#1BC738] flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <img src={timerIcon} alt="timer" />
                    <p>30 mins</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={dolarIcon} alt="payment" className="w-3" />
                    <p>150</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between my-6 text-[15px]">
            <p
              className={`w-[50%] text-center py-2 me-5 rounded-lg ${
                service === "incall" ? "bg-[#1BC738] text-white" : "border"
              }`}
              onClick={() => setService("incall")}
            >
              Incall
            </p>
            <p
              className={`w-[50%] text-center py-2 rounded-lg ${
                service === "outcall" ? "bg-[#1BC738] text-white" : "border "
              }`}
              onClick={() => setService("outcall")}
            >
              Outcall
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-[#1BC738] hover:bg-[#1BAF38] text-white px-6 py-2 rounded-lg"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
