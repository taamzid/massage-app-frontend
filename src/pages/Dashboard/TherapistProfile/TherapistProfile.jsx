import avatar from "../../../assets/images/avatar_professional.png";
import edit from "../../../assets/images/Edit.svg";
import clock from "../../../assets/images/clock.svg";
// import cross_input from "../../../assets/images/cross_input.svg";
import date_icon from "../../../assets/images/date_icon.svg";
import cross from "../../../assets/images/cross_red.svg";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { decodeToken } from "../../../utils/jwt";
import { useNavigate } from "react-router-dom";

const TherapistProfile = () => {
  const [profileDetails, setProfileDetails] = useState({});

  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("NY");
  const [zipCode, setZipCode] = useState("");
  const [newCity, setNewCity] = useState([]);

  const [visitCity, setVisitCity] = useState("");
  const [visitState, setVisitState] = useState("NY");
  const [visitZipCode, setVisitZipCode] = useState("");
  const [visitingCity, setVisitingCity] = useState([]);

  const [sessionMinute, setSessionMinute] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("6 years");

  const [signatureMessage, setSignatureMessage] = useState([]);

  const [massageType, setMassageType] = useState("");
  const [massageRate, setMassageRate] = useState("");

  const [massageAndRate, setMassageAndRate] = useState([]);

  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [firstDayOpen, setFirstDayOpen] = useState(false);
  const [lastDayOpen, setLastDayOpen] = useState(false);

  const [timeDate, setTimeDate] = useState(null);
  const [timeDateOpen, setTimeDateOpen] = useState(false);
  const [availableIn, setAvailableIn] = useState("Mobile & In-Studio");

  const [decodedToken, setDecodedToken] = useState(null);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const [profilePicture, setProfilePicture] = useState(
  //   localStorage.getItem("therapistProfilePicture") || ""
  // );

  // payment related
  const [selectedPayments, setSelectedPayments] = useState([]);

  const navigate = useNavigate();

  const email = decodedToken?.email || "";
  const userType = "therapist";

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  // const paymentToken = Cookies.get("paymentToken");

  const fetchDetails = async () => {
    const response = await fetch(
      "http://localhost:8800/api/therapist/professional-details"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // console.log("Fetched data:", data);
    return data;
  };

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["profileDetails"],
    queryFn: fetchDetails,
  });

  useEffect(() => {
    // console.log('data ',data)
    if (data) {
      // console.log("Setting profileDetails from useEffect:", data);
      const matchedData = data.data?.find((item) => item.email === email);
      if (matchedData) {
        console.log("match data", matchedData);
        setProfileDetails(matchedData); // Set only the matched data

        // Prefill the fields with matched data
        setAddress(matchedData.address || "");
        setApartment(matchedData.apartment || "");
        setNewCity(matchedData.newCity || []);
        setVisitingCity(matchedData.visitingCity || []);
        setSessionMinute(matchedData.session || "");
        setAbout(matchedData.about || "");
        setExperience(matchedData.experience || "6 years");
        setSignatureMessage(matchedData.signatureMessage || []);
        setMassageAndRate(matchedData.massageTypesAndRates || []);
        setAvailableIn(matchedData.availableIn || "Mobile & In-Studio");
        setFirstDay(matchedData.availability?.firstDay || null);
        setLastDay(matchedData.availability?.lastDay || null);
        setTimeDate(matchedData.timeDate || null);
      } else {
        console.error(`No data found for email: ${email}`);
        setProfileDetails({ profilePicture: avatar });
      }
    }
  }, [data, email]);

  console.log("Setting profileDetails from useEffect:", profileDetails);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (city.trim() && state && zipCode.trim()) {
      handleAddCity();
    }
    if (visitCity.trim() && visitState && visitZipCode.trim()) {
      handleVisitingAddCity();
    }
    if (massageType.trim() && massageRate.trim()) {
      handleMassageType();
    }

    // Gather all form values into an object
    const formData = {
      address,
      apartment,
      newCity: localNewCity,
      visitingCity: localNewVisitingCity,
      availability: { firstDay, lastDay },
      timeDate,
      session: sessionMinute,
      availableIn,
      massageTypesAndRates: localMassageAndRate,
      about,
      experience,
      signatureMessage,
    };

    // Log the response
    console.log("Form Data Submitted form therapist", formData);
    // console.log("New City (After Update):", newCity);

    try {
      const response = await fetch(
        `http://localhost:8800/api/therapist/update-details/${profileDetails._id}`, // Replace with the correct ID field
        {
          method: "PATCH", // Use PUT or PATCH depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        toast.success("Updated Profile Successfully");
        console.log("Updated Successfully:", updatedData);

        // Optionally update the UI with the new data
        setProfileDetails(updatedData);
        window.location.reload();
      } else {
        console.error("Failed to update profile:", await response.text());
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  // const handleAddCity = () => {
  //   if (city && state && zipCode) {

  //     setNewCity((prevCities) => [
  //       ...prevCities,
  //       {
  //         city,
  //         state,
  //         zipCode,
  //       },
  //     ]);

  //     setCity("");
  //     setState("NY");
  //     setZipCode("");
  //   }
  // };

  let localNewCity = [...newCity];
  let localNewVisitingCity = [...visitingCity];
  let localMassageAndRate = [...massageAndRate];

  const handleAddCity = () => {
    if (city.trim() && state && zipCode.trim()) {
      const newCityData = {
        city: city.trim(),
        state,
        zipCode: zipCode.trim(),
      };

      // Use a local variable to hold the updated array
      localNewCity = [...localNewCity, newCityData];

      // Update the state
      setNewCity(localNewCity);

      // Clear input fields
      setCity("");
      setState("NY");
      setZipCode("");

      // console.log("New City Array (Local):", localNewCity);
    }
  };

  const handleVisitingAddCity = () => {
    if (visitCity.trim() && visitState && visitZipCode.trim()) {
      const newVisitingCityData = {
        city: visitCity.trim(),
        state: visitState,
        zipCode: visitZipCode.trim(),
      };
      localNewVisitingCity = [...localNewVisitingCity, newVisitingCityData];
      setVisitingCity(localNewVisitingCity);

      // Clear input fields
      setVisitCity("");
      setVisitState("NY");
      setVisitZipCode("");
    }
  };

  // console.log("new city", newCity);
  // console.log("visiting City", visitingCity);

  const handleMassageType = () => {
    if (massageType.trim() && massageRate.trim()) {
      // Create the new massage type object
      const newMassageData = {
        massageType: massageType.trim(),
        rate: massageRate.trim(),
      };

      // Update the local copy
      localMassageAndRate = [...localMassageAndRate, newMassageData];

      // Update the state
      setMassageAndRate(localMassageAndRate);

      // Clear input fields
      setMassageType("");
      setMassageRate("");

      console.log(
        "Updated Massage Types and Rates (Local):",
        localMassageAndRate
      );
    }
  };

  const handleRemoveMassage = (index) => {
    setMassageAndRate((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveCity = (index) => {
    setNewCity((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveVisitingCity = (index) => {
    setVisitingCity((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && e.target.value.trim() !== "") {
  //     e.preventDefault();
  //     setSignatureMessage([...signatureMessage, e.target.value.trim()]);
  //     e.target.value = "";
  //   }
  // };

  // const handleClearSignature = (index) => {
  //   setSignatureMessage(signatureMessage.filter((_, i) => i !== index));
  // };

  const handleAvatarChange = async (e) => {
    setImageLoading(true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder_name", "upload_images");

        try {
          const response = await fetch(
            `http://localhost:8800/api/therapist/upload/${userType}/${profileDetails._id}`,
            {
              method: "POST",

              body: formData,
            }
          );

          const data = await response.json();
          // console.log("data before response", data);
          if (response.ok) {
            console.log("Image uploaded successfully:", data);
            toast.success("Image uploaded successfully");

            // const updatedProfilePicture = data.therapist.profilePicture;
            // localStorage.setItem(
            //   "therapistProfilePicture",
            //   updatedProfilePicture
            // );

            // Update state
            // setProfilePicture(updatedProfilePicture);
            refetch();
            window.location.reload()
          } else {
            console.log("Error uploading image:", data);
            toast.error("Error uploading image");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          toast.error("An error occurred");
        } finally {
          setImageLoading(false);
        }
      }

      // const reader = new FileReader();
      // console.log(" reader", reader);
      // reader.onload = (event) => {
      //   setAvatarPreview(event.target.result);
      // };
      // reader.readAsDataURL(file);
      // console.log(' file',file)
    }
  };

  const handleMultipleImage = async (e) => {
    setImageLoading(true);
    const files = e.target.files;
    // const userId = "USER_ID_HERE";
    console.log("files select", files);

    if (files.length > 10) {
      alert("You can upload up to 10 images only.");
      return;
    }

    // const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    // setImagePreviews(previews);

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append(`files`, file);
    });

    try {
      const response = await fetch(
        `http://localhost:8800/api/therapist/upload-multiple/${profileDetails._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Upload Successful:", result);
        toast.success("Images uploaded successfully!");

        if (result?.therapist?.uploadMultiples) {
          setUploadedImages(result.therapist.uploadMultiples); // Update state with image URLs
        }
        refetch();
      } else {
        const error = await response.json();
        console.error("Upload Failed:", error);
        toast.error("Failed to upload images. Please try again.");
      }
    } catch (err) {
      console.error("Error during upload:", err);
      alert("An error occurred while uploading. Please check the console.");
    } finally {
      setImageLoading(false);
    }
  };

  console.log("upload files", uploadedImages);

  // useEffect(() => {

  //   const savedProfilePicture = localStorage.getItem("therapistProfilePicture");
  //   if (savedProfilePicture) {
  //     setProfilePicture(savedProfilePicture);
  //   }
  // }, []);

  // console.log('profile picture up',profilePicture)

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const paymentOptions = [
    "Cash",
    "Insurance",
    "Credit or Debit Card",
    "Zelle",
    "Venmo",
    "Cashapp",
    "Paypal",
    "Check",
  ];

  const togglePayment = (payment) => {
    if (selectedPayments.includes(payment)) {
      // Remove if already selected
      setSelectedPayments(selectedPayments.filter((data) => data !== payment));
    } else {
      // Add the selected method
      setSelectedPayments([...selectedPayments, payment]);
    }
  };
  console.log(selectedPayments);

  return (
    <div>
      {imageLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <p className="text-white text-2xl font-semibold">
            {imageLoading ? "Image Uploading..." : ""}
          </p>
        </div>
      )}
      <div className=" mx-5 my-6 md:mx-8 md:my-10">
        <div className="rounded-lg px-5 lg:px-0 py-6  md:py-12 bg-white">
          {/* profile heading */}
          <div className="md:px-12">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h3 className="text-2xl text-primary font-semibold">
                  Update Details
                </h3>
                <p className="text-secondary text-[15px] mt-4 mb-9">
                  Update Your Necessary Information and Details.
                  {profileDetails.message}
                </p>
              </div>
              {/* feature button */}
              <div className="hidden md:flex">
                {decodedToken?.paymentToken ? (
                  <span className="text-[red] md:w-auto font-medium px-4 md:px-5 py-[14px] rounded-[10px] border border-[red]">
                    Already Featured
                  </span>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="text-accent md:w-auto font-medium px-4 md:px-5 py-[14px] rounded-[10px] border border-accent"
                  >
                    Featured for $299
                  </button>
                )}
              </div>
            </div>
            {/* avatar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start mb-6 relative">
                {/* Avatar Image */}
                <label
                  htmlFor="avatar-upload"
                  className="w-[80px] md:w-[110px] h-[80px] md:h-[110px] rounded-full overflow-hidden border-2 border-[#1BC738] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="spinner">Loading...</div> 
                  ) : (
                    <img
                      src={profileDetails?.profilePicture || avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </label>

                {/* Hidden File Input */}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                {/* Avatar Edit Icon */}
                <label
                  htmlFor="avatar-upload"
                  className="bg-[#1BC738] absolute bottom-0 left-16 md:left-20 w-8 h-8 flex justify-center rounded-full p-[6px] cursor-pointer"
                >
                  <img src={edit} alt="Edit Icon" />
                </label>
              </div>
              {/* feature button */}
              <div className="md:hidden my-4">
                {decodedToken?.paymentToken ? (
                  <span className="text-[red] md:w-auto font-medium px-3 md:px-5 py-2 md:py-[12px] rounded-[10px] border border-[red]">
                    Already Featured
                  </span>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="text-accent md:w-auto font-medium px-5 md:px-5 py-[12px] rounded-[10px] border border-accent"
                  >
                    Featured for $299
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* form */}
          <div className="mt-[20px]">
            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col gap-6"
            >
              {/* address */}
              <div className=" md:px-12  ">
                <label className="text-primary font-medium" htmlFor="Address">
                  Address(Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-4">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                    placeholder="260 Meserole Street, NY"
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none"
                    placeholder="Apartment, building, suite (optional)"
                  />
                </div>
              </div>

              {/* city/state/zipcode */}
              <div className="md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 md:gap-8">
                  <div className="flex flex-col gap-4 col-span-2">
                    <label className="text-primary font-medium" htmlFor="City">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      // onChange={(e) =>
                      //   handleInputChange("city", e.target.value)
                      // }
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none "
                      placeholder="Brooklyn"
                    />
                  </div>

                  <div className="flex flex-col   gap-4 ">
                    <label className="text-primary font-medium" htmlFor="State">
                      State
                    </label>
                    <select
                      name=""
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      // onChange={(e) =>
                      //   handleInputChange("state", e.target.value)
                      // }
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      id=""
                    >
                      <option value="NY">NY</option>
                      <option value="EY">EY</option>
                      <option value="DY">DY</option>
                      <option value="CY">CY</option>
                      <option value="BY">BY</option>
                    </select>
                  </div>

                  <div className=" flex flex-col  gap-4 ">
                    <label
                      className="text-primary font-medium"
                      htmlFor="ZipCode"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      // onChange={(e) =>
                      //   handleInputChange("zipCode", e.target.value)
                      // }
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      placeholder="12345"
                    />
                  </div>
                </div>

                {/*add new city */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleAddCity}
                    className="text-accent w-full max-w-[348px] mx-auto mt-6 md:mt-10 font-semibold px-5 py-[14px] rounded-[10px] border border-accent"
                  >
                    Add New City
                  </button>
                </div>

                {/* Display added cities */}
                <div className="">
                  {/* <h2 className="text-lg font-semibold">Added Cities:</h2> */}
                  <div className="flex flex-col gap-2 mt-4">
                    {newCity.map((item, index) => (
                      <p
                        className="grid grid-cols-2 justify-between p-2 rounded-lg border-b"
                        key={index}
                      >
                        <span className="flex items-center gap-2">
                          <img
                            onClick={() => handleRemoveCity(index)}
                            src={cross}
                            alt="cross"
                            className="cursor-pointer"
                          />
                          {`${item.city}`}
                        </span>
                        <span className=" flex justify-between md:w-2/5 mx-auto gap-20">
                          <span>{`${item.state}`}</span>

                          <span>{`${item.zipCode}`}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className=" font-semibold  hidden md:flex text-accent  justify-center">
                Or
              </div>

              {/*visiting city/state/zipcode */}
              <div className="md:px-12 ">
                {/*add visiting city */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleVisitingAddCity}
                    className="text-white bg-accent w-full max-w-[348px] mb-6 font-semibold px-5 py-[14px] rounded-[10px] border border-accent"
                  >
                    Add A Visiting City
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 md:gap-8">
                  <div className="flex flex-col  gap-4 col-span-2">
                    <label className="text-primary font-medium" htmlFor="City">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={visitCity}
                      onChange={(e) => setVisitCity(e.target.value)}
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      placeholder="Brooklyn"
                    />
                  </div>

                  <div className="flex flex-col  gap-4 ">
                    <label className="text-primary font-medium" htmlFor="State">
                      State
                    </label>
                    <select
                      name=""
                      value={visitState}
                      onChange={(e) => setVisitState(e.target.value)}
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      id=""
                    >
                      <option value="NY">NY</option>
                      <option value="EY">EY</option>
                      <option value="DY">DY</option>
                      <option value="CY">CY</option>
                      <option value="BY">BY</option>
                    </select>
                  </div>

                  <div className="flex flex-col  gap-4 ">
                    <label
                      className="text-primary font-medium"
                      htmlFor="ZipCode"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      value={visitZipCode}
                      onChange={(e) => setVisitZipCode(e.target.value)}
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      placeholder="12345"
                    />
                  </div>
                </div>

                {/* Display added cities */}
                <div className="">
                  {/* <h2 className="text-lg font-semibold">Added Cities:</h2> */}
                  <div className="flex flex-col gap-2 mt-4">
                    {visitingCity.map((item, index) => (
                      <p
                        className="w-full  p-2 rounded-lg flex flex-wrap items-center justify-between border-b"
                        key={index}
                      >
                        <span className="flex items-center gap-2">
                          <img
                            onClick={() => handleRemoveVisitingCity(index)}
                            src={cross}
                            alt="cross"
                            className="cursor-pointer"
                          />
                          {`${item.city}`}
                        </span>
                        <span className="flex justify-end w-auto ml-auto gap-16">
                          <span>{`${item.state}`}</span>
                          <span>{`${item.zipCode}`}</span>
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* availability */}
              <div className="flex w-full md:px-12 gap-4 lg:gap-8 ">
                {/* set availability */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  <h2 className="text-primary font-medium">
                    Set Availability (Optional)
                  </h2>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {/* First Day Picker */}
                    <div className="relative w-full rounded-lg border">
                      <DatePicker
                        selected={firstDay}
                        onChange={(date) => {
                          setFirstDay(date);
                          setFirstDayOpen(false);
                        }}
                        open={firstDayOpen}
                        onClickOutside={() => setFirstDayOpen(false)}
                        placeholderText="First day:"
                        className="w-full px-3 py-4 md:p-4 rounded-lg focus:outline-none "
                      />
                      <div
                        onClick={() => setFirstDayOpen(true)}
                        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 "
                      >
                        <img
                          src={date_icon}
                          alt="date_icon"
                          className="h-4 w-4"
                        />
                      </div>
                    </div>

                    {/* Last Day Picker */}
                    <div className="relative border rounded-lg w-full">
                      <DatePicker
                        selected={lastDay}
                        onChange={(date) => {
                          setLastDay(date);
                          setLastDayOpen(false);
                        }}
                        open={lastDayOpen}
                        onClickOutside={() => setLastDayOpen(false)}
                        placeholderText="Last day:"
                        className="w-full px-3 py-4 md:p-4 rounded-lg  focus:outline-none  "
                      />
                      <div
                        onClick={() => setLastDayOpen(true)}
                        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      >
                        <img
                          src={date_icon}
                          alt="date_icon"
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* available in -> only for desktop */}
                <div className="hidden lg:flex flex-col gap-4 w-full lg:w-1/2">
                  <label
                    className="text-primary font-medium"
                    htmlFor="available"
                  >
                    Available In
                  </label>
                  <select
                    name=""
                    value={availableIn}
                    onChange={(e) => setAvailableIn(e.target.value)}
                    className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                    id=""
                  >
                    <option value="Mobile & In-Studio">
                      Mobile & In-Studio
                    </option>
                    <option value="EY">EY</option>
                    <option value="DY">DY</option>
                    <option value="CY">CY</option>
                    <option value="BY">BY</option>
                  </select>
                </div>
              </div>

              {/* available in */}
              <div className="flex flex-col lg:hidden md:px-12 gap-4 ">
                <label className="text-primary font-medium" htmlFor="available">
                  Available In
                </label>
                <select
                  name=""
                  value={availableIn}
                  onChange={(e) => setAvailableIn(e.target.value)}
                  className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                  id=""
                >
                  <option value="Mobile & In-Studio">Mobile & In-Studio</option>
                  <option value="EY">EY</option>
                  <option value="DY">DY</option>
                  <option value="CY">CY</option>
                  <option value="BY">BY</option>
                </select>
              </div>

              {/* time & date */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:px-12 gap-5 md:gap-8">
                {/* time&date and session -> session only for md and larger devices  */}
                {/* time and date */}
                <div className="flex flex-col gap-4">
                  <label
                    className="text-primary font-medium"
                    htmlFor="timeDate"
                  >
                    Time & Date(Optional)
                  </label>
                  <div className="relative  rounded-lg w-full">
                    <DatePicker
                      selected={timeDate}
                      onChange={(date) => {
                        setTimeDate(date);
                        setTimeDateOpen(false);
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy - h:mm aa"
                      open={timeDateOpen}
                      onClickOutside={() => setTimeDateOpen(false)}
                      placeholderText="Select time & date"
                      className="!w-full p-4 border  rounded-lg focus:outline-none "
                      wrapperClassName="w-full"
                      popperClassName="w-[90vw]  ml-1 md:ml-4  max-w-[400px]  sm:max-w-[90%] rounded-lg"
                    />
                    <div
                      onClick={() => setTimeDateOpen(true)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 "
                    >
                      <img src={date_icon} alt="date_icon" />
                    </div>
                  </div>
                </div>

                {/* session minute */}
                <div className="flex flex-col  gap-4 relative ">
                  <label className="text-primary font-medium" htmlFor="session">
                    Session Minutes
                  </label>
                  <input
                    type="text"
                    name="session"
                    value={sessionMinute}
                    onChange={(e) => setSessionMinute(e.target.value)}
                    className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                    placeholder="60 minutes"
                  />
                  <button
                    type="button"
                    className="absolute top-14 right-3 w-[22px] h-[22px]"
                  >
                    <img src={clock} alt="location" />
                  </button>
                </div>
              </div>

              {/* session minute */}
              {/* <div className="flex flex-col md:px-12  gap-4 relative md:hidden">
                <label className="text-primary font-medium" htmlFor="session">
                  Session Minutes
                </label>
                <input
                  type="text"
                  name="session"
                  value={sessionMinute}
                  onChange={(e) => setSessionMinute(e.target.value)}
                  className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                  placeholder="60 minutes"
                />
                <button
                  type="button"
                  className="absolute top-14 right-3 md:right-14 w-[22px] h-[22px]"
                >
                  <img src={clock} alt="location" />
                </button>
              </div> */}

              {/* message type */}
              <div className="md:px-12 lg:pr-[1%] w-full lg:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
                  {/* Massages Type */}
                  {/* Massages Type */}
                  <div className="flex flex-col col-span-2 gap-4 relative">
                    <label
                      className="text-primary font-medium"
                      htmlFor="MassagesType"
                    >
                      Massages Type
                    </label>
                    <input
                      type="text"
                      name="massageType"
                      value={massageType}
                      onChange={(e) => setMassageType(e.target.value)}
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-secondary outline-none"
                      placeholder="Blending Deep Tissue"
                    />
                  </div>

                  {/* rate */}
                  <div className="flex flex-col w-full gap-4 relative">
                    <label className="text-primary font-medium" htmlFor="rate">
                      Rate
                    </label>
                    <input
                      type="number"
                      name="rate"
                      value={massageRate}
                      onChange={(e) => setMassageRate(e.target.value)}
                      className="border border-[#E7E7E7] w-full p-4 rounded-[10px] text-secondary outline-none"
                      placeholder="$160"
                    />
                  </div>
                </div>

                {/* show massage */}
                <div className="mt-4">
                  {massageAndRate.length !== 0 &&
                    massageAndRate?.map((msg, i) => (
                      <div
                        className="flex items-center justify-between  py-2 "
                        key={i}
                      >
                        {/* Message Section */}
                        <div className="flex items-center gap-[10px]">
                          <img
                            onClick={() => handleRemoveMassage(i)}
                            src={cross}
                            alt="cross"
                            className="cursor-pointer"
                          />
                          <span className="text-secondary font-medium">
                            {msg?.massageType}
                          </span>
                        </div>

                        {/* Rate Section */}
                        <p className="text-primary font-medium">${msg?.rate}</p>
                      </div>
                    ))}
                </div>

                {/* add more button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleMassageType}
                    className="text-accent w-full max-w-[348px] mt-5 font-semibold px-5 py-[14px] rounded-[10px] border border-accent"
                  >
                    Add More
                  </button>
                </div>
              </div>

              <hr className="my-3" />

              {/* About  */}
              <div className="flex flex-col md:px-12  gap-4 ">
                <label className="text-primary font-medium" htmlFor="About">
                  About Me
                </label>
                {/* textarea and experience -> experience only for lg and higher */}
                <div className="lg:flex gap-4 items-start">
                  <textarea
                    type="text"
                    name="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={3}
                    className="border w-full lg:w-1/2 border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                    placeholder="write details on yourself..."
                  />
                  {/* experience */}
                  <div className="hidden lg:flex flex-col gap-4 w-1/2">
                    <label
                      className="text-primary font-medium"
                      htmlFor="available"
                    >
                      Experiences
                    </label>
                    <select
                      name=""
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                      id=""
                    >
                      <option value="6">6 years</option>
                      <option value="4">4 years</option>
                      <option value="2">2 years</option>
                      <option value="7">7 years</option>
                      <option value="8">8 years</option>
                      <option value="9">9 years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* experience */}
              <div className="flex flex-col md:px-12  gap-4 lg:hidden">
                <label className="text-primary font-medium" htmlFor="available">
                  Experiences
                </label>
                <select
                  name=""
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="border border-[#E7E7E7] p-4 rounded-[10px] text-primary outline-none  "
                  id=""
                >
                  <option value="6">6 years</option>
                  <option value="4">4 years</option>
                  <option value="2">2 years</option>
                  <option value="7">7 years</option>
                  <option value="8">8 years</option>
                  <option value="9">9 years</option>
                </select>
              </div>

              {/* acceptable payments */}
              <div className="flex flex-col md:px-12  gap-4 ">
                <label className="text-primary font-medium">
                  Acceptable Payments
                </label>
                <div className="flex flex-wrap gap-3 md:gap-x-5 md:gap-y-4 mb-6">
                  {paymentOptions?.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => togglePayment(option)}
                      className={`px-10 py-3 border border-accent rounded-[10px] font-medium ${
                        selectedPayments?.includes(option)
                          ? "bg-accent text-white"
                          : "bg-white"
                      } hover:bg-accent transition-all cursor-pointer`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              {/* signature message  */}
              {/* <div className="flex flex-col md:px-12  gap-4">
                <label
                  className="text-primary font-medium"
                  htmlFor="signatureMessage"
                >
                  Signature Message
                </label>
                <div className="border rounded-lg p-3 flex flex-wrap gap-2 items-center">
                  {signatureMessage.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center  bg-[#EEF2F5] text-gray-700 px-3 py-1 rounded-md shadow-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleClearSignature(index)}
                        className="ml-2 text-red-500 font-bold"
                      >
                        <img src={cross_input} alt="cross_input" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Enter signature and Press Enter to add..."
                    onKeyDown={handleKeyPress}
                    className="flex-grow focus:outline-none"
                  />
                </div>
              </div> */}

              {/* upload multiple images */}
              <div className="flex flex-col md:px-12 gap-4">
                <label className="text-primary font-medium mb-5">
                  Upload Pictures (Up to 10 pictures)
                </label>
                <div>
                  <label
                    htmlFor="image-upload"
                    className="bg-[#1BC738] rounded-[10px] text-white py-4 px-16 font-semibold cursor-pointer"
                  >
                    Upload Images
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImage}
                  />
                  {/* Uploaded image previews */}
                  <div className="flex gap-4 mt-10 flex-wrap overflow-x-auto">
                    {profileDetails?.uploadMultiples?.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 mx-auto flex justify-center">
                <button
                  type="submit"
                  className="bg-[#1BC738] rounded-[10px] text-white py-4 px-16 font-semibold"
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
