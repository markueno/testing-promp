import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlog();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search recipes..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-all"
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      {localQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
