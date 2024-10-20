import React from "react";
import blogData from "../Data/blogData.json";
import { useNavigate } from "react-router-dom";

const TagsCard = () => {
    // Flatten the tags array, normalize case, and remove duplicates
    const uniqueTags = Array.from(
        new Set(blogData.flatMap(blog => blog.tags.map(tag => tag.toLowerCase())))
    ).sort();

    const navigate = useNavigate(); // Hook for navigation

    // Function to handle click and navigate to Blogs page with category and tags
    const handleTagClick = (tag) => {
        navigate("/blog", { 
            state: { 
                selectedCategory: null, // Pass null or the category if needed
                selectedTags: [{ value: tag, label: tag }] // Pass selected tag here
            } 
        }); 
    };

    return (
        <div className="tag-cards">
            <h4>Tags</h4>
            <ul className="tag">
                {uniqueTags.map((tag, index) => (
                    <li key={index} onClick={() => handleTagClick(tag)}>
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsCard;