"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/admin/Navbar";
import Swal from "sweetalert2";
import CreateCategory from "@/components/admin/createCategory";

interface Categorie {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(8);
  const [modalIsOpen, setIsOpen] = useState(false);
  const localStorageToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories?page=${currentPage}&limit=${categoriesPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorageToken}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [currentPage, categoriesPerPage, localStorageToken]);

  // Logic for displaying current categories
  const indexOfLastCategorie = currentPage * categoriesPerPage;
  const indexOfFirstCategorie = indexOfLastCategorie - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategorie,
    indexOfLastCategorie
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Delete banner
  const deleteCategory = async (categoryId: string) => {
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
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories/${categoryId}`,
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
          setCategories(
            categories.filter(
              (category: Categorie) => category.id !== categoryId
            )
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
  const AddCategory = () => {
    setIsOpen(true); // Open the modal
  };
  return (
    <>
      <Navbar />
      <div className="px-[40px] py-[50px] w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">List Categories</h1>
          <button
            onClick={AddCategory}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">Name</th>
                <th className="border border-gray-300 px-2 py-1">Image</th>
                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category: Categorie, index) => (
                <tr key={category.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {category.id}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <img
                      className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full"
                      src={category.imageUrl}
                      alt={category.name}
                    />
                  </td>
                  <td className=" border-gray-300 px-4 py-2 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
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
      <CreateCategory
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Page;
