import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../Data/blogData.json";

const ArchiveCard = () => {
    const navigate = useNavigate();

    // Helper function to convert date strings to month-year format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    };

    // Group blog posts by month and year
    const groupedBlogs = blogData.reduce((acc, blog) => {
        const formattedDate = formatDate(blog.date);
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(blog);
        return acc;
    }, {});

    // Sort blog posts by month and year
    const sortedGroups = Object.keys(groupedBlogs).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA; // Sort by most recent first
    });

    // Function to handle navigation to the blog page with the selected date
    const handleNavigate = (monthYear) => {
        navigate(`/blog?date=${encodeURIComponent(monthYear)}`);
    };

    return (
        <div className="category-links">
            <h4>Archive</h4>
            <ul>
                {sortedGroups.map((group) => (
                    <li key={group}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigate(group);
                            }}
                        >
                            {group}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArchiveCard;