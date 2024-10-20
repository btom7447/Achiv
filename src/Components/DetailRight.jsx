import React from "react";
import NewsLetterCard from "./NewsLetterCard";
import FollowUsCard from "./FollowUsCard";
import ArchiveCard from "./ArchiveCard";

const DetailRight = () => {
    return (
        <div>
            <NewsLetterCard />
            <ArchiveCard />
            <FollowUsCard />
        </div>
    )
};

export default DetailRight;