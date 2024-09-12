"use client";

import { useState, useEffect } from "react";
import useGeolocation from "@/app/hooks/useGeolocation";

function getCurrentTimeOfDay(hour) {
  if (hour >= 0 && hour < 6) return "dawn";
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "noon";
  if (hour >= 16 && hour < 19) return "evening";
  return "night";
}

const gradients = {
  dawn: "bg-gradient-to-b from-[#1C7891] to-[#162A2F]",
  morning: "bg-gradient-to-b from-[#32D0FC] to-[#005CE0]",
  noon: "bg-gradient-to-b from-[#FC9F32] to-[#D33A3A]",
  evening: "bg-gradient-to-b from-[#030632] to-[#4000A3]",
  night: "bg-gradient-to-b from-[#35416C] to-[#151515]",
};
function Background({ children }) {
  const { location } = useGeolocation();
  const [localTime, setLocalTime] = useState(null);

  useEffect(() => {
    if (location) {
      const currentTime = new Date();
      const options = {
        hour: "numeric",
        timeZoneName: "short",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // منطقه زمانی
      };

      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
        currentTime
      );
      const localHour = currentTime.getHours(); // ساعت محلی
      setLocalTime(localHour);
    }
  }, [location]);

  const timeOfDay =
    localTime !== null ? getCurrentTimeOfDay(localTime) : "night";
  const gradient = gradients[timeOfDay];

  return <div className={`${gradient} text-white rounded-xl`}>{children}</div>;
}

export default Background;
