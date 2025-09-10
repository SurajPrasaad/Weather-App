import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SerachBar";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import {
  convertTemp,
  getWeatherIcon,
  mapHourlyData,
  mapDailyData,
  calculateStats,
} from "./utils/utils";
import CityNotFound from "./components/CityNotFound";

function App() {
  const [unitTemp, setUnitTemp] = useState("C");
  const [unitWind, setUnitWind] = useState("km/h");
  const [unitPrecip, setUnitPrecip] = useState("mm");
  const [city, setCity] = useState("Surat");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [stats, setStats] = useState({
    feelsLike: "-",
    humidity: "-",
    wind: "-",
    precipitation: "-",
  });
  const [weatherDescription, setWeatherDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        console.log(geoRes);
        //TODO::City not found
        setError("City not found");
        setWeather(null);
        setDaily([]);
        setLoading(false);
        return;
      }

      const { latitude, longitude, timezone } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,weathercode,windspeed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=${timezone}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.current_weather);

      const currentTime = new Date(weatherData.current_weather.time).getTime();
      let closestHourIndex = 0;
      let minDiff = Infinity;
      weatherData.hourly.time.forEach((t, i) => {
        const diff = Math.abs(new Date(t).getTime() - currentTime);
        if (diff < minDiff) {
          minDiff = diff;
          closestHourIndex = i;
        }
      });

      // Map hourly, daily and stats using utils
      setHourly(mapHourlyData(weatherData.hourly, currentTime, unitTemp));
      setDaily(mapDailyData(weatherData.daily, unitTemp));
      setStats(
        calculateStats(
          weatherData.hourly,
          closestHourIndex,
          unitWind,
          unitPrecip,
          unitTemp
        )
      );

      setWeatherDescription(
        getWeatherIcon(weatherData.current_weather.weathercode).desc
      );
      setCity(cityName);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [unitTemp, unitWind, unitPrecip]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchWeather(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="bg-[#0D0F25] min-h-screen px-4 sm:px-6 lg:px-8 py-8 text-white">
      <Header
        unitTemp={unitTemp}
        unitWind={unitWind}
        unitPrecip={unitPrecip}
        setUnitTemp={setUnitTemp}
        setUnitWind={setUnitWind}
        setUnitPrecip={setUnitPrecip}
      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && weather && (
        <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <WeatherCard
              city={city}
              weather={weather}
              stats={stats}
              weatherDescription={weatherDescription}
              convertTemp={(t) => convertTemp(t, unitTemp)}
              getWeatherIcon={getWeatherIcon}
            />
          </div>

          <div className="w-full md:w-64 p-4 sm:p-6 bg-[#1E213A]/30 backdrop-blur-sm rounded-2xl">
            <HourlyForecast hourly={hourly} />
          </div>
        </div>
      )}
      {!loading && daily.length > 0 && <DailyForecast daily={daily} />}

      {error && <p className="text-2xl text-center text-amber-50">{error}</p>}
    </div>
  );
}

export default App;
