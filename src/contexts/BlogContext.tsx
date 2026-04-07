import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

interface BlogContextType {
  posts: BlogPost[];
  filteredPosts: BlogPost[];
  selectedPostId: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  selectPost: (id: string) => void;
  selectCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  categories: string[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children, initialPosts }: { children: React.ReactNode; initialPosts: BlogPost[] }) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category));
    return Array.from(uniqueCategories);
  }, [posts]);

  const selectPost = (id: string) => {
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  return (
    <BlogContext.Provider value={{
      posts,
      filteredPosts,
      selectedPostId,
      selectedCategory,
      searchQuery,
      selectPost,
      selectCategory,
      setSearchQuery,
      categories
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
