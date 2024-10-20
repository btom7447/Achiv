import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const Utilities = () => {
    const [isLightMode, setIsLightMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light"; 
    });

    const toggleTheme = () => {
        setIsLightMode(prevMode => !prevMode);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isLightMode);
        document.body.classList.toggle("light-mode", !isLightMode);
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

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
                checked={isLightMode} 
                onChange={toggleTheme} 
            />
        </div>
    );
};

export default Utilities;