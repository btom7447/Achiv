import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const EditBlogCard = () => {
    const location = useLocation();
    const { blog } = location.state; // Retrieve blog data from state

    // Local state to manage the editable fields
    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [category, setCategory] = useState(blog.category);
    const [date, setDate] = useState(blog.date);
    const [content, setContent] = useState(blog.post.join('\n'));
    const [images, setImages] = useState(blog.image); // Manage the images

    const handleSave = () => {
        // Logic to save the edited blog
        console.log({
            title,
            author,
            category,
            date,
            content: content.split('\n'), // Convert content back to array
            images // Save updated images
        });
        // API call or data saving logic goes here
    };

    const handleImageDelete = (index) => {
        // Remove image by index
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleAddImage = (e) => {
        // Add new image to the images array
        const files = e.target.files;
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setImages([...newImages, ...images]); // Prepend new images
    };    

    return (
        <div className="edit-blog-card">

            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin/blogs">Blog Posts</Link>
            </div>

            <div className="image-section">
                <h4>Image Gallery</h4>
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div className="image-item" key={index}>
                            <button
                                className="delete-button"
                                onClick={() => handleImageDelete(index)}
                            >
                                &times;
                            </button>
                            <img src={img} alt={ `${index + 1}`} />
                        </div>
                    ))}
                </div>
                <label className="new-image">
                    Add New Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddImage}
                        multiple 
                    />
                </label>
            </div>

            <div className="editable-fields">
                <label>
                    Blog Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Author
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Category
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Date
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label className="text">
                    Blog Content
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck
                    />
                </label>

                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditBlogCard;