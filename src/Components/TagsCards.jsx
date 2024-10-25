import React from "react";
import { useNavigate } from "react-router-dom";

const TagsCard = ({ blogs }) => {
    // Flatten and extract unique tags
    const uniqueTags = Array.from(
        new Set(blogs.flatMap(blog => blog.tags.map(tag => tag.toLowerCase())))
    ).sort();

    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        navigate("/blog", { 
            state: { 
                selectedCategory: null, 
                selectedTags: [{ value: tag, label: tag }]
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