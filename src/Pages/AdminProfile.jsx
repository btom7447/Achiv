import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// Import blogger data directly
import bloggerData from '../Data/bloggerData.json'; // Adjust the path as necessary

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        bio: [],
        quote: "",
        image: ""
    });

    const [editableProfile, setEditableProfile] = useState({
        name: "",
        bio: "",
        quote: "",
        image: ""
    });

    // Load profile data from the imported bloggerData
    useEffect(() => {
        if (bloggerData.length > 0) {
            setProfile(bloggerData[0]);
            setEditableProfile({
                name: bloggerData[0].name,
                bio: bloggerData[0].bio.join('\n'), // Joining bio paragraphs for textarea
                quote: bloggerData[0].quote,
                image: bloggerData[0].image
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBioChange = (e) => {
        setEditableProfile((prev) => ({
            ...prev,
            bio: e.target.value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableProfile((prev) => ({
                    ...prev,
                    image: reader.result // Update with the image data URL
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Here you would typically send the updated profile to your backend or state management
        console.log("Updated Profile:", editableProfile);
        setProfile({
            ...editableProfile,
            bio: editableProfile.bio.split('\n') // Split bio paragraphs back into an array
        });
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin">Admin Dashboard</Link>
            </div>

            <h1>Profile</h1>
            <p>
                View and manage your profile details. Update your personal information and keep your blogger profile up to date with the latest content and preferences.
            </p>
            <br /><br />

            <form className="edit-profile">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={editableProfile.name}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Quote:
                    <input
                        type="text"
                        name="quote"
                        value={editableProfile.quote}
                        onChange={handleInputChange}
                    />
                </label>
                
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={editableProfile.bio}
                        onChange={handleBioChange}
                    />
                </label>

                <label>
                    Profile Image:
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>

                {/* Preview of the profile image */}
                <div className="image-preview">
                    <h3>Profile Image Preview:</h3>
                    {editableProfile.image && (
                        <img
                            src={editableProfile.image}
                            alt="Profile"
                            style={{ width: "150px", height: "auto", borderRadius: "8px" }}
                        />
                    )}
                </div>

                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default AdminProfile;