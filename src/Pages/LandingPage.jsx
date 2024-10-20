import React from "react";
import BlogBlocks from "../Components/BlogBlocks";
import HomeCarousel from "../Components/HomeCarousel";

const LandingPage = () => {
    return (
        <>
            <div className="pages">
                <HomeCarousel />
                <BlogBlocks />
            </div>
        </>
    )
};

export default LandingPage;