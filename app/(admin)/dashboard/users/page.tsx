"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/admin/Navbar";
import UpdateRole from "./updateRole";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users to display per page
  const [searchKeyword, setSearchKeyword] = useState("");
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user?page=${currentPage}&limit=${usersPerPage}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, usersPerPage, searchKeyword]);
  // Logic for displaying current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = searchKeyword
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : users;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
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
    <>
      <Navbar />
      <div className="px-10 py-10 text-center justify-center align-middle w-full overflow-x-auto">
        <h1 className="font-bold text-xl mb-4">List User</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            {/* Table headers */}
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">Name</th>
                <th className="border border-gray-300 px-2 py-1">Email</th>
                <th className="border border-gray-300 px-2 py-1">Role</th>
                <th className="border border-gray-300 px-2 py-1">
                  Profile Picture
                </th>
                <th className="border border-gray-300 px-2 py-1">Phone</th>
                <th className="border border-gray-300 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              {currentUsers.map((user) => (
                <tr key={user.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {user.role}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <img
                      className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full"
                      src={user.profilePictureUrl}
                      alt={user.name}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                  <UpdateRole user={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
              }
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
