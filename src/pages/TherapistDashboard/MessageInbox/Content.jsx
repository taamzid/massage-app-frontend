import user from "../../../assets/images/inbox_image.svg";
import sender_user from "../../../assets/images/sender_user.svg";
import dot from "../../../assets/images/dot.svg";
import send from "../../../assets/images/send.svg";
const Content = () => {
  return (
    <div className=" flex flex-col h-full">
      {/* Message Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3 cursor-pointer transition">
          <img
            src={user}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium  ">Sagar Soni</span>
            <span className="text-sm font-normal ">
              Student
            </span>
          </div>
        </div>

        {/* 3 dot icon */}
        <div>
          <img src={dot} alt="dot" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px]  bg-gray-300"></div>

      {/* Chat Messages */}
      <div className="flex flex-col p-6 gap-4 flex-1 overflow-auto">
        {/* Sender Message */}
        <div className="flex justify-start items-center gap-4 ">
          <img
            className="w-10 h-10 rounded-full"
            src={sender_user}
            alt="sender_user"
          />
          <div className=" p-4 rounded-lg max-w-xs  text-[#fff] bg-[#1BC738]">
            <p className="text-sm">
              I am interested in booking a massage therapy session with you.
            </p>
          </div>
        </div>

        {/* Receiver Message */}
        <div className="flex justify-end items-center gap-4">
          <div className="bg-[#EEF2F5] p-4 rounded-lg max-w-xs">
            <p className="text-sm text-[#152A16]">
              I am pleased to inform you that I have accepted your request for a
              therapy session. Here are the details of the appointment.
            </p>
          </div>
          <img className="w-10 h-10 rounded-full" src={user} alt="receiver" />
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center p-5 gap-4">
        <input
          type="text"
          placeholder="Type a message here..."
          className="flex-1 border rounded-lg p-[18px] text-secondary text-sm focus:outline-none focus:ring-1 focus:ring-[#1BC738]"
        />
        <button className="p-5 bg-[#1BC738] rounded-lg  transition">
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Content;
