/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
// import { MdLocationPin } from "react-icons/md";
// import { FaCar } from "react-icons/fa6";
import { useState } from "react";
import calenderIcon from "../../../../assets/icons/calender.svg";
import carIcon from "../../../../assets/icons/car.svg";
import dolarIcon from "../../../../assets/icons/doler.svg";
import locationIcon from "../../../../assets/icons/Location.svg";
import timerIcon from "../../../../assets/icons/timer.svg";
import BookingModal from "../../../../components/shared/Modal/BookingModal";
import MessageModal from "../../../../components/shared/Modal/MessageModal";

const DetailsCard = ({ therapistData }) => {
  const { data } = useParams();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);

  const handleOpenMsgModal = () => setIsMsgModalOpen(true);
  const handleCloseMsgModal = () => setIsMsgModalOpen(false);

  const handleOpenBookingModal = () => setIsBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="w-full px-6 md:px-0 md:w-[300px] mx-auto md:mx-6 ">
      {/* image */}
      <div className=" w-full md:h-[314px] md:w-[300px] rounded-lg overflow-hidden mb-5">
        {therapistData?.profilePicture ? (
          <img
            src={therapistData?.profilePicture}
            alt=""
            className="w-full h-full"
          />
        ) : (
          <div className="w-full md:h-[314px] md:w-[300px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No image available
          </div>
        )}
      </div>

      <div className="my-3 bg-white px-3 py-5 rounded-lg relative">
        {/* address */}
        <p className="text-gray-600 flex items-center mb-2 gap-1.5 text-[13px] ml-1.5">
          <img src={locationIcon} alt="Location" />
          {therapistData?.address || "Address not provided"}
        </p>

        {/* availability */}
        <p className="text-gray-600 flex items-center gap-2 ml-2 text-[13px] mb-2">
          <img src={carIcon} alt="dolar" />
          {therapistData?.availableIn || "Availability not specified"}
        </p>
        {/* time */}
        <p className="text-gray-600 flex items-center gap-2 ml-2 text-[13px] mb-2">
          <img src={calenderIcon} alt="dolar" />8 am - 8 pm every day
        </p>
        {/* session duration */}
        <p className="text-gray-600 flex items-center gap-2 ml-2 text-[13px] mb-2">
          <img src={timerIcon} alt="dolar" />
          {therapistData?.session || "Not specified"}
        </p>
        {/* rate */}
        <p className=" flex items-center mb-10 text-[13px] ml-2 text-[#1BC738]">
          <img className="mr-1" src={dolarIcon} alt="dolar" />
          {therapistData.massageTypesAndRates?.[0]?.rate
            ? `${therapistData.massageTypesAndRates?.[0]?.rate} & Up`
            : "Rate not specified"}
        </p>
        {/* message modal */}
        <button
          className="bg-[#1BC738] text-white py-2.5 px-4 rounded-b-lg transition-all w-full absolute bottom-0 right-0 text-[14px]"
          onClick={handleOpenMsgModal}
        >
          Send Messages
        </button>
      </div>

      {/* book modal */}
      <button
        className="bg-[#E1FCD6] border border-[#1BC738] text-[#1BC738] py-2.5 px-4 rounded-lg transition-all w-full  text-[14px] font-medium"
        onClick={handleOpenBookingModal}
      >
        Book Now
      </button>

      {/* additional information */}
      {/* note: static for now, must make bg conditional later */}
      {/* if true - bg-[#1BC738] text-white */}
      <div className="my-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Licensed
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Certified
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Incall
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Outcall
          </div>
          <div className="border rounded-[10px] border-[#1BC738] bg-[#1BC738] text-white text-center py-2.5">
            Insured
          </div>
        </div>
      </div>

      {/* acceptable payments */}
      <div className="my-5">
        <h1 className="text-lg font-semibold mb-4">Acceptable Payments: </h1>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Cash
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Insurance
          </div>
          <div className="border col-span-2 rounded-[10px] border-[#1BC738] text-center py-2.5">
            Credit or Debit Card
          </div>
          <div className="border rounded-[10px] border-[#1BC738] bg-[#1BC738] text-white text-center py-2.5">
            Zelle
          </div>
          <div className="border rounded-[10px] border-[#1BC738]  text-center py-2.5">
            Venmo
          </div>
          <div className="border rounded-[10px] border-[#1BC738] bg-[#1BC738] text-white text-center py-2.5">
            Cashap
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Paypal
          </div>
          <div className="border rounded-[10px] border-[#1BC738] text-center py-2.5">
            Check
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          closeModal={handleCloseBookingModal}
          data={therapistData}
        />
      )}

      {isMsgModalOpen && <MessageModal closeModal={handleCloseMsgModal} />}
    </div>
  );
};

export default DetailsCard;
