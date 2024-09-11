import Image from "next/image";
import defaultImage from "@/public/imgs/default.svg";

function HoursDays({ time, temp, svg }) {
  return (
    <div className="flex flex-col justify-center  items-center gap-2">
      <Image src={svg || defaultImage} alt={""} width={29} />
      <div className="flex flex-col items-center">
        <p className="font-semibold text-lg">{Math.ceil(temp)}°</p>
        <p className="font-extralight text-secondaryTextColor text-xs">
          {time}
        </p>
      </div>
    </div>
  );
}

export default HoursDays;
