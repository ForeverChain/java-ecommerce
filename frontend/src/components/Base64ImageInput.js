import React, { useState } from "react";

const Base64ImageInput = ({ source, label, accept, validate, onChange }) => {
  const [image, setImage] = useState(null); // This will store the base64 string, not the file.

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertFileToBase64(file); // Convert the file to base64
      setImage(base64); // Store the base64 image string
      if (onChange) {
        onChange(base64); // Pass the base64 string to the parent component
      }
    }
  };

  // Function to convert the file to base64 string
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // This is the base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // This converts the file to base64
    });
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        required={validate?.includes("required")}
      />
      {image && <img src={image} alt="preview" style={{ maxWidth: "200px" }} />}
      {/* This shows the preview, optional */}
    </div>
  );
};

export default Base64ImageInput;
