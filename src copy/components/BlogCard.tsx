import React from 'react'

const BlogCard = ({ blog, onSelect }:any) => {
    return (
        <>
            <div
                onClick={() => {
                    console.log("CLICKED BLOG:", blog);
                    onSelect(blog);
                }}
                className="cursor-pointer border-b p-3 hover:bg-gray-100"
            >
                <h2>Title: {blog.title}</h2>
                <p>ID: {blog.id}</p>

                <p>Description: {blog.description}</p>
                <p>Date: {blog.date}</p>
                {/* <img src={blog.coverImage} alt={blog.title} width="600px" height="400px"/> */}
                { blog.category && blog.category.length > 0 && (
                <div>
                    Category:
                    {blog.category.map((cat: string, index: number) => (
                        <span key={index} className="mx-1 px-2 py-1 bg-blue-200 text-blue-800 rounded">
                            {cat}
                        </span>
                    ))}
                </div>
                )}
                <p>Content: {blog.content}</p>
            </div>
        </>
    );
}

export default BlogCard;
