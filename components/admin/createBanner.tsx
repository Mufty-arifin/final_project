import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddBannerModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const localStorageToken = localStorage.getItem("token");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!imageFile) {
        throw new Error("Please select an image.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);

      const imageResponse = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: formData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const imageData = await imageResponse.json();
      const uploadedImageUrl = imageData.url;

      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({
            name,
            imageUrl: uploadedImageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add banner: " + response.statusText);
      }

      console.log("Banner added successfully!");
      Swal.fire("Success", "Banner added successfully!", "success");
      setName("");
      setImageFile(null);
      onRequestClose();
    } catch (error) {
      Swal.fire("Failed to add banner: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Add Banner Modal"
    >
      <h2 className="text-2xl mb-4">Add New Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={name}
            onChange={handleNameChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-gray-700">
            Image:
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Banner"}
        </button>
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
