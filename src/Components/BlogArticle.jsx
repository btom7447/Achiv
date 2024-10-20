import React from "react";

const BlogArticle = ({ blog }) => {
    return (
        <div className="block-left">
            <div className="blog-card">
                <div className="category">
                    <span></span>
                    <p>{blog.category}</p>
                    <span></span>
                </div>
                <h3>{blog.title}</h3>
                <h6>{blog.date} <span>|</span> {blog.author}</h6>
                {blog.image && blog.image.length > 0 && (
                    <img src={blog.image[0]} alt={blog.title} />
                )}
                {blog.post && blog.post.length > 0 && (
                    <p className="first-paragraph">{blog.post[0]}</p>
                )}
                <div className="continuation">
                    {blog.image && blog.image.length > 0 && (
                        <img src={blog.image[1]} alt={blog.title} />
                    )}
                    {blog.post && blog.post.length > 0 && (
                        <p>{blog.post[1]}</p>
                    )}
                    <h3>{blog.quote}</h3>
                    {blog.post && blog.post.length > 0 && (
                        <p>{blog.post[2]}</p>
                    )}
                </div>
                <div className="poster-cont">
                    {blog.image && blog.image.length > 0 && (
                        <img src={blog.image[2]} alt={blog.title} />
                    )}
                    {blog.post && blog.post.length > 0 && (
                        <p>{blog.post[3]}</p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default BlogArticle;