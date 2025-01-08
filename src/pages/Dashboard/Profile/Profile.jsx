import { useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar_profile.svg";
import edit from "../../../assets/images/Edit.svg";
import edit1 from "../../../assets/images/Edit_1.svg";
import msg from "../../../assets/images/msg.svg";
// import location from "../../../assets/images/Location.svg";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "../../../utils/jwt";

const Profile = () => {
  const [imageLoading, setImageLoading] = useState(false);
  // const [profilePicture, setProfilePicture] = useState(
  //   localStorage.getItem("customerProfilePicture") || ""
  // );
  const [profileAvatar,setProfileAvatar] = useState("")
  const [decodedToken, setDecodedToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    oldPassword: "",
    newPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customers, setCustomers] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  // Fetch all customers when decoded token is available
  useEffect(() => {
    if (decodedToken) {
      fetch("http://localhost:8800/api/customer/all")
        .then((response) => response.json())
        .then((data) => {
          console.log('data fetch',data)
          setCustomers(data); // Set all customers' data in state
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
          toast.error("Error fetching customer data");
        });
    }
  }, [decodedToken]);

  // Find and set the customer data based on the decoded token's email
  useEffect(() => {
    if (customers?.data?.length > 0 && decodedToken) {
      const customerData = customers.data.find(
        (customer) => customer.email === decodedToken.email
      );
      if (customerData) {
        console.log('match customer',customerData)
        setProfileAvatar(customerData?.profilePicture || "")
        setFormData({
          name: customerData.name,
          address: customerData.address || "",
          oldPassword: "",
          newPassword: "",
        });
        // setProfilePicture(customerData.profilePicture);
      }
    }
  }, [customers, decodedToken]);

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    setImageLoading(true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder_name", "upload_images");

      try {
        const response = await fetch(
          `http://localhost:8800/api/therapist/upload/${decodedToken?.role}/${decodedToken?.id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast.success("Upload profile image successfully");
          // const updatedProfilePicture = data.customer.profilePicture;
          // localStorage.setItem("customerProfilePicture", updatedProfilePicture);
          // setProfilePicture(updatedProfilePicture);
          window.location.reload()
        } else {
          console.error("Error uploading image:", data);
          toast.error("Error uploading image:");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setImageLoading(false);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8800/api/customer/update/${decodedToken?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully", responseData);
        toast.success("Profile updated successfully");
        window.location.reload()
        
      } else {
        console.error("Failed to update profile", responseData);
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {imageLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <p className="text-white text-2xl font-semibold">
            Image Uploading...
          </p>
        </div>
      )}
      <div className="md:w-[500px] mx-4 md:mx-auto my-6 md:my-10">
        <div className="rounded-lg px-5 py-6 md:p-12 bg-white">
          <h3 className="text-2xl text-primary font-semibold">Profile Settings</h3>
          <p className="text-secondary text-[15px] mt-4 mb-9">
            Update Your Necessary Information and Details.
          </p>

          <div className="flex items-center justify-start mb-6 relative">
            <label
              htmlFor="avatar-upload"
              className="w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-[#1BC738] cursor-pointer"
            >
              <img
                src={profileAvatar || avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatar-upload"
              className="bg-[#1BC738] absolute bottom-0 left-20 w-8 h-8 flex justify-center rounded-full p-[6px] cursor-pointer"
            >
              <img src={edit} alt="Edit Icon" />
            </label>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 relative">
              <label className="text-primary font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                placeholder="Your name..."
              />
              <button
                type="button"
                className="absolute top-14 right-5 w-[22px] h-[22px]"
              >
                <img src={edit1} alt="edit1" />
              </button>
            </div>

            <div className="flex flex-col gap-4 relative">
              <label className="text-primary font-medium">Address</label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                placeholder="260 Meserole Street, NY"
              />
              <button
                type="button"
                className="absolute top-14 right-5 w-[22px] h-[22px]"
              ><img src={msg} alt="msg" /></button>
            </div>

            <div className="flex flex-col gap-4 relative">
              <label className="text-primary font-medium">Old Password</label>
              <input
                type="text"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute top-14 right-5 w-[22px] h-[22px]"
              >
                <img src={edit1} alt="edit1" />
              </button>
            </div>

            <div className="flex flex-col gap-4 relative">
              <label className="text-primary font-medium">New Password</label>

              <input
                type="text"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute top-14 right-5 w-[22px] h-[22px]"
              >
                <img src={edit1} alt="edit1" />
              </button>
            </div>

            <div className="md:w-3/5 mx-auto">
              <button
                type="submit"
                className={`bg-[#1BC738] rounded-[10px] text-white py-4 px-16 font-semibold ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
