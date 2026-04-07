import React from 'react';
import { useBlog } from '../contexts/BlogContext';
import { Calendar, User, Clock, ChevronsLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogDetailProps {
  postId: string;
}

function BlogDetail({ postId }: BlogDetailProps) {
  const { posts, selectPost } = useBlog();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Post not found</h3>
        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
        <button 
          onClick={() => selectPost('')}
          className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => selectPost('')}
        className="flex items-center text-amber-600 hover:text-amber-700 mb-6 group"
      >
        <ChevronsLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Blog</span>
      </button>
      
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About the Author</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl font-bold text-amber-800">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{post.author}</h4>
                <p className="text-gray-600 mt-2">
                  Professional chef with over 15 years of experience in fine dining and culinary education.
                  Passionate about seasonal cooking, sustainable ingredients, and teaching others the joy
                  of home cooking.
                </p>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <div 
                    key={relatedPost.id}
                    onClick={() => selectPost(relatedPost.id)}
                    className="cursor-pointer group"
                  >
                    <div className="h-48 overflow-hidden rounded-lg mb-4">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default BlogDetail;
