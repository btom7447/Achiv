import React from "react";
import BloggerCard from "./BloggerCard";
import CategoryLinks from "./CategoryLinks";
import NewsLetterCard from "./NewsLetterCard";
import PopularPostCard from "./PopularPostCard";
import TagsCard from "./TagsCards";
import FollowUsCard from "./FollowUsCard";

const BlockRight = () => {
    return (
        <div className="block-right">
            <BloggerCard />
            <CategoryLinks />
            <PopularPostCard />
            <NewsLetterCard />
            <TagsCard />
            <FollowUsCard />
        </div>
    )
};

export default BlockRight;