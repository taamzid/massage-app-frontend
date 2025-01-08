import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { addMessage, sendMessage } from "../../../store/slices/chat.slice";
import { decodeToken } from "../../../utils/jwt";
const socket = io("http://localhost:8800");
const MessageModal = ({ closeModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [decodedToken, setDecodedToken] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);
  const senderId = decodedToken?.id;

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log(input, "input message");
    const messageData = {
      senderId: senderId,
      receiverId: id,
      senderModel: "Customer",
      receiverModel: "Therapist",
      message: input,
    };

    dispatch(addMessage(messageData));

    socket.emit("sendMessage", messageData);
    dispatch(sendMessage(messageData));
    toast.success("Message Send Successfully");
    setInput("");
  };
  return (
    <div className="fixed inset-0 z-50 grid grid-cols-[1fr,10fr,1fr] md:grid-cols-[5fr,5fr,2fr] items-center justify-center bg-black bg-opacity-50 ">
      <div></div>
      <div className="bg-white w-full max-w-full rounded-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={closeModal}
        >
          <MdClose size={20} />
        </button>
        <h2 className="text-[14px] mb-3 ">
          Request for Massage Therapy Session
        </h2>
        <form>
          <textarea
            placeholder="I am interested in booking a message therapy session with you."
            className="w-full border rounded-lg mb-3 px-4 py-2 text-[14px] h-[80px]"
            onChange={handleInputChange}
            value={input}
          ></textarea>

          <button
            type="submit"
            className="bg-[#1BC738] text-white py-2 px-6 rounded flex mx-auto"
            onClick={handleSend}
          >
            Send Message
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default MessageModal;
