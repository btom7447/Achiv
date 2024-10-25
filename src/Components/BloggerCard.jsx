import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import PuffLoader from "react-spinners/PuffLoader";

const BloggerCard = () => {
    const [bloggerData, setBloggerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        const fetchBloggerData = async () => {
            try {
                const records = await base("user").select({ view: "Grid view" }).all();
                const formattedData = records.map(record => ({
                    name: record.fields.name,
                    welcome_text: record.fields.welcome_text,
                    image: record.fields.profile_picture && record.fields.profile_picture.length > 0 
                           ? record.fields.profile_picture[0].url 
                           : "" 
                }));
                setBloggerData(formattedData);
            } catch (error) {
                console.error("Error fetching blogger data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBloggerData();
    }, []);

    if (loading) return (
        <div className="loader-container"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <PuffLoader size={80} color="#cfac9f" />        
        </div>
    );

    return (
        <div className="blogger-card">
            {bloggerData.map((blogger, index) => (
                <div key={index} className="blogger-profile">
                    {blogger.image && (
                        <img src={blogger.image} alt={blogger.name} className="profile-image" />
                    )}
                    <h6>{blogger.welcome_text}</h6>
                </div>
            ))}
        </div>
    );
};

export default BloggerCard;