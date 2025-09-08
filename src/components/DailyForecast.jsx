export default function DailyForecast({ daily }) {
  return (
    <div className="max-w-5xl mx-auto mb-8 px-4 sm:px-6">
      <h3 className="mb-4 font-semibold text-lg">Daily Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 text-center">
        {daily.map((d) => (
          <div
            key={d.day}
            className="bg-[#1E213A]/80 rounded-xl p-4 flex flex-col items-center justify-center"
          >
            <p className="font-semibold text-sm sm:text-base">{d.day}</p>
            <p className="text-3xl my-1">{d.icon}</p>
            <p className="text-xs sm:text-sm">
              {d.high} | {d.low}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
