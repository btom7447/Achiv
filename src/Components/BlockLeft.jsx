import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Airtable from 'airtable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import PuffLoader from "react-spinners/PuffLoader"; // Import PuffLoader

const BlockLeft = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const blogsPerPage = 4;

    // Initialize AOS animations on component mount
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Fetch blog data from Airtable
    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
        setLoading(true); // Set loading to true before fetching
        base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedBlogs = records.map(record => ({
                    id: record.id,
                    title: record.fields.title,
                    date: record.fields.date,
                    first_paragraph: record.fields.first_paragraph,
                    second_paragraph: record.fields.second_paragraph,
                    third_paragraph: record.fields.third_paragraph,
                    author: record.fields.author_name,
                    category: record.fields.category,
                    tags: record.fields.tags || [],
                    content: record.fields.content,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : [],
                }));
                setBlogs(fetchedBlogs);
                setLoading(false); // Set loading to false after fetching
            })
            .catch(err => {
                console.error("Error fetching blog data:", err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    // Sort blogs by date
    const sortedBlogData = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalPages = Math.ceil(sortedBlogData.length / blogsPerPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * blogsPerPage;
        return sortedBlogData.slice(startIndex, startIndex + blogsPerPage);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Display loader if loading, otherwise display BlogCards
    return (
        <div className="block-left">
            {loading ? (
                <div className="loader-container"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <PuffLoader color="#cfac9f" size={80} />
                </div>
            ) : (
                getCurrentPageData().map((blog, index) => (
                    <BlogCard 
                        key={blog.id} 
                        blog={blog} 
                        dataAos="fade-left" 
                    />
                ))
            )}
            {!loading && sortedBlogData.length === 0 && <p>No posts found.</p>}

            <div className="pagination">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default BlockLeft;