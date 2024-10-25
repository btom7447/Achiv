import React from "react";

const AlbumCard = ({ data }) => {
    return (
        <div className="album-card">
            <div className="album-image">
                {data.albumImages.length > 0 && (
                    <img src={data.albumImages[0]} alt={`${data.albumName} cover`} />
                )}
            </div>
            <h3>{data.albumName}</h3>
            <h6>{data.date}</h6>        
        </div>
    );
};

export default AlbumCard;