import React from "react";
import BlockLeft from "./BlockLeft";
import BlockRight from "./BlockRight";

const BlogBlocks = () => {
    return (
        <>
            <div className="blog-blocks">
                <BlockLeft />
                <BlockRight />
            </div>
        </>
    )
};

export default BlogBlocks;