'use client';
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

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

function UpdateCategory({ categoryId }: { categoryId: string }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [banner, setBanner] = useState<any>(null);

  // Fetch banner data from API and set initial values
 
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Your validation logic here

      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("name", name);

      // Your update banner endpoint and method (PUT/PATCH) here
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${categoryId}`,
        {
          method: "PUT", // or "PATCH" depending on your API
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            // Add other necessary headers
          },
          body: formData, // Adjust body as needed, including name, imageUrl, etc.
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to update banner: " + errorData.message);
      }

      console.log("Banner updated successfully!");
      Swal.fire("Success", "Banner updated successfully!", "success");
      setName("");
      setImageFile(null);

      closeModal();
    } catch (error) {
      Swal.fire("Failed to update banner" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <h2 className="text-2xl mb-4">Update</h2>
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
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <div className="mt-4 w-full">
              {/* Preview image */}
              <Image src={imageUrl} alt="Preview" width={300} height={200} />
            </div>
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Banner"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateCategory;
