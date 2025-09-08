import { Search } from "lucide-react";

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 rounded-md bg-[#1E213A] text-white focus:outline-none"
          />
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
