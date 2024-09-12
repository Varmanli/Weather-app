"use client";
import { useState, useEffect } from "react";
import WeekDays from "../component/WeekDays";
import useGeolocation from "../hooks/useGeolocation";

function WeekWeatherFetch() {
  const { location, error: locationError } = useGeolocation();
  const [weeklyData, setWeeklyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyWeather = async () => {
      if (!location) return;
      try {
        setLoading(true);
        console.log("Fetching weather data...");

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (!res.ok) throw new Error("Failed to fetch weather data");

        const data = await res.json();
        console.log("Weather data fetched:", data);

        if (data.daily) {
          setWeeklyData(data.daily);
        } else {
          throw new Error("No daily weather data found");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyWeather();
  }, [location]);

  if (loading)
    return (
      <div className="flex justify-center items-center  gap-2 h-[20px]">
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return <WeekDays weeklyData={weeklyData} />;
}

export default WeekWeatherFetch;
