'use client';
import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Tampilkan dialog konfirmasi menggunakan SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      try {
        // Lakukan request ke endpoint logout
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
          {
            // Tambahkan header jika diperlukan (misalnya, token autentikasi)
            headers: {
              "Content-Type": "application/json",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              // Misalkan Anda memiliki token autentikasi dalam local storage
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          // Logout berhasil, lakukan penanganan sesuai kebutuhan
          console.log("Logout successful");
          // Lakukan navigasi ke halaman login atau lakukan sesuatu yang sesuai dengan aplikasi Anda
          localStorage.removeItem("token");
          router.push("/login");
          // Tampilkan notifikasi sukses dengan SweetAlert2
          Swal.fire({
            icon: "success",
            title: "Logout Successful",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          // Penanganan jika logout gagal
          console.error("Logout failed");
        }
      } catch (error) {
        // Penanganan error jika ada kesalahan dalam melakukan logout
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <div
      className="flexCenter gap-2 border rounded-full btn_dark_rounded"
      onClick={handleLogout}
    >
      <label className="whitespace-nowrap cursor-pointer bold-16">
        Logout
      </label>
    </div>
  );
};

export default Logout;
