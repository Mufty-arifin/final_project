"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ListSidebarItem } from "@/constant";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logout from "../Logout";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const Token = localStorage.getItem("token");
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const pathname = usePathname();
  const { data: session } = useSession();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, cancel",
    });

    // If the user confirms, sign them out
    if (result.isConfirmed) {
      await signOut({ redirect: false, callbackUrl: "/login" });
    }
  };
  return (
    <nav className=" max-counter px-12 z-30 py-2 shadow-xl bg-white rounded-full ring-slate-100 fixed w-[95%] left-[50%] top-1 translate-x-[-50%]">
      {/* Mobile */}
      {!menuOpened ? (
        <Image
          src={"/menu-bar.png"}
          alt="menu"
          width={28}
          height={28}
          className=" inline-block cursor-pointer"
          onClick={toggleMenu}
        />
      ) : (
        <Image
          src={"/close.png"}
          alt="menu"
          width={28}
          height={28}
          className=" inline-block cursor-pointer"
          onClick={toggleMenu}
        />
      )}
      <ul
        className={
          menuOpened
            ? "flex flex-col justify-center p-12 fixed top-14 left-0 bg-slate-100 rounded-lg transition-all duration-500 shadow-md "
            : "flex flex-col justify-center p-12 fixed top-14 left-[-100%] bg-slate-100 rounded-lg transition-all duration-500 shadow-md "
        }
      >
        {ListSidebarItem.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className="flex gap-1 m-6 justify-center relative text-gray-50 group"
          >
            <div
              className={`flex gap-2 text-gray-50 ${
                pathname === item.url ? "font-bold" : ""
              }`}
            >
              {item.title}
            </div>
            <span
              className={` absolute h-[2px] w-0 bg-black -bottom-2 transition-all duration-500 group-hover:w-full ${
                pathname === item.url ? "w-full" : ""
              }`}
            ></span>
          </Link>
        ))}
        {/* membuat dropdown di bawah */}
        {session ? ( // Jika token ada, tampilkan tombol logout
          <button
            onClick={handleLogout}
            className="flexCenter gap-2 border rounded-full btn_dark_rounded"
          >
            <label className="whitespace-nowrap cursor-pointer bold-16">
              Logout
            </label>
          </button>
        ) : (
          // Jika tidak, tampilkan tombol login
          <Link href="/login">
            <button className="flexCenter gap-2 border rounded-full btn_dark_rounded">
              <label className="whitespace-nowrap cursor-pointer bold-16">
                Login
              </label>
            </button>
          </Link>
        )}
      </ul>
    </nav>
  );
}
