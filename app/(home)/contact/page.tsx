import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/home/contact/Breadcrumb";
import Hero from "@/components/home/contact/Hero";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Breadcrumb />
      <Footer />
    </>
  );
};

export default page;
