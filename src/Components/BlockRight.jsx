import React from "react";
import { useEffect, useState } from "react";
import BloggerCard from "./BloggerCard";
import CategoryLinks from "./CategoryLinks";
import NewsLetterCard from "./NewsLetterCard";
import PopularPostCard from "./PopularPostCard";
import TagsCard from "./TagsCards";
import FollowUsCard from "./FollowUsCard";
import Airtable from "airtable";

const BlockRight = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

        // Fetch blog posts
        const fetchBlogPosts = async () => {
            try {
                const records = await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME).select({ view: "Grid view" }).all();
                const fetchedBlogs = records.map(record => ({
                    id: record.id,
                    title: record.fields.title,
                    author: record.fields.author_name,
                    category: record.fields.category,
                    tags: record.fields.tags || [],
                    date: record.fields.date,
                    content: record.fields.content,
                    image: record.fields.images ? record.fields.images.map(img => img.url) : [],
                }));
                setBlogs(fetchedBlogs); // Set the fetched blog data in state
            } catch (err) {
                console.error("Error fetching blog posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    return (
        <div className="block-right">
            <BloggerCard />
            <CategoryLinks />
            <PopularPostCard />
            <NewsLetterCard />
            <TagsCard blogs={blogs} />
            <FollowUsCard />
        </div>
    )
};

export default BlockRight;