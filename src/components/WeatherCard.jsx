import cardImage from "../assets/images/bg-today-large.svg";

export default function WeatherCard({
  city,
  weather,
  stats,
  weatherDescription,
  convertTemp,
  getWeatherIcon,
}) {
  return (
    <div className="rounded-2xl bg-[#1E213A]/80 p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Weather Card */}
      <div
        className="rounded-2xl p-4 sm:p-6 h-60 sm:h-64 bg-cover bg-center flex flex-col justify-between"
        style={{ backgroundImage: `url(${cardImage})` }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">{city}</h2>
          <p className="text-xs sm:text-sm text-gray-300">
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm sm:text-md text-gray-200 mt-1">
            {weatherDescription}
          </p>
        </div>
        <div className="text-4xl sm:text-6xl font-bold flex items-center gap-3 sm:gap-4 text-white">
          {convertTemp(weather.temperature)}°{" "}
          <span className="text-2xl sm:text-3xl">
            {getWeatherIcon(weather.weathercode).icon}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 overflow-x-auto py-2 px-1">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-[#1E213A]/70 rounded-xl p-3 sm:p-4 text-center flex-none min-w-[100px] sm:min-w-[120px]"
          >
            <p className="text-xs sm:text-sm text-gray-300">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </p>
            <p className="font-bold text-sm sm:text-lg">{value}</p>
          </div>
        ))}

        <div className="bg-[#1E213A]/70 rounded-xl p-3 sm:p-4 text-center flex-none min-w-[100px] sm:min-w-[120px]">
          <p className="text-xs sm:text-sm text-gray-300">Temperature</p>
          <p className="font-bold text-sm sm:text-lg">{convertTemp(weather.temperature)}°</p>
        </div>
      </div>

    </div>
  );
}
