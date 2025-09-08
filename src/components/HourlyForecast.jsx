export default function HourlyForecast({ hourly }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white font-semibold mb-2">Hourly Forecast</h3>
      {hourly.slice(0, 8).map((hour) => (
        <div
          key={hour.time}
          className="flex justify-between items-center bg-[#1E213A]/70 rounded-xl px-3 py-2"
        >
          <p className="text-sm">{hour.time}</p>
          <p className="text-xl">{hour.icon}</p>
          <p className="font-bold">{hour.temp}</p>
        </div>
      ))}
    </div>
  );
}
