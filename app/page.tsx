import React from "react";
import Hero from "../components/home/Hero";
import Feature from "../components/home/Banners";
import About from "../components/home/About";
import Activities from "../components/home/Activities";
import Categories from "../components/home/Categories";
import Testimonial from "../components/home/Testimonial";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <About />
      <Categories  />
      <Activities />
      <Testimonial />
      <Footer />
    </>
  );
}
