import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TopHeader = () => {
    return (
        <div className="top-header">
            <p>Lifestyle and Fashion Blog for Everyone!</p>
            <p>
                <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
                zoya@gmail.com
            </p>
        </div>
    )
};

export default TopHeader;