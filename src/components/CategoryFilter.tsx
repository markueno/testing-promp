import React from 'react';
import { useBlog } from '../contexts/BlogContext';

function CategoryFilter() {
  const { categories, selectedCategory, selectCategory } = useBlog();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => selectCategory(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-amber-600 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => selectCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-amber-600 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
