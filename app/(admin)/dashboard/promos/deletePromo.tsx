
"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";


const DeletePromo = ({ promo }: { promo: any}) => {
  const [promos, setPromos] = useState([]);
  const handleDelete = async (promoId: string) => {
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
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${promoId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                "Content-Type": "application/json",
              },
            }
          );

          // Update the state to reflect the deletion
          setPromos(
            promos.filter((promo: any) => promo.id !== promoId)
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
  return (
    <>
      <button
        onClick={() => handleDelete(promo.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </>
  );
};

export default DeletePromo;
