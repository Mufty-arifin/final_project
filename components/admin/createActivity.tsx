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
    maxHeight: "80%", // Set maximum height to 80% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content overflows
  },
};

const AddActivityModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const localStorageToken = localStorage.getItem("token");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            ...formData,
            imageUrl: uploadedImageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add banner: " + response.statusText);
      }

      console.log("Banner added successfully!");
      Swal.fire("Success", "Banner added successfully!", "success");
      setFormData({
        categoryId: "",
        title: "",
        price: 0,
        price_discount: 0,
        rating: 0,
        total_reviews: 0,
        facilities: "",
        address: "",
        province: "",
        city: "",
        location_maps: "",
      });
      setImageFile(null);
      onRequestClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to add activity: " + error);
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
          <label htmlFor="categoryId" className="block text-gray-700">
            Category Id
          </label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Tite
          </label>
          <input
            type="text"
            id="tite"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pricediscount" className="block text-gray-700">
            Price Discount
          </label>
          <input
            type="number"
            id="pricediscount"
            name="pricediscount"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalreviews" className="block text-gray-700">
            Total Reviews
          </label>
          <input
            type="number"
            id="totalreviews"
            name="totalreviews"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="facilities" className="block text-gray-700">
            Facilities
          </label>
          <input
            type="text"
            id="facilities"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block text-gray-700">
            Province
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
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

export default AddActivityModal;
