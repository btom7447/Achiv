import React, { useState, useEffect } from "react";
import Airtable from 'airtable';
import { Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader"; // Import PuffLoader

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const PopularPostCard = () => {
    const [randomPosts, setRandomPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching
        base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedBlogs = records
                    .map(record => ({
                        id: record.id,
                        title: record.fields.title,
                        author: record.fields.author_name,
                        category: record.fields.category,
                        tags: record.fields.tags || [],
                        date: record.fields.date,
                        carousel: record.fields.carousel,
                        image: record.fields.images ? record.fields.images.map(img => img.url) : []
                    }))
                    .filter(blog => blog.carousel === "true")
                    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

                // Get the most recent 5 blogs
                const recentFeaturedBlogs = fetchedBlogs.slice(0, 5);
                setRandomPosts(recentFeaturedBlogs);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    return (
        <div className="popular-post">
            <h4>Featured Posts</h4>
            {loading ? (
                <div className="loader-container"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                    <PuffLoader color="#cfac9f" size={80} />
                </div>
            ) : (
                randomPosts.map((blog) => (
                    <Link
                        key={blog.id}
                        to={{
                            pathname: `/blog-post/${blog.title.toLowerCase().replace(/\s+/g, '-')}`,
                            state: { blog } // Pass the blog object as state
                        }}
                    >
                        <div key={blog.id} className="popular-post-card">
                            {blog.image && blog.image.length > 0 && (
                                <img src={blog.image[0]} alt={blog.title} />
                            )}
                            <p>{blog.date}</p>
                            <h6>{blog.title}</h6>
                        </div>
                    </Link>
                ))
            )}
            {!loading && randomPosts.length === 0 && <p>No featured posts available.</p>}
        </div>
    );
};

export default PopularPostCard;