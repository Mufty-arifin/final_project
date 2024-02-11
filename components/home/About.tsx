import React from "react";
import { ABOUT } from "../../constant";
import Image from "next/image";

const About = () => {
  return (
    <section className="max-container padding-container py-24 ">
      <div className="flex flex-col gap-8 lg:flex-row pb-24">
        {/* Left */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="bold-52 capitalize pb-4">
            Join Us In Exploring The Wolrd
          </h1>
          <p className="text-gray-50 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            ipsum provident eos nisi architecto maxime cupiditate amet sunt,
            delectus, voluptate distinctio omnis aperiam veritatis saepe nobis
            temporibus facilis maiores exercitationem!
          </p>
          <br />
          <p className="text-gray-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            doloribus, non a repellat dignissimos temporibus accusantium earum
            veritatis eius aliquid?
          </p>
          <div className="flex flex-wrap mt-8 ">
            {ABOUT.map((about) => (
              <AboutItem
                key={about.title}
                title={about.title}
                icon={about.icon}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-1 gap-4 lg:gap-8">
          <div>
            <Image
              src={"/about-2.jpg"}
              alt="about"
              height={444}
              width={333}
              className="w-auto rounded-lg border border-gray-10 mb-12"
            />
          </div>
          <div>
            <Image
              src={"/about-1.jpg"}
              alt="about"
              height={444}
              width={333}
              className="w-auto rounded-lg border border-gray-10 mt-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
type AboutItem = {
  title: string;
  icon: string;
};
const AboutItem = ({ title, icon }: AboutItem) => {
  return (
    <div className="flex gap-2 w-1/2 mb-4">
      <Image src={icon} alt="icon" width={20} height={20} />
      <h1 className="regular-14">{title}</h1>
    </div>
  );
};
export default About;
