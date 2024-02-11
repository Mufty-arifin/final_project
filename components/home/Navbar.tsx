"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Nav_LINKS } from "../../constant";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logout from "../Logout";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const Token = localStorage.getItem("token");
  const pathname = usePathname();
  return (
    <nav className="flexBetween max-counter px-12 z-30 py-2 shadow-xl bg-white rounded-full ring-slate-100 fixed w-[95%] left-[50%] top-1 translate-x-[-50%]">
      <Link href="/" className="bold-20">
        <span>TRAVELLIAN</span>
      </Link>
      {/* Dekstop */}
      <ul className="hidden lg:flex h-full">
        {Nav_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="flex gap-2 mx-8 relative text-gray-50 group"
          >
            <div
              className={`flex gap-2 text-gray-50 ${
                pathname === link.href ? "font-bold" : ""
              }`}
            >
              {link.label}
            </div>
            <span
              className={`inline-block absolute h-[2px] w-0 bg-black -bottom-2 transition-all duration-500 group-hover:w-full ${
                pathname === link.href ? "w-full" : ""
              }`}
            ></span>
          </Link>
        ))}
      </ul>
      <div className="hidden lg:block">
        {Token ? ( // Jika token ada, tampilkan tombol logout
          <Logout />
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
      </div>
      {/* Mobile */}
      {!menuOpened ? (
        <Image
          src={"/menu-bar.png"}
          alt="menu"
          width={28}
          height={28}
          className="lg:hidden inline-block cursor-pointer"
          onClick={toggleMenu}
        />
      ) : (
        <Image
          src={"/close.png"}
          alt="menu"
          width={28}
          height={28}
          className="lg:hidden inline-block cursor-pointer"
          onClick={toggleMenu}
        />
      )}
      <ul
        className={
          menuOpened
            ? "flex flex-col justify-center p-12 fixed top-14 right-0 bg-slate-100 rounded-lg transition-all duration-500 shadow-md lg:hidden "
            : "flex flex-col justify-center p-12 fixed top-14 right-[-100%] bg-slate-100 rounded-lg transition-all duration-500 shadow-md "
        }
      >
        {Nav_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="flex gap-1 m-6 justify-center relative text-gray-50 group"
          >
            <div
              className={`flex gap-2 text-gray-50 ${
                pathname === link.href ? "font-bold" : ""
              }`}
            >
              {link.label}
            </div>
            <span
              className={`inline-block absolute h-[2px] w-0 bg-black -bottom-2 transition-all duration-500 group-hover:w-full ${
                pathname === link.href ? "w-full" : ""
              }`}
            ></span>
          </Link>
        ))}
        {Token ? ( // Jika token ada, tampilkan tombol logout
          <Logout />
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
