import React from "react";
import { useParams } from 'react-router-dom';
import blogData from '../Data/blogData.json';  
import BlockRight from "../Components/BlockRight";
import BlogArticle from "../Components/BlogArticle";

const BlogPost = () => {
    const { title } = useParams();  // Get the blog title from the URL

    // Function to un-slugify the title (replace dashes with spaces)
    const unslugifyTitle = (slug) => slug.replace(/-/g, ' ');

    // Find the blog post based on the un-slugified title
    const blog = blogData.find(post => post.title.toLowerCase() === unslugifyTitle(title));

    if (!blog) {
        return <h2>Blog post not found</h2>;
    }

    return (
        <div className="blog-blocks">
            <BlogArticle blog={blog} />
            <BlockRight />
        </div>
    );
};

export default BlogPost;