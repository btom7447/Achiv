import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import QuoteCard from "./QuoteCard";
import blogData from '../Data/blogData.json';
import quoteData from '../Data/quoteData.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const BlockLeft = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;
    const quotesPerPage = 2;

    // Initialize AOS animations on component mount
    useEffect(() => {
        AOS.init({
            duration: 800,  
            once: true       
        });
    }, []);

    const sortedBlogData = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalPages = Math.ceil(sortedBlogData.length / blogsPerPage);

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

    const renderContent = () => {
        const cards = [];
        let blogIndex = 0;
        let quoteIndex = 0;

        while (blogIndex < currentBlogs.length || quoteIndex < currentQuotes.length) {
            // Add two blog cards with slide-left animation
            for (let i = 0; i < 2 && blogIndex < currentBlogs.length; i++) {
                cards.push(
                    <BlogCard 
                        key={`blog-${currentBlogs[blogIndex].id}`} 
                        blog={currentBlogs[blogIndex]} 
                        dataAos="fade-left" 
                    />
                );
                blogIndex++;
            }

            // Add one quote card with slide-right animation
            if (quoteIndex < currentQuotes.length) {
                cards.push(
                    <QuoteCard 
                        key={`quote-${currentQuotes[quoteIndex].id}`} 
                        quote={currentQuotes[quoteIndex]} 
                        dataAos="fade-right"  
                    />
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