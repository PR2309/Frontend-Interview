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
