import React, { useEffect, useState } from "react";
import Airtable from "airtable";

const BlogFetcher = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initialize Airtable with the API key and base ID from environment variables
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .select({ view: "Grid view" })  // 'Grid view' is the default view, but can be adjusted
            .eachPage((records, fetchNextPage) => {
                // Collect all records from each page
                setBlogs((prevBlogs) => [...prevBlogs, ...records]);
                fetchNextPage();
            }, (err) => {
                if (err) {
                    console.error("Error fetching data:", err);
                    setError(err);
                }
            });
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            {error && <p>Error fetching blogs: {error.message}</p>}
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <h2>{blog.fields.Title}</h2>
                        <p>{blog.fields.Content}</p>
                        <p><strong>Category:</strong> {blog.fields.Category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogFetcher;