import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const BlogCard = ({ blog, isDark }: any) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <NavLink
      to={`/${blog.id}`}
      className={({ isActive }) => `
        block transition-all duration-200 rounded-xl overflow-hidden border-l-4
        ${isActive 
          ? isDark 
            ? 'border-l-indigo-500 shadow-lg' 
            : 'border-l-indigo-600 shadow-md'
          : isDark 
            ? 'border-l-transparent hover:shadow-md'
            : 'border-l-transparent hover:shadow-sm'
        }
      `}
    >
      {({ isActive }) => (
        <div
          className="relative h-40 rounded-xl overflow-hidden group"
          style={{
            backgroundImage: blog.coverImage ? `url('${blog.coverImage}')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Base dark overlay - always visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 rounded-xl"></div>
          
          {/* Hover blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[10px] bg-gradient-to-b from-black/30 to-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          {/* Content */}
          <div className="relative h-full p-3 flex flex-col justify-between rounded-xl">
            {/* Category */}
            <div className="flex items-center gap-2 flex-wrap">
              {blog.category?.slice(0, 2).map((cat: string, index: number) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                    isActive 
                      ? 'bg-indigo-500/50 text-indigo-100'
                      : 'bg-indigo-500/40 text-white'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Bottom Content */}
            <div>
              {/* Title */}
              <h3 className="font-bold mb-1.5 line-clamp-2 text-sm text-white">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-xs mb-2 line-clamp-1 leading-relaxed text-indigo-100">
                {blog.description}
              </p>

              {/* Date */}
              <div className="flex items-center text-xs gap-1.5 text-indigo-100">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(blog.date)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default BlogCard;