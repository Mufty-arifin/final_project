"use client";
import { ListSidebarItem } from "@/constant";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between bg-black text-white  p-[30px] lg:w-[250px] w-[170px] h-[100vh] ">
      <div>
        <h1 className="mb-[40px] text-[24px]">Dashboard Admin</h1>
        <div className="flex flex-col gap-[10px] ">
          {ListSidebarItem.map((item) => (
            <div
              key={item.title}
              className={`p-[10px] rounded-md align-middle transition-all duration-300 gap-[10px] text-[18px] hover:bg-white hover:transition-all hover:duration-300  hover:cursor-pointer hover:shadow-lg hover:text-black  ${
                pathname === item.url ? "bg-white text-black" : ""
              }`}
            >
              {/* <Image src={item.icon} alt="icon" width={20} height={20} /> */}
              <Link href={item.url}>{item.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className="bg-white text-black px-[30px] rounded w-full py-[15px] flex justify-center align-middle cursor-pointer text-[16px] "
          type="button"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
