import React from "react";
import galleryData from "../Data/galleryData.json";

const FooterGallery = () => {
    const imageCount = galleryData.image.length;
    
    return (
        <div className="footer-gallery">
            {galleryData.image.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`gallery-${index}`} className="gallery-img" style={{ width: `${100 / imageCount}%` }} />
            ))}
            <div className="gallery-caption">
                <h6>Our Gallery</h6>
            </div>
        </div>
    );
};

export default FooterGallery;