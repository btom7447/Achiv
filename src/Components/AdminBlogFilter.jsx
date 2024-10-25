import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import blogData from '../Data/blogData.json';
import { Link } from 'react-router-dom';

const AdminBlogFilter = ({ onFilterChange, initialTags, initialCategory, initialSearchQuery }) => {
    // Extract unique values for tags and categories
    const uniqueTags = [...new Set(blogData.flatMap(blog => blog.tags))];
    const uniqueCategories = [...new Set(blogData.map(blog => blog.category))];

    // Options for Select components
    const tagOptions = uniqueTags.map(tag => ({ value: tag, label: tag }));
    const categoryOptions = uniqueCategories.map(category => ({ value: category, label: category }));

    // States for selected values
    const [selectedTags, setSelectedTags] = useState(initialTags);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);  // State for author/title search input

    useEffect(() => {
        setSelectedTags(initialTags);
        setSelectedCategory(initialCategory);
        setSearchQuery(initialSearchQuery);
    }, [initialTags, initialCategory, initialSearchQuery]);

    // Handle changes in the filter and notify parent component
    const handleTagChange = selectedOptions => {
        setSelectedTags(selectedOptions);
        onFilterChange({ tags: selectedOptions, category: selectedCategory, searchQuery });
    };

    const handleCategoryChange = selectedOption => {
        setSelectedCategory(selectedOption);
        onFilterChange({ tags: selectedTags, category: selectedOption, searchQuery });
    };

    const handleSearchQueryChange = event => {
        const value = event.target.value;
        setSearchQuery(value);
        onFilterChange({ tags: selectedTags, category: selectedCategory, searchQuery: value });
    };

    return (
        <div className="blogs-filter">
            {/* Tags filter */}
            <Select
                isMulti
                options={tagOptions}
                value={selectedTags} // Set the value to selectedTags
                onChange={handleTagChange}
                placeholder="Filter by tags"
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
            
            {/* Category filter */}
            <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Filter by category"
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

            {/* Search by author or title */}
            <input
                className='blog-input'
                type="search"
                placeholder="Search by author or title"
                value={searchQuery}
                onChange={handleSearchQueryChange} // Call the handler on input change
            />

            <Link to="/admin/blog-post/new">
                <button type="button">Create Blog Post</button>
            </Link>
        </div>
    );
};

export default AdminBlogFilter;