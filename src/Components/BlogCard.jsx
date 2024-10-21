import React from "react";
import { Link } from 'react-router-dom';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogCard = ({ blog, dataAos }) => {
    const slugifyTitle = (title) => title.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="blog-card" data-aos={dataAos}> {/* AOS animation attribute */}
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
                <p>{blog.post[0]}</p>
            )}
            <div className="blog-buttons">
                {/* Link to blog post using the slugified title */}
                <Link to={`/blog-post/${slugifyTitle(blog.title)}`}>
                    <button type="button">
                        Read More
                    </button>
                </Link>
                <div className="tooltip-container">
                    <span className="text">
                        <FontAwesomeIcon 
                            icon={faPaperPlane} 
                            className="bi bi-send-fill"
                        />
                    </span>
                    <span className="tooltip1">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </span>
                    <span className="tooltip2">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </span>
                    <span className="tooltip3">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </span>
                    <span className="tooltip4">
                        <FontAwesomeIcon icon={faInstagram} />
                    </span>

                    <span className="tooltip9"> </span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;