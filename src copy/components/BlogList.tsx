import React from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { fetchBlogs } from '../apis/blogs';
import BlogCard from './BlogCard.tsx';

const BlogList = ({onSelect}:any) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Blog Articles</h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {isLoading && (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>Error fetching blogs</p>
                    </div>
                )}
                {data?.data.map((blog: any) => (
                    <BlogCard key={blog.id} blog={blog} onSelect={onSelect}/>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
