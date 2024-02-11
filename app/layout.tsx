import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tour and Travel",
  description: "Tour and Travel app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="relative overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
