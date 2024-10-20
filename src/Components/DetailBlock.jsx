import React from "react";
import DetailRight from "./DetailRight";
import DetailLeft from "./DetailLeft";

const DetailBlock = () => {
    return (
        <div className="blog-blocks">
            <DetailLeft />
            <DetailRight />
        </div>
    )
};

export default DetailBlock;