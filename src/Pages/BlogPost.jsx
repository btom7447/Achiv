import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BlogArticle from "../Components/BlogArticle";
import BlockRight from "../Components/BlockRight";
import Airtable from 'airtable';
import PuffLoader from 'react-spinners/PuffLoader';

const BlogPost = () => {
    const { title } = useParams(); // Get the blog title from the URL
    const [blog, setBlog] = useState(null); // State for the blog data
    const [loading, setLoading] = useState(true); // State for loading status

    // Function to un-slugify the title (replace dashes with spaces)
    const unslugifyTitle = (slug) => slug.replace(/-/g, ' ');

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        // Fetch blog posts
        const fetchBlogPosts = async () => {
            try {
                const records = await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME).select({ view: "Grid view" }).all();
                const fetchedBlogs = records.map(record => ({
                    id: record.id,
                    title: record.fields.title,
                    first_paragraph: record.fields.first_paragraph,
                    second_paragraph: record.fields.second_paragraph,
                    third_paragraph: record.fields.third_paragraph,
                    quote: record.fields.quote,
                    author: record.fields.author_name,
                    category: record.fields.category,
                    tags: record.fields.tags || [],
                    date: record.fields.date,
                    content: record.fields.content,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : [],
                }));

                // Find the blog post based on the un-slugified title
                const foundBlog = fetchedBlogs.find(post => post.title.toLowerCase() === unslugifyTitle(title));
                setBlog(foundBlog);
            } catch (err) {
                console.error("Error fetching blog post:", err);
                setBlog(null); // Handle error case
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogPosts();
    }, [title]); // Fetch whenever title changes

    // Show loading effect if data is still being fetched
    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PuffLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    // If no blog is found
    if (!blog) {
        return <div className="loading-container">Blog post not found.</div>;
    }

    return (
        <div className="blog-blocks">
            <BlogArticle blog={blog} />
            <BlockRight />
        </div>
    );
};

export default BlogPost;