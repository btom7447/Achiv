import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import galleryData from '../Data/galleryData.json'; 

const AdminGallery = () => {
    // Set initial images state from the JSON file
    const [images, setImages] = useState(galleryData.image);

    // Delete image handler
    const handleImageDelete = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    // Add new image handler
    const handleAddImage = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setImages([...newImages, ...images]);
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin">Admin Dashboard</Link>
            </div>

            <h1>Gallery</h1>
            <p>
                Manage your gallery with ease. Edit or update existing images, or upload new ones to keep your gallery fresh and visually engaging.
            </p>   
            <br /> <br />

            {/* Image Gallery */}
            <div className="image-section">
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div className="image-item" key={index}>
                            <button
                                className="delete-button"
                                onClick={() => handleImageDelete(index)}
                            >
                                &times;
                            </button>
                            <img src={img} alt={`${index + 1}`} />
                        </div>
                    ))}
                </div>

            {/* Add new image */}
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
        </div>
    );
};

export default AdminGallery;