'use client';
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  bannerIdToUpdate: string | null;
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

const UpdateBanner: React.FC<Props> = ({ isOpen, onRequestClose, bannerIdToUpdate }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState<{ title: string; imageUrl: string } | null>(null);

  useEffect(() => {
    if (bannerIdToUpdate) {
      // Fetch banner data based on bannerIdToUpdate
      // You need to implement this part to fetch banner data from your API
      // Once you have the banner data, set it into the state
      // Example:
      // setBannerData({ title: "Banner Title", imageUrl: "Banner Image URL" });
    }
  }, [bannerIdToUpdate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Make an API call to update the banner
      // You need to implement this part to update the banner data using your API
      // Example:
      // await fetch(`your_api_endpoint/${bannerIdToUpdate}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ title, imageUrl }),
      // });
      // Show success message after successful update
      console.log("Banner updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      // Handle error scenario
    } finally {
      setIsLoading(false);
      onRequestClose(); // Close the modal
    }
  };

  useEffect(() => {
    // If banner data is available, set the title and imageUrl
    if (bannerData) {
      setTitle(bannerData.title);
      setImageUrl(bannerData.imageUrl);
    }
  }, [bannerData]);

  const isFormValid = title.trim() !== "" && imageUrl.trim() !== "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Update Banner Modal"
    >
      <h2 className="text-2xl mb-4">Update Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
          {isLoading ? "Loading..." : "Update Banner"}
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

export default UpdateBanner;
