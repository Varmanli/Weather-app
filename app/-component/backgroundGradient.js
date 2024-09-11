"use client";

function getCurrentTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "noon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night"; // شب
}

const gradients = {
  dawn: "linear-gradient(to bottom, #1C7891, #162A2F)",
  morning: "linear-gradient(to bottom, #32D0FC, #005CE0)",
  noon: "linear-gradient(to bottom, #FC9F32, #D33A3A)",
  evening: "linear-gradient(to bottom, #030632, #4000A3)",
  night: "linear-gradient(to bottom, #35416C, #151515)",
};

export default function Background({ children }) {
  const timeOfDay = getCurrentTimeOfDay();
  const gradient = gradients[timeOfDay] || gradients.night;

  return (
    <div
      style={{
        background: gradient,
        color: "#ffff",
        borderRadius: 20,
        paddingBottom: 20,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}
