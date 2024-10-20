import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchHeader = () => {
    return (
        <div className="search-header">
            <div className="search-container">
                <FontAwesomeIcon 
                    icon={faSearch} 
                    className="icon" 
                    onClick={() => document.querySelector('.input').focus()} 
                />
                <input 
                    placeholder="Search ... " 
                    className="input" 
                    name="text" 
                    type="search" 
                />
            </div>
            <img
                src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/logo-main-img-01.png"
                alt="Zoya Logo"
                className={`navbar-logo`}
            />
            <ul className="header-socials">
                <li>
                    <FontAwesomeIcon icon={faFacebookF} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </li>
                
                <li>
                    <FontAwesomeIcon icon={faXTwitter} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faInstagram} />
                </li>
            </ul>
        </div>
    );
};

export default SearchHeader;