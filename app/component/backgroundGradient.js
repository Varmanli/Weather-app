"use client";

function getCurrentTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 6) return "dawn";
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "noon";
  if (hour >= 16 && hour < 19) return "evening";
  return "night";
}

const gradients = {
  dawn: "linear-gradient(to bottom, #1C7891, #162A2F)",
  morning: "linear-gradient(to bottom, #32D0FC, #005CE0)",
  noon: "linear-gradient(to bottom, #FC9F32, #D33A3A)",
  evening: "linear-gradient(to bottom, #030632, #4000A3)",
  night: "linear-gradient(to bottom, #35416C, #151515)",
};

function Background({ children }) {
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

export default Background;
