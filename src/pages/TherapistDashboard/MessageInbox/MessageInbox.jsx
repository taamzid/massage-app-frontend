import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  addMessage,
  fetchConnectedUsers,
  fetchMessages,
  sendMessage,
} from "../../../store/slices/chat.slice";

import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import dot from "../../../assets/images/dot.svg";
import userIcon from "../../../assets/images/inbox_image.svg";
import sendIcon from "../../../assets/images/send.svg";
import senderIcon from "../../../assets/images/sender_user.svg";
import { decodeToken } from "../../../utils/jwt";
const socket = io("http://localhost:8800");

const MessageInbox = () => {
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const dispatch = useDispatch();
  const { messages, connectedUsers } = useSelector((state) => state.messages);
  console.log(connectedUsers, "connected users");
  const [decodedToken, setDecodedToken] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);
  const id = decodedToken?.id;
  const role = decodedToken?.role;

  useEffect(() => {
    dispatch(fetchConnectedUsers({ userId: id, role }));
    socket.emit("join", id);
    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (decodedToken?.id && selectedUserId && role === "therapist") {
      dispatch(
        fetchMessages({ senderId: decodedToken.id, receiverId: selectedUserId })
      );
    } else if (decodedToken?.id && selectedUserId && role === "customer") {
      dispatch(
        fetchMessages({ senderId: decodedToken.id, receiverId: selectedUserId })
      );
      setAuthorized(true);
    }
  }, [dispatch, selectedUserId]);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSend = () => {
    if (!input.trim()) return;

    const messageData = {
      senderId: id,
      receiverId: selectedUserId,
      senderModel: role === "customer" ? "Customer" : "Therapist",
      receiverModel: role === "customer" ? "Therapist" : "Customer",
      message: input,
    };

    socket.emit("sendMessage", messageData);
    dispatch(sendMessage(messageData));

    setInput("");
  };

  const handleUserClick = async (userId) => {
    if (userId === selectedUserId) {
      return;
    }
    setSelectedUserId(userId);
    if (role === "customer") {
      setAuthorized(true);
    } else {
      checkMessageToken(userId);
    }
  };

  const checkMessageToken = async (customerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/payment/verify-token/${customerId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "response data");
      setAuthorized(response.data.success);
    } catch (error) {
      console.error(
        "Failed to verify message token:",
        error.response?.data || "Unknown error"
      );
      setAuthorized(false);
    }
  };

  const selectedUser = Array.isArray(connectedUsers)
    ? connectedUsers.find((user) => user?._id === selectedUserId)
    : {};
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="px-4 py-2 md:py-6 md:p-[30px] bg-[#F8F9FB] h-[84vh] md:h-[40vh] 2xl:h-[92vh]">
      <h5 className="text-lg font-medium text-[#152A16] text-center md:text-left">
        All Messages
      </h5>
      <div className="md:mt-5 flex flex-col md:flex-row gap-5">
        <div className="hidden item-center justify-center md:block md:w-1/3 2xl:w-1/5 md:border md:bg-white rounded-lg md:shadow-md md:h-[550px] 2xl:h-[84vh] overflow-auto">
          {connectedUsers?.map((user) => (
            <div className="" key={user._id}>
              <div
                key={user?._id}
                onClick={() => handleUserClick(user._id)}
                className={`rounded-full md:rounded-none md:flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-5 ${
                  selectedUserId === user?._id ? "bg-[#17a2b8]" : "bg-[#1BC738]"
                } cursor-pointer transition`}
              >
                <img
                  src={user?.avatar || userIcon}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full hidden md:block"
                />
                <div className="flex items-center justify-center">
                  <img
                    src={user?.avatar || userIcon}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full md:hidden"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#fff] hidden md:block">
                    {user?.name}
                  </span>
                  <span className="hidden md:block text-[8px] md:text-sm font-normal text-[#fff] mt-2 md:mt-0 text-center md:text-normal">
                    Tap to view messages
                  </span>
                </div>
              </div>
              <span className="text-[8px] font-medium text-black md:hidden mt-2 md:mt-0 text-center">
                {user?.name}
              </span>
            </div>
          ))}
        </div>
        <div className="md:hidden flex item-center gap-4 md:w-1/3 2xl:w-1/5 md:border md:bg-white rounded-lg md:shadow-md h-[120px] md:h-[550px] 2xl:h-[84vh]">
          {connectedUsers?.map((user) => (
            <div
              className="relative flex items-center justify-center gap-4"
              key={user._id}
            >
              <div
                key={user?._id}
                onClick={() => handleUserClick(user._id)}
                className={`rounded-full flex flex-col items-center gap-4 md:gap-3 px-2 md:px-3 py-2 md:py-5 ${
                  selectedUserId === user?._id ? "bg-[#17a2b8]" : "bg-gray-500"
                } cursor-pointer transition`}
              >
                <div className="relative flex items-center justify-center ">
                  <img
                    src={user?.avatar || userIcon}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full md:hidden"
                  />
                </div>
                <span className="absolute text-[8px] font-medium text-black md:hidden top-[90px] mt-2 md:mt-0 text-center">
                  {user?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        {selectedUser ? (
          authorized ? (
            <div className="md:w-2/3 2xl:w-4/5 border bg-white rounded-lg shadow-md h-[62vh] md:h-[76.4vh] 2xl:h-[84vh]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-3 md:p-6">
                  <div className="flex items-center gap-3 cursor-pointer transition">
                    <img
                      src={selectedUser?.avatar || userIcon}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {selectedUser?.name || "Select a user"}
                      </span>
                      {/* <span className="text-sm font-normal">User details</span> */}
                    </div>
                  </div>
                  <img src={dot} alt="Settings" />
                </div>
                <div className="h-[1px] bg-gray-300"></div>
                <div className="flex flex-col p-3 md:p-6 gap-4 flex-1 overflow-auto mt-2 md:mt-0">
                  {messages
                    .filter(
                      (msg) =>
                        (msg.senderId === selectedUserId ||
                          msg.receiverId === selectedUserId) &&
                        (msg.senderId === id || msg.receiverId === id)
                    )
                    .map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.senderId === id ? "justify-end" : "justify-start"
                        } items-center gap-4`}
                      >
                        {msg.senderId !== id && (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={userIcon}
                            alt="Receiver Avatar"
                          />
                        )}
                        <div
                          className={`p-2 md:p-4 rounded-lg max-w-xs ${
                            msg.senderId === id
                              ? "text-[#fff] bg-[#1BC738]"
                              : "text-[#152A16] bg-[#EEF2F5]"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        {msg.senderId === id && (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={senderIcon}
                            alt="Sender Avatar"
                          />
                        )}
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="mt-4 flex items-center p-3 md:p-5 gap-4">
                  <input
                    type="text"
                    placeholder="Type a message here..."
                    className="flex-1 border rounded-lg p-[10px] md:p-[18px] text-secondary text-sm focus:outline-none focus:ring-1 focus:ring-[#1BC738]"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <button
                    className="p-3 md:p-5 bg-[#1BC738] rounded-lg transition"
                    onClick={handleSend}
                  >
                    <img src={sendIcon} alt="Send" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full text-center my-auto">
              <div className="w-full flex justify-center items-center min-h-screen">
                <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
                  <div className="text-gray-800 text-lg font-medium mb-4">
                    To View This Message
                  </div>
                  <div className="text-gray-600 mb-4">Please Pay $15</div>
                  <Link
                    to={`/thp/checkout?userId=${selectedUserId}`}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full text-center my-auto">
            Select user for see messages
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;
