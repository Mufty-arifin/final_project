// Page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "@/components/admin/Navbar";

import CreateBanner from "@/components/admin/createBanner";
import UpdateBanner from "@/components/admin/updateBanner";

interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannersPerPage] = useState(8); // Number of banners to display per page
  const [modalIsOpen, setIsOpen] = useState(false); // State for managing modal open/close
  const localStorageToken = localStorage.getItem("token");
  const [bannerToUpdateId, setBannerToUpdateId] = useState<string | null>(null);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners?page=${currentPage}&limit=${bannersPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorageToken}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, [currentPage, bannersPerPage, localStorageToken]);

  // Function to delete a banner
  const deleteBanner = async (bannerId: string) => {
    // Show confirmation dialog before deleting the banner
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a request to the server to delete the banner with the specified bannerId
          await fetch(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${bannerId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorageToken}`,
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                "Content-Type": "application/json",
              },
            }
          );

          // Update the state to reflect the deletion
          setBanners(
            banners.filter((banner: Banner) => banner.id !== bannerId)
          );

          // Show success message after successful deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your banner has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting banner:", error);
          // Handle any errors that may occur during the deletion process
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the banner.",
            icon: "error",
          });
        }
      }
    });
  };

  // Logic for displaying current banners
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(banners.length / bannersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle adding a new banner
  const addBanner = () => {
    setIsOpen(true); // Open the modal
  };
  const updateBanner = (bannerId: string) => {
    // Set the banner ID to be updated in state
    setBannerToUpdateId(bannerId);
    // Open the modal for updating the banner
    setIsOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="px-[40px] py-[50px] w-full ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">List Banners</h1>
          <button
            onClick={addBanner}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Banner
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">Name</th>
                <th className="border border-gray-300 px-2 py-1">Image</th>
                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBanners.map((banner: Banner, index) => (
                <tr key={banner.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {banner.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <img
                      className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full"
                      src={banner.imageUrl}
                      alt={banner.name}
                    />
                  </td>
                  <td className=" border-gray-300 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => updateBanner(banner.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Use the modal component */}
      <CreateBanner
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      />
  {/* <UpdateBanner isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} bannerIdToUpdate={bannerToUpdateId} /> */}
    </>
  );
};

export default Page;
