'use client';
import Navbar from "@/components/admin/Navbar";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";

interface Promo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  createdAt: Date;
  updatedAt: Date;
}

const Page = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promosPerPage] = useState(8); // Number of users to display per page
  const localStotrageToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos?page=${currentPage}&limit=${promosPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStotrageToken}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        setPromos(data);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };

    fetchPromos();
  }, [currentPage, promosPerPage, localStotrageToken]);
  
  const deletePromo = async (promoId: string) => {
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
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${promoId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStotrageToken}`,
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                "Content-Type": "application/json",
              },
            }
          );

          // Update the state to reflect the deletion
          setPromos(
            promos.filter((banner: Promo) => banner.id !== promoId)
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

  // Logic for displaying current promos
  const indexOfLastPromo = currentPage * promosPerPage;
  const indexOfFirstPromo = indexOfLastPromo - promosPerPage;
  const currentPromos = promos.slice(indexOfFirstPromo, indexOfLastPromo);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(promos.length / promosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div >
      <Navbar />
      <div className="px-[40px] py-[50px] w-full ">
      <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">List Promos</h1>
          <button
          
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Promo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className='w-full border-collapse border border-gray-300 text-center'>
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">Title</th>
                <th className="border border-gray-300 px-2 py-1">Image</th>
                <th className="border border-gray-300 px-2 py-1">
                  Terms Condition
                </th>
                <th className="border border-gray-300 px-2 py-1">Code</th>
                <th className="border border-gray-300 px-2 py-1">Discount</th>
                <th className="border border-gray-300 px-2 py-1">Minimum</th>
                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPromos.map((promo: Promo, index) => (
                <tr key={promo.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {promo.title}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={promo.imageUrl}
                      alt={promo.title}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {promo.terms_condition}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {promo.promo_code}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {promo.promo_discount_price}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {promo.terms_condition}
                  </td>
                  <td className=" border-gray-300 px-4 py-2 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                    <button  onClick={() => deletePromo(promo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
