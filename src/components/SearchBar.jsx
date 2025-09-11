import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
      );
      if (res.data.results) {
        setSuggestions(res.data.results);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);

    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setSearchTerm(city.name);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
        How's the sky looking today?
      </h1>

      <div className="relative max-w-xl sm:max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-400" size={20} />
          </div>

          <input
            type="text"
            placeholder="Search for places..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full pl-10 p-3 rounded-md bg-[#1E213A] text-white focus:outline-none"
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white text-black rounded shadow max-h-60 overflow-y-auto mt-1 z-10">
              {suggestions.map((city) => (
                <li
                  key={city.id}
                  onClick={() => handleSelect(city)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >

                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                 
                </li>
              ))}
            </ul>

            
          )}
        </div>

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-[#3C47E9] px-6 py-3 rounded-md hover:bg-[#5a5efb] text-white"
        >
          Search
        </button>
      </div>
    </>
  );
}
