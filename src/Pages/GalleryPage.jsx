import React, { useEffect, useState } from "react";
import AlbumCard from "../Components/AlbumCard";
import Airtable from "airtable";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PuffLoader from "react-spinners/PuffLoader";

AOS.init();

const GalleryPage = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        const fetchGalleryData = async () => {
            try {
                const records = await base("tblXnoi3mkPbpbIcS").select({ view: "Grid view" }).all();
                const formattedData = records.map(record => ({
                    id: record.id,
                    albumName: record.fields.album_name || "",
                    albumImages: record.fields.album_images ? record.fields.album_images.map(img => img.url) : [],
                }));
                setAlbums(formattedData);
            } catch (error) {
                console.error("Error fetching gallery data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);

    if (loading) return (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <PuffLoader size={80} color="#cfac9f" />
        </div>
    );

    return (
        <div className="gallery-grid">
            {albums.map(album => (
                <div key={album.id} data-aos="fade-up">
                    <AlbumCard data={album} />
                </div>
            ))}
        </div>
    );
};

export default GalleryPage;