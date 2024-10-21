import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>
                Manage your blog posts and quotes effortlessly. Edit existing content or create new entries to keep your audience engaged and informed.
            </p>
            <ul className="admin-links">
                <li>
                    <Link to="/admin/blogs">Blog Posts</Link>
                </li>
                <li>
                    <Link to="/admin/gallery">Gallery</Link>
                </li>
                <li>
                    <Link to="/admin/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/admin/quotes">Quotes</Link>
                </li>
                
            </ul>
        </div>
    )
};

export default AdminDashboard;   