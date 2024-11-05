import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Airtable from 'airtable';
import PuffLoader from 'react-spinners/PuffLoader';
import Select from 'react-select';

const AdminBlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true); // Initial loading state for fetching
    const [saving, setSaving] = useState(false); // Separate saving state
    const [isModified, setIsModified] = useState(false); // Track form modifications

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [quote, setQuote] = useState("");
    const [fParagraph, setFParagraph] = useState("");
    const [sParagraph, setSParagraph] = useState("");
    const [tParagraph, setTParagraph] = useState("");
    const [images, setImages] = useState([]);

    const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    // Helper function to set modifications and values
    const handleInputChange = (setter) => (value) => {
        setter(value);
        setIsModified(true);
    };

    useEffect(() => {
        const fetchAdminBlogPost = async () => {
            try {
                const record = await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME).find(id);
                setBlog(record);
                setTitle(record.fields.title);
                setCategory({ value: record.fields.category, label: record.fields.category });
                setTags(record.fields.tags.map(tag => ({ value: tag, label: tag })));
                setFParagraph(record.fields.first_paragraph);
                setSParagraph(record.fields.second_paragraph);
                setTParagraph(record.fields.third_paragraph);
                setQuote(record.fields.quote);
                setImages(record.fields.images ? record.fields.images.map(img => img.url) : []);

                const records = await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME).select().all();
                const categories = [...new Set(records.map(rec => rec.fields.category))].map(category => ({ value: category, label: category }));
                const tags = [...new Set(records.flatMap(rec => rec.fields.tags))].map(tag => ({ value: tag, label: tag }));

                setCategoryOptions(categories);
                setTagOptions(tags);
            } catch (err) {
                console.error("Error fetching blog post:", err);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBlogPost();
        console.log("ID:", id);
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Structuring the update request to include id and fields
            await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME).update([
                {
                    id: id, // Record ID being updated
                    fields: {
                        title,
                        category: category.value,
                        tags: tags.map(tag => tag.value),
                        first_paragraph: fParagraph,
                        second_paragraph: sParagraph,
                        third_paragraph: tParagraph,
                        quote,
                        images
                    }
                }
            ]);
            console.log("IDs:", id);
            setIsModified(false);
            navigate("/admin/blogs");
        } catch (err) {
            console.error("Error saving blog post:", err);
        } finally {
            setSaving(false);
        }
    };    

    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, { url: reader.result }]);
                setIsModified(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = (index) => {
        const newImages = images.filter((_, imgIndex) => imgIndex !== index);
        setImages(newImages);
        setIsModified(true);
    };

    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PuffLoader size={80} color="#cfac9f" />
            </div>
        );
    }

    if (!blog) {
        return <div className="loader-container">Blog post not found.</div>;
    }

    return (
        <div className="edit-blog-card">
            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin/blogs">Blog Posts</Link>
            </div>

            <div className="image-section">
                <h4>Image Gallery</h4>
                <p>Images will be displayed in this order </p>
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div className="image-item" key={index}>
                            <button className="delete-button" onClick={() => handleImageDelete(index)}>
                                &times;
                            </button>
                            <img src={img} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <label className="new-image">
                    Add New Image:
                    <input type="file" accept="image/*" onChange={handleAddImage} multiple />
                </label>
            </div>

            <div className="editable-fields">
                <label>
                    Blog Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleInputChange(setTitle)(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Blog Category
                    <Select
                        value={category}
                        onChange={(selected) => handleInputChange(setCategory)(selected)}
                        options={categoryOptions}
                        className="blog-select"
                        classNames={{
                            control: () => 'react-select__control',
                            option: () => 'react-select__option',
                            menu: () => 'react-select__menu',
                            menuList: () => 'react-select__menu-list',
                            multiValue: () => 'react-select__multi-value',
                            multiValueLabel: () => 'react-select__multi-value__label',
                            multiValueRemove: () => 'react-select__multi-value__remove',
                            placeholder: () => 'react-select__placeholder',
                            dropdownIndicator: () => 'react-select__dropdown-indicator',
                        }}
                    />
                </label>

                <label>
                    Blog Tags
                    <Select
                        isMulti
                        value={tags}
                        onChange={(selected) => handleInputChange(setTags)(selected)}
                        options={tagOptions}
                        className="blog-select"
                        classNames={{
                            control: () => 'react-select__control',
                            option: () => 'react-select__option',
                            menu: () => 'react-select__menu',
                            menuList: () => 'react-select__menu-list',
                            multiValue: () => 'react-select__multi-value',
                            multiValueLabel: () => 'react-select__multi-value__label',
                            multiValueRemove: () => 'react-select__multi-value__remove',
                            placeholder: () => 'react-select__placeholder',
                            dropdownIndicator: () => 'react-select__dropdown-indicator',
                        }}
                    />
                </label>

                <label className="text">
                    Blog Quote
                    <textarea
                        value={quote}
                        onChange={(e) => handleInputChange(setQuote)(e.target.value)}
                        spellCheck
                    />
                </label>

                <label className="text">
                    First Paragraph
                    <textarea
                        value={fParagraph}
                        onChange={(e) => handleInputChange(setFParagraph)(e.target.value)}
                        spellCheck
                    />
                </label>

                <label className="text">
                    Second paragraph
                    <textarea
                        value={sParagraph}
                        onChange={(e) => handleInputChange(setSParagraph)(e.target.value)}
                        spellCheck
                    />
                </label>

                <label className="text">
                    Third paragraph
                    <textarea
                        value={tParagraph}
                        onChange={(e) => handleInputChange(setTParagraph)(e.target.value)}
                        spellCheck
                    />
                </label>

                <button type="submit" onClick={handleSave} disabled={!isModified || saving || loading}>
                    {saving ? 'Updating ...' : 'Update Post'}
                </button>
            </div>
        </div>
    );
};

export default AdminBlogPost;