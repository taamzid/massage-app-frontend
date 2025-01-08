/* eslint-disable react/prop-types */
// import licenseIcon from "../../../assets/images/license.svg";
// import certificateIcon from "../../../assets/images/certificate.svg";
// import insuranceIcon from "../../../assets/images/insurance.svg";

import { useRef } from "react";

const UploadField = ({
  label,
  icon,
  // stateSetter,
  stateValue,
  inputId,
  // setType,
  handleFileChange
}) => {

  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files); // Call the handler with dropped files
    }
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     console.log("From upload", inputId);
  //     stateSetter(e.target.files); 
  //     setType(inputId); 
  //   }
  // };

  const handleInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileChange(e.target.files); // Call the handler with selected files
    }

  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col gap-4 relative"
    >
      <label className="text-primary font-medium" htmlFor={inputId}>
        {label}
      </label>
      <div className="border-2 border-dashed border-accent rounded-[10px] p-6 text-center relative">
        <img
          src={icon}
          alt={`Upload ${label}`}
          className="md:w-12 md:h-12 mx-auto mb-4"
        />
        <label
          htmlFor={inputId}
          className="text-primary font-medium cursor-pointer"
        >
          Drag & drop or click to{" "}
          <span
            onClick={() => inputRef.current.click()}
            className="text-accent underline"
          >
            choose from files
          </span>
        </label>
        <input
          type="file"
          id={inputId}
          ref={inputRef}
          multiple


          onChange={handleInputChange}

          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {stateValue && (
          <div className="mt-2 text-secondary w-full overflow-hidden">
            <p className="break-words">

              {Array.from(stateValue)
                .map((file) => file.name)
                .join(", ")}

            </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default UploadField;

