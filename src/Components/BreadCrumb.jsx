import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import PuffLoader from "react-spinners/PuffLoader";

const BreadCrumb = ({ name }) => {
    const [breadcrumbImage, setBreadcrumbImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        const fetchGalleryData = async () => {
            try {
                const records = await base("tblkCkOBhQgZa2TX9").select({ view: "Grid view" }).all();
                
                const imageRecord = records.find(record => record.fields.crumb_image && record.fields.crumb_image[0]);
                const imageUrl = imageRecord?.fields.crumb_image[0]?.url || "";
                
                setBreadcrumbImage(imageUrl);
            } catch (error) {
                console.error("Error fetching gallery data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, []);

    if (loading) return (
        <div className="loader-container"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <PuffLoader size={80} color="#cfac9f" />        
        </div>
    );

    return (
        <div className="bread-crumb">
            <img 
                src={breadcrumbImage}
                alt="Scenic background for breadcrumb" 
            />
            <div className="overlay"></div> 
            <div className="breadcrumb-content">
                <h2>{name}</h2>
            </div>
        </div>
    );
};

export default BreadCrumb;