import React from "react";

const BreadCrumb = ({ name }) => {
    return (
        <div className="bread-crumb">
            <img 
                src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/p2-img-1.jpg" 
                alt="Scenic background for breadcrumb" 
            />
            <div className="overlay"></div> 
            <div className="breadcrumb-content">
                <h2>{name}</h2>
            </div>
        </div>
    )
};

export default BreadCrumb;