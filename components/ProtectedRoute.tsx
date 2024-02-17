"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const pathname = usePathname();

  if (session?.status === "unauthenticated") {
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return <div>{children}</div>;
    } else {
      redirect("/login");
      return null; // tambahkan return null setelah redirect
    }
  } else {
    if (session?.data?.user?.role === "admin") {
      if (pathname === "/dashboard" || pathname === "/dashboard/users" || pathname === "/dashboard/banners" || pathname === "/dashboard/categories" || pathname === "/dashboard/promos" || pathname === "/dashboard/activities") {
        return <div>{children}</div>;
      } else {
        redirect("/dashboard");
        return null; // tambahkan return null setelah redirect
      }
    } else if (session?.data?.user?.role === "user") {
      if (pathname === "/") {
        return <div>{children}</div>;
      } else {
        redirect("/");
        return null; // tambahkan return null setelah redirect
      }
    }
  }
}
