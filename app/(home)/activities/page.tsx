"use client";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiSearchLine, RiTimeLine } from "react-icons/ri";
import BannerSkeleton from "@/components/home/Skeleton";
import Hero from "@/components/home/activities/Hero";
import Breadcrumb from "@/components/home/activities/Breadcrumb";

const page = () => {
  const [Activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API

  useEffect(() => {
    fetch(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setActivities(data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <section className="max-container bg-slate-100 padding-container py-12">
        <Breadcrumb />
        <div className="m-auto w-[90%]">
          <h3 className="bold-32 text-center">Our Activities</h3>
          <p className="text-center max-w-lg m-auto text-gray-30 py-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            obcaecati nemo minima at voluptas. Cumque impedit ducimus enim alias
            itaque voluptatem nobis odit, error doloremque nesciunt repellendus
            doloribus, ad modi!
          </p>
          <div className="pt-16">
            {loading ? (
              // skeleton
              <div className="flex justify-center gap-5">
                <BannerSkeleton />
                <BannerSkeleton />
                <BannerSkeleton />
                <BannerSkeleton />
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12">
                {Activities.map((item: any) => (
                  <div key={item.id}>
                    <div className="overflow-hidden rounded-tl-xl rounded-tr-xl  group">
                      <div className="overflow-hidden relative">
                        <Image
                          src={item.imageUrls[0]}
                          alt="img"
                          width={600}
                          height={510}
                          className="group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
                        />
                        <Link
                          href="/"
                          className="absolute top-1/2 left-1/2 h-14 w-14 bg-white flexCenter rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-500"
                        >
                          <RiSearchLine />
                        </Link>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="capitalize medium-18 flexBetween">
                          {item.title}{" "}
                          <span className="text-green-50">$ {item.price}</span>
                        </div>
                        <p className="text-gray-50 my-3 regular-14 border-b border-gray-200 pb-3">
                          {item.description}
                        </p>
                        <div className="flexBetween">
                          <p className=" flexBetween gap-2 text-gray-50">
                            <Image
                              src="/flight.png"
                              alt="map"
                              width={16}
                              height={16}
                            />
                            {item.price_discount}
                          </p>
                          <Link
                            href={`/activities/${item.id}`}
                            className="medium-14 px-4 py-2 rounded-md border bg-black text-white"
                          >
                            <span>Details</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
