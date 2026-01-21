import React from 'react';

const BlogDetails = ({blog}:any) => {
    if(!blog){
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                Select a blog to see details
            </div>
        );
    }
    // return (
    //     <>
    //         <div>Blog Details Component</div>
    //         <img src={blog.id} alt={blog.title} className="w-full h-64 object-cover rounded-lg"/>
    //     </>
    // );


  return (
    <article className="max-w-4xl mx-auto">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="overflow-hidden rounded-2xl mb-6">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
      )}

      {/* Category + Read time */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
        {blog.category && blog.category.length > 0 && (
          <span className="uppercase text-blue-600 font-semibold">
            {blog.category[0]}
          </span>
        )}
        {blog.readTime && <span>• {blog.readTime} read</span>}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        {blog.author && <span>By {blog.author}</span>}
        {blog.date && <span>{blog.date}</span>}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 mb-6">
        {blog.description}
      </p>

      {/* Content */}
      {blog.content && (
        <div className="prose max-w-none">
          <p>{blog.content}</p>
        </div>
      )}

      {/* Categories */}
      {blog.category && blog.category.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {blog.category.map((category:any, index:any) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};


export default BlogDetails;
