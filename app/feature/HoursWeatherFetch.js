"use client";

import { useEffect, useState } from "react";
import HoursDays from "../-component/HoursDays"; // کامپوننت نمایش ساعت‌های آینده
import useGeolocation from "../hooks/useGeolocation"; // کاستوم هوک برای دریافت لوکیشن
import weatherIconMap from "../utility/weatherIcons";

const apiKey = "42f411545c107208b0328f08f5b8c4c8"; // کلید API

export default function WeatherHours() {
  const { location, error: locationError } = useGeolocation(); // دریافت لوکیشن کاربر
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await res.json();
        const nextHours = data.list.slice(0, 7); // دریافت اطلاعات ۷ ساعت آینده
        setForecastData(nextHours);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (locationError) return <p>Error getting location: {locationError}</p>;
  if (loading)
    return (
      <div class="flex justify-center items-center  gap-2 h-[50px]">
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    );
  if (error) return <p>Error fetching weather data: {error}</p>;

  function getWeatherIcon(condition) {
    return weatherIconMap[condition] || null;
  }

  return (
    <div className="flex justify-between items-center gap-4 mx-4">
      {forecastData.map((hour, index) => {
        const weatherCondition = hour.weather[0].description.toLowerCase();
        const icon = getWeatherIcon(weatherCondition);
        return (
          <HoursDays
            key={index}
            svg={icon}
            time={new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
            })}
            temp={hour.main.temp}
          />
        );
      })}
    </div>
  );
}
