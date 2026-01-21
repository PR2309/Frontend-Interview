import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '../apis/blogs';
import BlogCard from './BlogCard.tsx';

const BlogList = ({ isDark, searchQuery = '' }: { isDark: boolean; searchQuery?: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!data?.data || !searchQuery.trim()) {
      return data?.data || [];
    }
    
    const query = searchQuery.toLowerCase();
    return data.data.filter((blog: any) => 
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.category?.some((cat: string) => cat.toLowerCase().includes(query))
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className={`h-3 rounded w-1/4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <div className={`h-4 rounded w-3/4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <div className={`h-3 rounded w-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <div className={`h-3 rounded w-2/3 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 text-center transition-colors ${isDark ? 'text-red-400' : 'text-red-600'}`}>
        Error loading blogs
      </div>
    );
  }

  if (filteredBlogs.length === 0) {
    return (
      <div className={`p-4 text-center transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        No blogs found
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {filteredBlogs.map((blog: any) => (
        <BlogCard key={blog.id} blog={blog} isDark={isDark} />
      ))}
    </div>
  );
};

export default BlogList;