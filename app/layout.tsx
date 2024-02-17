import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "./globals.css";
import Session from "@/components/sessionProvider";
import { getServerSession } from "next-auth";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Tour and Travel",
  description: "Tour and Travel app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Session session={session}>
          <ProtectedRoute>
            <main className="relative overflow-hidden">{children}</main>
          </ProtectedRoute>
        </Session>
      </body>
    </html>
  );
}
