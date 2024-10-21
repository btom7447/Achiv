import React from "react";

const BlogGridCard = ({ blog, dataAos, dataAosDelay }) => {
    return (
        <div className="blog-grid-card blog-card" data-aos={dataAos} data-aos-delay={dataAosDelay}>
            {blog.image && blog.image.length > 0 && (
                <img src={blog.image[0]} alt={blog.title} />
            )}
            <div className="category">
                <span></span>
                <p>{blog.category}</p>
                <span></span>
            </div>
            <h3>{blog.title}</h3>
            <h6>{blog.date} <span>|</span> {blog.author}</h6>
        </div>
    );
};

export default BlogGridCard;
