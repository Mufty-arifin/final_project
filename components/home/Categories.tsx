"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FEATURE } from "../../constant";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiSearchLine,
} from "react-icons/ri";
import BannerSkeleton from "./Skeleton";
interface Categories {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const Feature = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API

  useEffect(() => {
    fetch(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="text-2xl bg-white p-3 inline-block rounded-full shadow-md absolute top-1/2 -right-3 z-10 hover:bg-slate-10"
      >
        <RiArrowRightLine size={30} />
      </div>
    );
  };
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="text-2xl bg-white p-3 inline-block rounded-full shadow-md absolute top-1/2 -left-3 z-10 hover:bg-slate-10 "
      >
        <RiArrowLeftLine size={30} />
      </div>
    );
  };
  var settings = {
    arrows: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="max-container padding-container bg-slate-10 py-12">
      <div className="m-auto w-[90%]">
        <h3 className="bold-32 text-center">Categories</h3>
        <p className="text-center max-w-lg m-auto text-gray-30 py-6">
          Presenting the world's most popular destinations, this travel blog
          takes you on breathtaking adventures to the most coveted places,
          unveiling natural wonders, cultural richness, and unforgettable
          experiences.
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
            <Slider {...settings}>
              {categories.map((categori: Categories) => (
                <div key={categori.id}>
                  <div className="mx-3 overflow-hidden border border-slate-200 group ">
                    <div className="overflow-hidden relative">
                      <Image
                        src={categori.imageUrl}
                        alt="img"
                        width={600}
                        height={510}
                        className="hover:scale-105 hover:rotate-2 transition-all duration-700 "
                      />
                      <Link
                        href={`/categories/${categori.id}`}
                        className="absolute top-1/2 left-1/2 h-14 w-14 bg-white flexCenter rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-500"
                      >
                        <RiSearchLine />
                      </Link>
                      <div className="absolute top-1/3 left-1/3 h-20 w-20  bold-32 text-white text-center justify-center ">
                        <p>{categori.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Feature;
