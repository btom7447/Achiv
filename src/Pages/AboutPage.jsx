import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import DetailBlock from "../Components/DetailBlock";

const AboutPage = () => {
    return (
        <>
            <div className="pages">
                <BreadCrumb name="About Me" />
                <DetailBlock />
            </div>
        </>
    )
};

export default AboutPage;