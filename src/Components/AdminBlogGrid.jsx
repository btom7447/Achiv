import React, { useState, useEffect } from "react";
import blogData from "../Data/blogData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import BlogsFilter from "./BlogsFilter";
import AOS from 'aos'; // AOS Import
import 'aos/dist/aos.css'; // AOS CSS
import BlogGridCard from "./BlogGridCard";

const AdminBlogGrid = () => {
    const location = useLocation();

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
    const [selectedDate] = useState(selectedDateFromQuery); // New state for selected date from query

    const blogsPerPage = 9;

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration (adjust as necessary)
            easing: 'ease-in-out', // Easing effect
            once: true, // Animation will only happen once
        });
    }, []);

    useEffect(() => {
        if (selectedCategoryFromState) {
            setSelectedCategory({ value: selectedCategoryFromState, label: selectedCategoryFromState });
        }
    }, [selectedCategoryFromState]);

    useEffect(() => {
        const filtered = blogData.filter((blog) => {
            const tagMatch = !selectedTags.length || selectedTags.every((tag) => blog.tags.includes(tag.value));
            const categoryMatch = selectedCategory ? blog.category === selectedCategory.value : true;
            const searchQueryMatch = searchQuery
                ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  blog.author.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const blogDate = new Date(blog.date);
            const startDate = selectedDateRange.start ? new Date(selectedDateRange.start) : null;
            const endDate = selectedDateRange.end ? new Date(selectedDateRange.end) : null;
            const dateMatch = (!startDate || blogDate >= startDate) && (!endDate || blogDate <= endDate);

            const blogMonthYear = blogDate.toLocaleString("default", { month: "long", year: "numeric" });
            const selectedDateMatch = selectedDate ? blogMonthYear === selectedDate : true;

            return tagMatch && categoryMatch && searchQueryMatch && dateMatch && selectedDateMatch;
        });

        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [selectedTags, selectedCategory, searchQuery, selectedDateRange, selectedDate]);

    const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top on page change
    };

    return (
        <div className="blogs-container">
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
                initialDateRange={selectedDateRange}
            />

            <div className="blogs-grid">
                {currentBlogs.map((blog, index) => (
                    <Link
                        key={blog.id}
                        to={`/admin/blog-post/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}
                        state={{ blog }} 
                    >
                        <BlogGridCard blog={blog} dataAos="fade-in" dataAosDelay={index * 100} />
                    </Link>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default AdminBlogGrid;
