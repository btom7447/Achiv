import React from "react";
import AdminBlogGrid from "../Components/AdminBlogGrid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const AdminBlog = () => {
    return (
        <div className="admin-dashboard">

            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin">Admin Dashboard</Link>
            </div>

            <h1>Blog Posts</h1>
            <p>
                Manage your blog posts with ease. Edit existing blog posts or create new ones to keep your content fresh and engaging.            
            </p>
            <AdminBlogGrid />

        </div>
    )
};

export default AdminBlog;