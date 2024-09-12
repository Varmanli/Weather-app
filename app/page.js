import Background from "./component/backgroundGradient";
import HoursWeatherFetch from "./feature/HoursWeatherFetch";
import WeatherByLocation from "./feature/WeatherByLocation";
import WeekWeatherFetch from "./feature/WeekWeatherFetch";

export default function Home() {
  return (
    <main className=" md:w-[500px] mx-auto">
      <Background>
        <WeatherByLocation />
        <HoursWeatherFetch />
        <WeekWeatherFetch />
      </Background>
    </main>
  );
}
