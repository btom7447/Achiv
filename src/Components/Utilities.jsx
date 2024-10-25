import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const Utilities = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light"; 
    });

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isDarkMode);
        document.body.classList.toggle("light-mode", !isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    }, [isDarkMode]);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Provides the smooth scroll effect
        });
    };

    return (
        <div className="utilties">
            <button 
                type="button" 
                className="scroll-to-top" 
                onClick={scrollToTop} // Trigger scroll to top on click
            >
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <input 
                type="checkbox" 
                className="l" 
                checked={isDarkMode} 
                onChange={toggleTheme} 
            />
        </div>
    );
};

export default Utilities;