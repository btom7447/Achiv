import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import blogData from "../Data/blogData.json"; // Importing JSON file

const EditBlogCard = () => {
    const location = useLocation();
    const { blog } = location.state;

    // Local state to manage the editable fields
    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [category, setCategory] = useState({ label: blog.category, value: blog.category });
    const [tags, setTags] = useState(blog.tags.map(tag => ({ label: tag, value: tag })));
    const [date, setDate] = useState(blog.date);
    const [content, setContent] = useState(blog.post.join('\n'));
    const [images, setImages] = useState(blog.image);

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    // Load categories and tags from JSON file
    useEffect(() => {
        // Extract unique categories
        const categories = [...new Set(blogData.map(blog => blog.category))].map(cat => ({
            label: cat,
            value: cat,
        }));

        // Extract unique tags
        const allTags = blogData.flatMap(blog => blog.tags);
        const uniqueTags = [...new Set(allTags)].map(tag => ({
            label: tag,
            value: tag,
        }));

        setCategoryOptions(categories);
        setTagOptions(uniqueTags);
    }, []);

    const handleSave = () => {
        // console.log({
        //     title,
        //     author,
        //     category: category.value,
        //     tags: tags.map(tag => tag.value),
        //     date,
        //     content: content.split('\n'),
        //     images,
        // });
        // API call or data saving logic goes here
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
                            <img src={img} alt={` ${index + 1}`} />
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

export default EditBlogCard;