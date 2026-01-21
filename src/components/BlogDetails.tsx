import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../apis/blogs";
import { Calendar, Tag, ThumbsUp, ThumbsDown, Star, Share2, Eye, Plus, X } from 'lucide-react';

const BlogDetails = ({ isDark }: { isDark: boolean }) => {
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isRead, setIsRead] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className={`h-56 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
        <div className="space-y-3">
          <div className={`h-8 rounded w-3/4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <div className={`h-4 rounded w-1/4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <div className={`h-4 rounded w-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <div className={`h-4 rounded w-5/6 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
        </div>
      </div>
    );
  }

  const blog = data?.data.find((b: any) => b.id === id);

  if (!blog) {
    return (
      <div className={`text-center py-12 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <p className="text-lg">Select an article to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
        />
      )}
      
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {blog.category?.map((cat: string) => (
          <span key={cat} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isDark ? 'bg-indigo-500/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
            <Tag className="h-3.5 w-3.5" />
            {cat}
          </span>
        ))}
      </div>
      
      <h1 className={`text-4xl font-bold mb-4 leading-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{blog.title}</h1>
      
      <div className={`flex items-center justify-start gap-2 mb-4 pb-4 border-b transition-colors ${isDark ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200'}`}>
        
        {/* Toggle Button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            isDark
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          title="Toggle actions"
        >
          {showDropdown ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </div>

      {/* Action Buttons Horizontal Bar */}
      {showDropdown && (
        <div
          className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all animate-in fade-in duration-200 mb-8 ${
            isDark ? 'bg-slate-700/50' : 'bg-slate-100'
          }`}
        >
          {/* Like Button */}
          <button
            onClick={() => setLikes(likes + 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDark
                ? 'bg-slate-600 hover:bg-slate-500 text-slate-200'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Like this article"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">{likes}</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => setDislikes(dislikes + 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDark
                ? 'bg-slate-600 hover:bg-slate-500 text-slate-200'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Dislike this article"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="text-sm font-medium">{dislikes}</span>
          </button>

          {/* Mark as Read Button */}
          <button
            onClick={() => setIsRead(!isRead)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isRead
                ? isDark
                  ? 'bg-green-500/30 text-green-300'
                  : 'bg-green-100 text-green-700'
                : isDark
                  ? 'bg-slate-600 hover:bg-slate-500 text-slate-200'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Mark as read"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">{isRead ? 'Read' : 'Unread'}</span>
          </button>

          {/* Star Button */}
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isStarred
                ? isDark
                  ? 'bg-yellow-500/30 text-yellow-300'
                  : 'bg-yellow-100 text-yellow-700'
                : isDark
                  ? 'bg-slate-600 hover:bg-slate-500 text-slate-200'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Star this article"
          >
            <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{isStarred ? 'Starred' : 'Star'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => handleShare()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDark
                ? 'bg-slate-600 hover:bg-slate-500 text-slate-200'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Copy link to share"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      )}
      
      <div className="prose prose-slate max-w-none">
        <p className={`text-lg mb-6 leading-relaxed font-medium transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {blog.description}
        </p>
        
        <div className={`leading-relaxed whitespace-pre-wrap transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;