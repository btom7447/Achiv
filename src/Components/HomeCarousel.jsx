import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'; 
import blogData from '../Data/blogData.json'; 

const HomeCarousel = () => {
    // Function to sort blog posts by date and get the most recent 5
    const getRecentBlogs = () => {
        // Convert date strings to Date objects for sorting
        const sortedBlogs = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedBlogs.slice(0, 5);
    };

    const recentBlogs = getRecentBlogs();

    return (
        <Splide 
            className="home-carousel"
            options={{ 
                perPage: 1, 
                pagination: false, 
                arrows: true, 
                autoplay: true, 
                type: "loop", 
                heightRatio: 0.5, 
                cover: true, 
                interval: 3000,
                speed: 1000, 
                easing: 'ease',
            }}>
            {recentBlogs.map((blog) => (
                <SplideSlide key={blog.id}>
                    <div className="blog-carousel-slide">
                        <img src={blog.image[0]} alt={blog.title} />
                        <div className="slide-caption" >
                            <div className="category">
                                <span></span>
                                <p>{blog.category}</p>
                                <span></span>
                            </div>
                            <h3>{blog.title}</h3>
                            <p>{blog.date} | {blog.author}</p>
                        </div>
                    </div>
                </SplideSlide>
            ))}
        </Splide>
    );
};

export default HomeCarousel;