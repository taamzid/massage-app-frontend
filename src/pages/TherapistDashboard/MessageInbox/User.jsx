import user from '../../../assets/images/inbox_image.svg'
const User = () => {
    return (
      <div className="">
        {/* User Item */}
        <div className="flex items-center gap-3 px-3 py-5  bg-[#1BC738]  cursor-pointer transition">
          <img
            src={user}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium  text-[#fff]">Sagar Soni</span>
            <span className="text-sm font-normal text-[#fff]">
              Sent a Request for therapy...
            </span>
          </div>
        </div>
  
        {/* Divider */}
        {/* <div className="h-[1px] my-3 bg-gray-300"></div> */}
  
        {/* Add more users */}
        {/* <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9F9F9] cursor-pointer transition">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[#152A16]">Another User</span>
            <span className="text-sm text-[#717171]">Some other message...</span>
          </div>
        </div> */}
      </div>
    );
  };
  
  export default User;
  