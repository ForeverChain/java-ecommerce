import React from "react";
import {
  Create,
  ImageInput,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  useNotify,
} from "react-admin";
import axios from "axios";

const CreateProduct = () => {
  const notify = useNotify();

  // Function to upload image via the `uploads` API
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      debugger;

      const response = await axios.post(
        "http://localhost:8080/api/uploads/images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response?.data; // Assuming the API returns the file path
    } catch (error) {
      console.error("Image upload failed:", error);
      notify("Image upload failed. Please try again.", { type: "error" });
      throw error;
    }
  };

  // Transform the form data before submission
  const transformData = async (data) => {
    if (data.image && data.image.rawFile) {
      try {
        const imagePath = await uploadImage(data.image.rawFile);
        data.image = `http://localhost:8080${imagePath}`; // Set the public URL
      } catch {
        throw new Error("Image upload failed.");
      }
    }
    return data;
  };

  return (
    <Create transform={transformData}>
      <SimpleForm>
        {/* Match the keys from the Shopping entity */}
        <TextInput
          source="product"
          label="Product Name"
          validate={[required()]}
        />
        <NumberInput source="cost" label="Cost" validate={[required()]} />
        <TextInput source="category" label="Category" validate={[required()]} />
        <ImageInput
          source="image"
          label="Product Image"
          accept="image/*"
          validate={[required()]}
        />
        <TextInput source="description" label="Description" />
      </SimpleForm>
    </Create>
  );
};

export default CreateProduct;
