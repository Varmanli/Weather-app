/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**",
      },
    ],
  },
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
};

export default nextConfig;
