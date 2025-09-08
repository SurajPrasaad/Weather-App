import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { ChevronDown } from "lucide-react";

export default function Header({
  setUnitTemp,
  setUnitWind,
  setUnitPrecip
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUnitChange = (type, value) => {
    if (type === "temp") setUnitTemp(value);
    if (type === "wind") setUnitWind(value);
    if (type === "precip") setUnitPrecip(value);
    setDropdownOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-12 px-4 sm:px-6">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <img src={logo} alt="Logo" className="h-16 w-16 sm:h-20 sm:w-20" />
      </div>
      
      {/* Units Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-[#1E213A] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#2a2f50]"
        >
          Units <ChevronDown size={16} />
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-[#1E213A] rounded shadow-lg z-10">
            <div className="px-2 py-1 text-center border">Temperature</div>
            {["C", "F", "K"].map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange("temp", u)}
                className="block w-full text-left px-4 py-2 hover:bg-[#3C47E9]"
              >
                {u === "C"
                  ? "Celsius (°C)"
                  : u === "F"
                  ? "Fahrenheit (°F)"
                  : "Kelvin (K)"}
              </button>
            ))}

            <div className="px-2 py-1 mt-2 text-center border">Wind</div>
            {["km/h", "mph"].map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange("wind", u)}
                className="block w-full text-left px-4 py-2 hover:bg-[#3C47E9]"
              >
                {u}
              </button>
            ))}

            <div className="px-2 py-1 mt-2 text-center border">Precipitation</div>
            {["mm", "in"].map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange("precip", u)}
                className="block w-full text-left px-4 py-2 hover:bg-[#3C47E9]"
              >
                {u}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
