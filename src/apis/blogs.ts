import axios from "axios";

export const fetchBlogs = async () => {
    // const res = await fetch("http://localhost:3001/blogs");
    // if (!res.ok){throw new Error("Failed to fetch blogs");}
    // return res.json();

    try{
        const res = await axios.get("http://localhost:3001/blogs");
        return res;
    } catch (error) {
        throw new Error("Failed to fetch blogs");
    }
};

export const fetchBlogById = async (id: string) => {
    // const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    const response = await axios.get(`http://localhost:3001//blogs/${id}`);
    return response.data;
};

export const createBlog = async (blogData: any) => {
    const response = await axios.post(`http://localhost:3001/blogs`, blogData);
    return response.data;
};