// Temperature conversion
export const convertTemp = (temp, unitTemp) =>
  unitTemp === "F"
    ? Math.round((temp * 9) / 5 + 32)
    : unitTemp === "K"
    ? Math.round(temp + 273.15)
    : Math.round(temp);

// Wind conversion
export const convertWind = (wind, unitWind) =>
  unitWind === "mph" ? Math.round(wind / 1.609) : Math.round(wind);

// Precipitation conversion
export const convertPrecip = (precip, unitPrecip) =>
  unitPrecip === "in" ? (precip / 25.4).toFixed(1) : precip;

// Weather icon mapping
export const getWeatherIcon = (code) => {
  switch (code) {
    case 0:
      return { icon: "☀️", desc: "Clear" };
    case 1:
      return { icon: "🌤️", desc: "Mainly Clear" };
    case 2:
      return { icon: "⛅", desc: "Partly Cloudy" };
    case 3:
      return { icon: "☁️", desc: "Cloudy" };
    case 45:
    case 48:
      return { icon: "🌫️", desc: "Fog" };
    case 51:
    case 53:
    case 55:
      return { icon: "🌦️", desc: "Drizzle" };
    case 61:
    case 63:
    case 65:
      return { icon: "🌧️", desc: "Rain" };
    case 71:
    case 73:
    case 75:
      return { icon: "❄️", desc: "Snow" };
    case 80:
    case 81:
    case 82:
      return { icon: "🌧️", desc: "Rain Showers" };
    case 95:
      return { icon: "⛈️", desc: "Thunderstorm" };
    default:
      return { icon: "☀️", desc: "Clear" };
  }
};

// Map hourly data
export const mapHourlyData = (hourlyData, currentTime, unitTemp) => {
  return hourlyData.time
    .map((time, index) => ({
      timeISO: time,
      time: new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temp: convertTemp(hourlyData.temperature_2m[index], unitTemp) + "°",
      icon: getWeatherIcon(hourlyData.weathercode[index]).icon,
    }))
    .filter((hour) => new Date(hour.timeISO).getTime() >= currentTime)
    .slice(0, 12);
};

// Map daily data
export const mapDailyData = (dailyData, unitTemp) => {
  return dailyData.time.map((time, index) => ({
    day: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
    high: convertTemp(dailyData.temperature_2m_max[index], unitTemp) + "°",
    low: convertTemp(dailyData.temperature_2m_min[index], unitTemp) + "°",
    icon: getWeatherIcon(dailyData.weathercode[index]).icon,
  }));
};

// Calculate stats
export const calculateStats = (
  hourlyData,
  closestHourIndex,
  unitWind,
  unitPrecip,
  unitTemp
) => {
  return {
    feelsLike:
      convertTemp(hourlyData.apparent_temperature[closestHourIndex], unitTemp) +
      "°",
    humidity:
      Math.round(hourlyData.relativehumidity_2m[closestHourIndex]) + "%",
    wind:
      convertWind(hourlyData.windspeed_10m[closestHourIndex], unitWind) +
      " " +
      unitWind,
    precipitation:
      convertPrecip(
        hourlyData.precipitation
          ? hourlyData.precipitation[closestHourIndex]
          : 0,
        unitPrecip
      ) +
      " " +
      unitPrecip,
  };
};
