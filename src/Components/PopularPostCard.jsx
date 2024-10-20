import React, { useState, useEffect } from "react";
import blogData from "../Data/blogData.json"; 

const PopularPostCard = () => {
    const [randomPosts, setRandomPosts] = useState([]);

    useEffect(() => {
        // Function to filter featured blogs and shuffle
        const getFeaturedRandomPosts = (data) => {
            const featuredBlogs = data.filter(blog => blog.featured === "yes"); // Filter for featured blogs
            const shuffled = featuredBlogs.sort(() => 0.5 - Math.random()); // Shuffle the featured blogs
            return shuffled.slice(0, 5); // Get first 3 items
        };

        // Set the random posts from blogData
        setRandomPosts(getFeaturedRandomPosts(blogData));
    }, []); // Empty dependency array to run once on component mount

    return (
        <div className="popular-post">
            <h4>Featured Posts</h4>
            {randomPosts.map((blog) => (
                <div key={blog.id} className="popular-post-card">
                    {blog.image && blog.image.length > 0 && (
                        <img src={blog.image[0]} alt={blog.title} />
                    )}
                    <p>{blog.date}</p>
                    <h6>{blog.title}</h6>
                </div>
            ))}
        </div>
    );
};

export default PopularPostCard;