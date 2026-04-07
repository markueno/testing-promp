import React from 'react';
import { useBlog } from '../contexts/BlogContext';
import { Calendar, User, Clock, Search } from 'lucide-react';

function BlogList() {
  const { filteredPosts, selectPost } = useBlog();

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {filteredPosts.map(post => (
        <div 
          key={post.id} 
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
          onClick={() => selectPost(post.id)}
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
              {post.category}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-amber-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors">
              <span>Read More</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
