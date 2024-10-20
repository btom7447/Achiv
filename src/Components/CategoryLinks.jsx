import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../Data/blogData.json";

const CategoryLinks = () => {
    const navigate = useNavigate(); // Hook for navigation

    // Get unique categories, sort them alphabetically
    const uniqueCategories = Array.from(new Set(blogData.map(blog => blog.category))).sort();

    // Function to handle click and navigate to Blogs page with category
    const handleCategoryClick = (category) => {
        navigate("/blog", { state: { selectedCategory: category } }); // Pass the category via state
    };

    return (
        <div className="category-links">
            <h4>Categories</h4>
            <ul>
                {uniqueCategories.map((category, index) => (
                    <li key={index} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryLinks;