import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import defaultImage from "@/public/imgs/default.svg";

function DayDetail({ temp, tempMax, tempMin, name, svg }) {
  return (
    <section className="flex justify-between items-center gap-10 mb-10">
      <div className="flex flex-col justify-center items-start gap-7 ml-4 mt-[70px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold">{Math.ceil(temp)}°</h2>
          <h3 className="text-2xl font-bold ml-1 text-secondaryTextColor">
            {`${Math.ceil(tempMin)}°/${Math.ceil(tempMax)}°`}
          </h3>
        </div>
        <button className="flex items-center gap-2 text-lg bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 px-4 py-2">
          <IoLocationSharp />
          {name}
        </button>
      </div>
      <div>
        <Image
          src={svg || defaultImage}
          alt="Weather Icon"
          width={250}
          height={250}
          className="w-[250px] mt-10"
        />
      </div>
    </section>
  );
}

export default DayDetail;
