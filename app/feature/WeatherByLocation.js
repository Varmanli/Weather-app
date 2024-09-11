"use client";
const apiKey = "42f411545c107208b0328f08f5b8c4c8";

// components/WeatherByLocation.js

import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
import DayDetail from "../component/DayDetail";
import weatherIconMap from "../utility/weatherIcons";

export default function WeatherByLocation() {
  const { location, error } = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) {
      console.log("Location not available yet.");
      return;
    }

    console.log("Fetching weather data for location:", location);
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
        );
        console.log("API response status:", res.status);

        if (!res.ok) {
          throw new Error(`Failed to fetch weather data: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  console.log("Weather data:", weatherData);

  if (loading)
    return (
      <div class="flex justify-center items-center  gap-2 h-[20px]">
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>No weather data available</p>;

  const { main, weather, name } = weatherData;
  const { temp, temp_min, temp_max } = main;

  const weatherCondition = weather[0].description.toLowerCase();

  function getWeatherIcon(condition) {
    console.log("Getting icon for condition:", condition);
    const icon = weatherIconMap[condition];
    console.log("Selected icon:", icon); // بررسی آیکون انتخاب شده
    return icon || weatherIconMap.default; // استفاده از آیکون پیش‌فرض در صورت نبود آیکون
  }

  const weatherIcon = getWeatherIcon(weatherCondition);

  return (
    <DayDetail
      temp={temp}
      tempMax={temp_max}
      tempMin={temp_min}
      name={name}
      svg={weatherIcon}
    />
  );
}
