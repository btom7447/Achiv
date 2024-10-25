import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const NewBlogPost = () => {
    // Local state to manage the editable fields
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    // Options for categories and tags (can be dynamic later)
    const categoryOptions = [
        { label: "Travel", value: "Travel" },
        { label: "Lifestyle", value: "Lifestyle" },
        { label: "Inspiration", value: "Inspiration" },
    ];

    const tagOptions = [
        { label: "Adventure", value: "Adventure" },
        { label: "Relaxation", value: "Relaxation" },
        { label: "Nature", value: "Nature" },
    ];

    const handleSave = () => {
        // API call or data saving logic will go here
    };

    const handleImageDelete = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleAddImage = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setImages([...newImages, ...images]);
    };

    return (
        <div className="edit-blog-card">
            <div className="admin-back">
                <FontAwesomeIcon icon={faChevronLeft} />
                <Link to="/admin/blogs">Blog Posts</Link>
            </div>

            <div className="image-section">
                <h4>Image Gallery</h4>
                <div className="image-gallery">
                    {images.map((img, index) => (
                        <div className="image-item" key={index}>
                            <button
                                className="delete-button"
                                onClick={() => handleImageDelete(index)}
                            >
                                &times;
                            </button>
                            <img src={img} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
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

            <div className="editable-fields">
                <label>
                    Blog Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Author
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        spellCheck
                    />
                </label>

                <label>
                    Blog Category
                    <Select
                        value={category}
                        onChange={(selected) => setCategory(selected)}
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
                        onChange={(selected) => setTags(selected)}
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
                    Blog Content
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck
                    />
                </label>

                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default NewBlogPost;
