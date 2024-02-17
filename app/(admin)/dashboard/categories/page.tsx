"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/admin/Navbar";
import Swal from "sweetalert2";
import AddCategory from "./addCategory";
import DeleteCategory from "./deleteCategory";
import UpdateCategory from "./updateCategory";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(8);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories?page=${currentPage}&limit=${categoriesPerPage}`,
          {
            headers: {
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
  }, [currentPage, categoriesPerPage]);

  // Logic for displaying current categories
  const indexOfLastCategorie = currentPage * categoriesPerPage;
  const indexOfFirstCategorie = indexOfLastCategorie - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategorie,
    indexOfLastCategorie
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="px-[40px] py-[50px] w-full mt-5">
        <div className="flex justify-between items-center mb-4 ">
          <h1 className="font-bold text-xl">List Categories</h1>
          <AddCategory />
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
              {currentCategories.map((category: Category, index) => (
                <tr key={category.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {index + 1}
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
                    <UpdateCategory categoryId={category.id} />
                    <DeleteCategory category={category} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
