import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBookings,
  verifyBookingToken,
} from "../../store/slices/booking.slice";
import { decodeToken } from "../../utils/jwt";

const Bookings = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
      dispatch(fetchBookings(decoded.id));
    }
  }, [dispatch]);

  const handleBookingClick = async (bookingId) => {
    setSelectedBookingId(bookingId);
    const verified = await dispatch(verifyBookingToken(bookingId));
    setAuthorized(verified.payload.success);
  };
  console.log(bookings, "bookings");
  const selectedBooking = bookings?.find(
    (booking) => booking._id === selectedBookingId
  );

  return (
    <div className="px-4 py-2 md:py-6 md:p-[30px] bg-[#F8F9FB] h-[84vh] md:h-[40vh] 2xl:h-[91vh]">
      <h5 className="text-lg font-medium text-[#152A16] text-center md:text-left">
        All Bookings
      </h5>
      <div className="mt-5 flex flex-col md:flex-row gap-5">
        <div className="flex md:hidden w-full overflow-auto py-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              onClick={() => handleBookingClick(booking._id)}
              className={`flex-shrink-0 w-[50px] h-[50px] md:w-20 md:h-20 m-1 rounded-full flex items-center justify-center ${
                selectedBookingId === booking._id
                  ? "bg-[#17a2b8]"
                  : "bg-gray-500"
              } cursor-pointer transition`}
            >
              <img
                src={booking?.customer?.profilePicture}
                alt="Booking Icon"
                className="w-10 h-10"
              />
            </div>
          ))}
        </div>
        <div className="hidden md:block md:w-1/3 2xl:w-1/5 md:border md:bg-white rounded-lg md:shadow-md md:h-[550px] 2xl:h-[84vh] overflow-auto">
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              onClick={() => handleBookingClick(booking._id)}
              className={`flex items-center gap-3 px-3 py-5 ${
                selectedBookingId === booking._id
                  ? "bg-[#17a2b8]"
                  : "bg-[#1BC738]"
              } cursor-pointer transition`}
            >
              <img
                src={booking?.customer?.profilePicture}
                alt="Booking Icon"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-medium text-white">
                  {`Booking for ${booking.service.name}`}
                </span>
                <span className="text-sm font-normal text-white">
                  Tap to view details
                </span>
              </div>
            </div>
          ))}
        </div>
        {selectedBooking ? (
          authorized ? (
            <div className="md:w-2/3 2xl:w-4/5 border bg-white rounded-lg shadow-md flex-grow md:h-auto">
              <div className="p-3 md:p-6">
                <h5 className="text-lg font-medium">
                  {`Booking Details for ${selectedBooking.service.name}`}
                </h5>
                <div className="mt-4 text-sm">
                  <p>
                    <strong>Customer:</strong> {selectedBooking?.customer?.name}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedBooking.time}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedBooking.date}
                  </p>
                  <p>
                    <strong>Service Type:</strong> {selectedBooking.serviceType}
                  </p>
                  <p>
                    <strong>Price:</strong> $
                    {selectedBooking.totalPrice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedBooking.status}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {`${selectedBooking.address.street}, ${selectedBooking.address.city}`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full text-center my-auto">
              <div className="p-6 rounded-lg ">
                <div className="text-gray-800 text-lg font-medium mb-4">
                  To View This Booking
                </div>
                <div className="text-gray-600 mb-4">Please Pay $15</div>
                <Link
                  to={`/thp/booking-checkout/${selectedBookingId}`}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                >
                  Pay Now
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="w-full text-center my-auto">
            Select a booking to see details
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
