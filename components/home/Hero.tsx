import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-hero bg-cover bg-center bg-no-repeat h-[100vh] w-full z-10 pb-12 ">
      <div className="max-container padding-container relative top-20 sm:top-1/3 z-10 ">
        <h1 className="bold-44 sm:bold-64 text-white capitalize max-w-[36rem]">
          Explore The World With Us
        </h1>
        <p className="regular-16 mt-6 text-white lg:w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          delectus tenetur porro excepturi ab consequatur sequi. Nobis fuga odit
          delectus architecto eum id, provident quam praesentium quasi alias,
          dolorum doloribus beatae aliquam laboriosam.
        </p>
        <div className="mt-8">
          <button className=" flexCenter gap-2 border rounded-full btn_white_rounded">
            <label className="whitespace-nowrap cursor-pointer bold-16">
              Travel Plan
            </label>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
