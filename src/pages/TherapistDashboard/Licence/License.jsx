import UploadField from "../../../components/shared/UploadField/UploadField";
import licenseIcon from "../../../assets/images/license.svg";
import certificateIcon from "../../../assets/images/certificate.svg";
import insuranceIcon from "../../../assets/images/insurance.svg";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt";
import Cookies from "js-cookie";

const License = () => {
  const [fileData, setFileData] = useState({
    licenseFiles: null,
    certificateFiles: null,
    insuranceFiles: null,
    idFiles: null,
    holdingFiles: null,
  });
  const [type, setType] = useState(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const navigate = useNavigate();

  const userType = "therapist-certificate";
  const userId = decodedToken?.id || "";
  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  console.log("decode user", decodedToken);
  console.log("decode user", userId);

  useEffect(() => {
    const uploadImage = async () => {
      if (type && fileData[`${type}Files`]) {
        setDocumentLoading(true);
        const formData = new FormData();
        formData.append("image", fileData[`${type}Files`][0]);
        formData.append("folder_name", "upload_images");
        formData.append("type", type);

        try {
          const response = await fetch(
            `http://localhost:8800/api/therapist/upload/${userType}/${userId}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          console.log("data from license", data);
          if (response.ok) {
            console.log(`${type} uploaded successfully:`, data);
            toast.success(`${type} uploaded successfully`);
          } else {
            console.log(`Error uploading ${type}:`, data);
            toast.error(`Error uploading ${type}`);
          }
        } catch (error) {
          console.error(`An error occurred while uploading ${type}:`, error);
          toast.error(`An error occurred while uploading ${type}`);
        } finally {
          setDocumentLoading(false);
        }
      }
    };

    uploadImage();
  }, [fileData, type]);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      const decoded = decodeToken(cookieToken);
      setDecodedToken(decoded);
    }
  }, []);

  useEffect(() => {
    const allFieldsFilled = Object.values(fileData).every(
      (value) => value !== null
    );

    // console.log('all field',allFieldsFilled)
    setIsFormValid(allFieldsFilled);
  }, [fileData]);

  const handleFileChangeWithType = (files, fileType) => {
    setFileData((prev) => ({
      ...prev,
      [`${fileType}Files`]: files,
    }));
    setType(fileType);
  };

  // console.log('fileData',fileData)

  // const isFormValid = Object.values(fileData).every((value) => value !== null);

  const handleContinue = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/therapist/professional-details");
    }
  };

  return (
    <div className="rounded-lg px-5 py-6 md:p-8 lg:p-10 2xl:p-14 bg-white">
      {documentLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <p className="text-white text-2xl font-semibold">
            {documentLoading ? "Document Uploading..." : ""}
          </p>
        </div>
      )}
      {/* Profile Heading */}
      <div>
        <h3 className="text-2xl text-primary font-semibold">
          License & Certificate
        </h3>
        <p className="text-secondary text-[15px] mt-4 mb-8">
          Please upload your valid professional license and certification
          documents.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UploadField
            label="Upload License"
            icon={licenseIcon}
            handleFileChange={(files) =>
              handleFileChangeWithType(files, "license")
            }
            stateValue={fileData.licenseFiles}
            inputId="license"
          />

          <UploadField
            label="Upload Certificate"
            icon={certificateIcon}
            handleFileChange={(files) =>
              handleFileChangeWithType(files, "certificate")
            }
            stateValue={fileData.certificateFiles}
            inputId="certificate"
          />

          <UploadField
            label="Upload Insurance"
            icon={insuranceIcon}
            handleFileChange={(files) =>
              handleFileChangeWithType(files, "insurance")
            }
            stateValue={fileData.insuranceFiles}
            inputId="insurance"
          />

          <UploadField
            label="Add Your ID"
            icon={insuranceIcon}
            handleFileChange={(files) => handleFileChangeWithType(files, "id")}
            stateValue={fileData.idFiles}
            inputId="id"
          />

          <UploadField
            label="Add Your ID Holding it Closer to Your Face"
            icon={insuranceIcon}
            handleFileChange={(files) =>
              handleFileChangeWithType(files, "holding")
            }
            stateValue={fileData.holdingFiles}
            inputId="holding"
          />
        </div>

        {/* Submit Button */}
        <div className=" flex justify-center mt-9 lg:mt-14 mb-1 ">
          <button
            type="submit"
            // className="bg-accent rounded-lg w-full text-white py-3 px-8 font-semibold"
            className={`rounded-lg text-white py-3 px-8 font-semibold text-center w-[271px] ${
              isFormValid ? "bg-accent" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default License;
