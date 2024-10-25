import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";

const DetailLeft = () => {
    const [blogger, setBlogger] = useState(null); // Changed to hold a single object
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        // Fetch all user records from Airtable
        const fetchBloggerData = async () => {
            try {
                const records = await base("tblkCkOBhQgZa2TX9").select({ view: "Grid view" }).all();
                
                // Assuming you only want the first record
                if (records.length > 0) {
                    const record = records[0]; // Get the first record
                    const bloggerData = {
                        name: record.fields.name || "Unknown Name", // Fallback for name
                        bio: record.fields.bio || "", // Fallback for bio
                        bio_cont: record.fields.bio_cont || "", // Fallback for bio_cont
                        quote: record.fields.quote || "", // Fallback for quote
                        socialLinks: {
                            facebook: record.fields.facebook || "",
                            linkedin: record.fields.linkedin || "",
                            twitter: record.fields.twitter || "",
                            instagram: record.fields.instagram || ""
                        }
                    };
                    setBlogger(bloggerData); // Set single blogger data
                }
            } catch (error) {
                console.error("Error fetching blogger data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBloggerData();
    }, []);

    if (loading) return <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <PuffLoader size={80} color="#cfac9f" />
                        </div>;

    // Check if blogger data is available
    if (!blogger) return <div>No blogger data found.</div>;

    return (
        <div className="about-bio">
            <div className="bio">
                <h1>Hi, I am {blogger.name}!</h1>
                <p>{blogger.bio}</p>
                {blogger.quote && <h5>{blogger.quote}</h5>}
                <p>{blogger.bio_cont}</p>
                <div className="about-socials">
                    <p>Follow me on Social Networks</p>
                    <ul className="socials">
                        {blogger.socialLinks.facebook && (
                            <li>
                                <a href={blogger.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                            </li>
                        )}
                        {blogger.socialLinks.linkedin && (
                            <li>
                                <a href={blogger.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </li>
                        )}
                        {blogger.socialLinks.twitter && (
                            <li>
                                <a href={blogger.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </a>
                            </li>
                        )}
                        {blogger.socialLinks.instagram && (
                            <li>
                                <a href={blogger.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DetailLeft;