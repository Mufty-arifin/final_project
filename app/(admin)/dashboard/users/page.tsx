"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/admin/Navbar";
import Swal from "sweetalert2";

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
  const localStotrageToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user?page=${currentPage}&limit=${usersPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStotrageToken}`,
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
  }, [currentPage, usersPerPage, localStotrageToken]);

  const deleteUser = async (userId: string) => {
    // Show confirmation dialog before deleting the user
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
          // Send a request to the server to delete the user with the specified userId
          await fetch(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-user/${userId}`,
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
          setUsers(users.filter((user) => user.id !== userId));
          // Update local storage after deletion
          localStorage.setItem(
            "users",
            JSON.stringify(users.filter((user) => user.id !== userId))
          );

          // Show success message after successful deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          // Handle any errors that may occur during the deletion process
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };

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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
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
