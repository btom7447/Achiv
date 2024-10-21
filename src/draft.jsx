import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import Creatable from 'react-select/creatable';

const EditBlogCard = () => {
    const location = useLocation();
    const { blog } = location.state; // Retrieve blog data from state

    // Local state to manage the editable fields
    const [title, setTitle] = useState(blog.title);
    const [author, setAuthor] = useState(blog.author);
    const [category, setCategory] = useState(blog.category);
    const [date, setDate] = useState(blog.date);
    const [content, setContent] = useState(blog.post.join('\n'));
    const [images, setImages] = useState(blog.image);
    
    // Local state for options
    const [options, setOptions] = useState({ categories: [], tags: [] });
    const [selectedTags, setSelectedTags] = useState(blog.tags.map(tag => ({ value: tag, label: tag }))); // State for selected tags

    useEffect(() => {
        // Fetch your JSON data here
        const fetchData = async () => {
            // Replace with your actual data fetching logic
            const response = await fetch('../Data/blogData.json');
            const data = await response.json();
            const categories = data.map(item => ({ value: item.category, label: item.category }));
            const tags = data.flatMap(item => item.tags.map(tag => ({ value: tag, label: tag })));
            setOptions({ categories: [...new Set(categories)], tags: [...new Set(tags)] });
        };

        fetchData();
    }, []);

    const handleSave = () => {
        console.log({
            title,
            author,
            category,
            date,
            content: content.split('\n'),
            images,
            tags: selectedTags.map(tag => tag.value) 
        });
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
                            <button className="delete-button" onClick={() => handleImageDelete(index)}>&times;</button>
                            <img src={img} alt={`Blog image ${index + 1}`} />
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
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} spellCheck />
                </label>

                <label>
                    Author
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} spellCheck />
                </label>

                <label>
                    Category
                    <Creatable 
                        isClearable
                        options={options.categories}
                        value={options.categories.find(option => option.value === category) || null}
                        onChange={selectedOption => setCategory(selectedOption ? selectedOption.value : '')}
                    />
                </label>

                <label>
                    Tags
                    <Creatable
                        isMulti
                        isClearable
                        options={options.tags}
                        value={selectedTags} // Use selectedTags state
                        onChange={setSelectedTags} // Update selectedTags directly
                    />
                </label>

                <label>
                    Date
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <label className="text">
                    Blog Content
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} spellCheck />
                </label>

                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditBlogCard;