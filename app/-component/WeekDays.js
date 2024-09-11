import React from "react";
import { format } from "date-fns"; // کتابخانه برای فرمت تاریخ
function WeekDays({ weeklyData }) {
  const getDayName = (dateString) => {
    const date = new Date(dateString); // تبدیل به تاریخ
    return format(date, "EEEE"); // گرفتن نام روز هفته (مانند Monday, Tuesday)
  };

  // بررسی وجود داده‌ها
  if (
    !weeklyData ||
    !weeklyData.temperature_2m_max ||
    !weeklyData.temperature_2m_min ||
    !weeklyData.time
  ) {
    return <p>No weather data available</p>;
  }

  return (
    <div className="flex flex-col gap-7 mx-7 mt-10">
      {weeklyData.temperature_2m_max.map((maxTemp, index) => (
        <div className="flex justify-between" key={index}>
          <h2 className="text-lg font-bold">
            {getDayName(weeklyData.time[index])}
          </h2>
          <div className="flex gap-7 items-center">
            <h2>
              {weeklyData.temperature_2m_min[index]}° / {maxTemp}°
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeekDays;
