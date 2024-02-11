/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s-light.tiket.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.indonesia.travel",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pngitem.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mockofun.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.jakpost.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
