import React from "react";
import bloggerData from "../Data/bloggerData.json";

const BloggerCard = () => {
    return (
        <div className="blogger-card">
            {bloggerData.map((blogger, index) => (
                <div key={index}>
                    <img src={blogger.image} alt={blogger.name} />
                    <h1>{blogger.name}</h1>
                    {blogger.bio && blogger.bio.length > 0 && (
                        <h6>{blogger.bio[0]}</h6>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BloggerCard;