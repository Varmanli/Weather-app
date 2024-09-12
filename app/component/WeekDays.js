import { format } from "date-fns"; // کتابخانه برای فرمت تاریخ

function WeekDays({ weeklyData }) {
  const getDayName = (dateString) => {
    const date = new Date(dateString); // تبدیل به تاریخ
    return format(date, "EEEE");
  };
  return (
    <div className="flex flex-col gap-7 mx-4 mt-10">
      {weeklyData.temperature_2m_max.map((maxTemp, index) => (
        <div className="flex justify-between" key={index}>
          <h2 className="text-lg font-bold">
            {getDayName(weeklyData.time[index])}
          </h2>
          <div className="flex gap-7 items-center">
            <h2 className="font-semibold">
              {Math.ceil(weeklyData.temperature_2m_min[index])}°/
              <span className="text-secondaryTextColor/70">
                {Math.ceil(maxTemp)}°
              </span>
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeekDays;
