import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css'; 
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);


const HomeCarousel = () => {
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .select({ view: "Grid view" })
            .all()
            .then(records => {
                const fetchedBlogs = records
                    .map(record => ({
                        id: record.id,
                        title: record.fields.title,
                        author: record.fields.author_name,
                        category: record.fields.category,
                        tags: record.fields.tags || [],
                        date: record.fields.date,
                        carousel: record.fields.carousel,
                        image: record.fields.images ? record.fields.images.map(img => img.url) : []
                    }))
                    .filter(blog => blog.carousel === "true");

                setFilteredBlogs(fetchedBlogs);
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
            });
    }, []);

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
            {filteredBlogs.map((blog) => (
                <SplideSlide key={blog.id}>
                    <div className="blog-carousel-slide">
                        <img src={blog.image[0]} alt={blog.title} />
                        <div className="slide-caption">
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