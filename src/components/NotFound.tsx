import React from 'react';
import { Search } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';

function NotFound() {
  const { selectPost } = useBlog();

  return (
    <div className="text-center py-12 bg-white rounded-lg shadow">
      <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => selectPost('')}
        className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
      >
        Back to Blog
      </button>
    </div>
  );
}

export default NotFound;
