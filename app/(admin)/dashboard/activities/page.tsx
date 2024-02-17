"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/admin/Navbar";
import CreateActivity from "@/components/admin/createActivity";
import Swal from "sweetalert2";
import DeleteActivity from "./deleteActivity";

const page = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(8);
  const [modalIsOpen, setIsOpen] = useState(false);
  const localStorageToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities?page=${currentPage}&limit=${activitiesPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorageToken}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchActivities();
  }, [currentPage, activitiesPerPage, localStorageToken]);

  const deleteActivity = async (activityId: string) => {
    // Show confirmation dialog before deleting the category
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
          // Send a request to the server to delete the category with the specified categoryId
          await fetch(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity/${activityId}`,
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
          setActivities(
            activities.filter((activity: any) => activity.id !== activityId)
          );

          // Show success message after successful deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting category:", error);
          // Handle any errors that may occur during the deletion process
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the category.",
            icon: "error",
          });
        }
      }
    });
  };

  // Logic for displaying current users
  const indexOfLastActivitie = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivitie - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivitie
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(activities.length / activitiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const addActivity = () => {
    setIsOpen(true); // Open the modal
  };
  return (
    <>
      <Navbar />
      <div className="px-[40px] py-[50px] w-full ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">List Activities</h1>
          <button
            onClick={addActivity}
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
                <th className="border border-gray-300 px-2 py-1">
                  Description
                </th>
                <th className="border border-gray-300 px-2 py-1">Image</th>
                <th className="border border-gray-300 px-2 py-1">Price</th>
                <th className="border border-gray-300 px-2 py-1">Discount</th>
                <th className="border border-gray-300 px-2 py-1">rating</th>

                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity: any, index) => (
                <tr key={activity.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {activity.title}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {activity.description}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <img
                      className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full"
                      src={activity.imageUrls[0]}
                      alt={activity.title}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {activity.price}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {activity.price_discount}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {activity.rating}
                  </td>
                  <td className=" border-gray-300 px-4 py-2 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                   <DeleteActivity activity={activity.id}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateActivity
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default page;
