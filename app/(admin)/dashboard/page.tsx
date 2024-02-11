import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center pt-[100px] h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
          <p className="text-lg">This is where you can display various information and features.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
