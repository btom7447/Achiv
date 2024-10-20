import React, { useState } from "react";
import BlogCard from "./BlogCard";
import QuoteCard from "./QuoteCard"; // Assuming you have a separate QuoteCard component
import blogData from '../Data/blogData.json'; 
import quoteData from '../Data/quoteData.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BlockLeft = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4; // 4 BlogCards per page
    const quotesPerPage = 2; // 2 QuoteCards per page

    // Sort blog data by date (most recent first)
    const sortedBlogData = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total pages based on BlogCards and QuoteCards
    const totalPages = Math.ceil(sortedBlogData.length / blogsPerPage);

    // Get the blog posts for the current page
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        const currentBlogs = sortedBlogData.slice(startIndex, endIndex);
        
        const startQuoteIndex = (currentPage - 1) * quotesPerPage;
        const endQuoteIndex = startQuoteIndex + quotesPerPage;
        const currentQuotes = quoteData.slice(startQuoteIndex, endQuoteIndex);

        return { currentBlogs, currentQuotes };
    };

    const { currentBlogs, currentQuotes } = getCurrentPageData();

    // Rendering logic: two blog cards then a quote card
    const renderContent = () => {
        const cards = [];
        let blogIndex = 0;
        let quoteIndex = 0;

        while (blogIndex < currentBlogs.length || quoteIndex < currentQuotes.length) {
            // Add two blog cards if available
            for (let i = 0; i < 2 && blogIndex < currentBlogs.length; i++) {
                cards.push(
                    <BlogCard key={`blog-${currentBlogs[blogIndex].id}`} blog={currentBlogs[blogIndex]} />
                );
                blogIndex++;
            }

            // Add one quote card if available, otherwise continue with blog cards
            if (quoteIndex < currentQuotes.length) {
                cards.push(
                    <QuoteCard key={`quote-${currentQuotes[quoteIndex].id}`} quote={currentQuotes[quoteIndex]} />
                );
                quoteIndex++;
            }
        }

        return cards;
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

    return (
        <div className="block-left">
            {renderContent()}

            {/* Pagination controls */}
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