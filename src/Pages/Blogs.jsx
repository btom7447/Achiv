import React, { useState, useEffect } from "react";
import BlogGridCard from "../Components/BlogGridCard";
import blogData from "../Data/blogData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import BlogsFilter from "../Components/BlogsFilter";

const Blogs = () => {
    const location = useLocation();

    // Extract the selected date from the query string
    const queryParams = new URLSearchParams(location.search);
    const selectedDateFromQuery = queryParams.get("date") || null;

    const selectedCategoryFromState = location.state?.selectedCategory || null;
    const selectedTagsFromState = location.state?.selectedTags || []; // Get selected tags from state

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState(blogData);
    const [selectedTags, setSelectedTags] = useState(selectedTagsFromState); // Initialize selectedTags from state
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromState);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "" }); // New state for date range
    const [selectedDate, setSelectedDate] = useState(selectedDateFromQuery); // New state for selected date from query

    const blogsPerPage = 9;

    // Filter blogs by selected category if it exists
    useEffect(() => {
        if (selectedCategoryFromState) {
            setSelectedCategory({ value: selectedCategoryFromState, label: selectedCategoryFromState });
        }
    }, [selectedCategoryFromState]);

    useEffect(() => {
        const filtered = blogData.filter((blog) => {
            // Check tags
            const tagMatch = !selectedTags.length || selectedTags.every((tag) => blog.tags.includes(tag.value));

            // Check category
            const categoryMatch = selectedCategory ? blog.category === selectedCategory.value : true;

            // Check name (author or title), case-insensitive match
            const searchQueryMatch = searchQuery
                ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  blog.author.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            // Check date range
            const blogDate = new Date(blog.date); // Convert blog date to a Date object
            const startDate = selectedDateRange.start ? new Date(selectedDateRange.start) : null;
            const endDate = selectedDateRange.end ? new Date(selectedDateRange.end) : null;

            const dateMatch = (!startDate || blogDate >= startDate) && (!endDate || blogDate <= endDate);

            // Check if blog date matches the selected date (from query param)
            const blogMonthYear = blogDate.toLocaleString("default", { month: "long", year: "numeric" });
            const selectedDateMatch = selectedDate ? blogMonthYear === selectedDate : true;

            return tagMatch && categoryMatch && searchQueryMatch && dateMatch && selectedDateMatch;
        });

        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [selectedTags, selectedCategory, searchQuery, selectedDateRange, selectedDate]); // Run filter when tags, category, search query, date range, or selected date changes

    const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    return (
        <div className="blogs-container">
            {/* Blog filter with current state values */}
            <BlogsFilter
                onFilterChange={({ tags, category, searchQuery, dateRange }) => {
                    setSelectedTags(tags || []);
                    setSelectedCategory(category || null);
                    setSearchQuery(searchQuery || "");
                    setSelectedDateRange(dateRange || { start: "", end: "" }); // Handle date range
                }}
                initialTags={selectedTags}
                initialCategory={selectedCategory}
                initialSearchQuery={searchQuery}
                initialDateRange={selectedDateRange} // Pass initial date range
            />

            {/* Blog grid display */}
            <div className="blogs-grid">
                {currentBlogs.map((blog) => (
                    <Link
                        key={blog.id}
                        to={`/blog-post/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                        <BlogGridCard blog={blog} />
                    </Link>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default Blogs;