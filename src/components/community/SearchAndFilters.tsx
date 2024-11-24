import { Search } from 'lucide-react';

interface SearchAndFiltersProps
{
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchAndFilters = ({ searchQuery, setSearchQuery }: SearchAndFiltersProps) => (
  <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 w-full">
    <div className="relative">
      <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search projects, members, or events..."
        className="w-full bg-white pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
      {['All', 'Reforestation', 'Conservation', 'Local Development', 'Education'].map((filter) => (
        <button
          key={filter}
          className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
);

export default SearchAndFilters;