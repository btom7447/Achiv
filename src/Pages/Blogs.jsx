import React, { useState, useEffect } from "react";
import BlogGridCard from "../Components/BlogGridCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import BlogsFilter from "../Components/BlogsFilter";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Airtable from 'airtable';
import PuffLoader from 'react-spinners/PuffLoader';

const Blogs = () => {
    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const selectedDateFromQuery = queryParams.get("date") || null;

    const selectedCategoryFromState = location.state?.selectedCategory || null;
    const selectedTagsFromState = location.state?.selectedTags || [];

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]); // Store all blogs initially
    const [selectedTags, setSelectedTags] = useState(selectedTagsFromState);
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromState);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "" });
    const [selectedDate] = useState(selectedDateFromQuery);
    const [loading, setLoading] = useState(true);

    const blogsPerPage = 9;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    // Set selectedCategory if passed from navigation state
    useEffect(() => {
        if (selectedCategoryFromState) {
            setSelectedCategory({ value: selectedCategoryFromState, label: selectedCategoryFromState });
        }
    }, [selectedCategoryFromState]);

    // Fetch all blogs on initial load
    useEffect(() => {
        setLoading(true);
        base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedBlogs = records.map(record => ({
                    id: record.id,
                    title: record.fields.title,
                    author: record.fields.author_name,
                    category: record.fields.category,
                    tags: record.fields.tags || [],
                    date: record.fields.date,
                    content: record.fields.content,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : [],
                }));
                
                setAllBlogs(fetchedBlogs); // Save all blogs initially
                setFilteredBlogs(fetchedBlogs); // Set as filtered to display on load
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            });
    }, []);

    // Filter blogs based on tags, category, and other filters
    useEffect(() => {
        const filtered = allBlogs.filter((blog) => {
            const tagMatch = !selectedTags.length || selectedTags.every((tag) => blog.tags.includes(tag.value));
            const categoryMatch = selectedCategory ? blog.category === selectedCategory.value : true;

            const searchQueryMatch = searchQuery
                ? (typeof blog.title === 'string' && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (typeof blog.author === 'string' && blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
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
        setCurrentPage(1);
    }, [allBlogs, selectedTags, selectedCategory, searchQuery, selectedDateRange, selectedDate]);

    const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    return (
        <div className="blogs-container">
            <BlogsFilter
                blogData={filteredBlogs}
                onFilterChange={({ tags, category, searchQuery }) => {
                    setSelectedTags(tags || []);
                    setSelectedCategory(category || null);
                    setSearchQuery(searchQuery || "");
                }}
                initialTags={selectedTags}
                initialCategory={selectedCategory}
                initialSearchQuery={searchQuery}
            />

            {loading ? (
                <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <PuffLoader size={80} color="#cfac9f" />
                </div>
            ) : (
                <>
                    <div className="blogs-grid">
                        {currentBlogs.length > 0 ? (
                            currentBlogs.map((blog, index) => (
                                <Link
                                    key={blog.id}
                                    to={`/blog-post/${blog.title ? blog.title.toLowerCase().replace(/\s+/g, '-') : ''}`}
                                >
                                    <BlogGridCard blog={blog} dataAos="fade-in" dataAosDelay={index * 100} />
                                </Link>
                            ))
                        ) : (
                            <div>No posts found.</div>
                        )}
                    </div>

                    <div className="pagination">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Blogs;