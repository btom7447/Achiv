import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const FollowUsCard = () => {
    return (
        <div className="follow-us">
            <h4>Follow Us</h4>
            <p>Follow us on our Social Network</p>
            <ul className="socials">
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
    )
};

export default FollowUsCard;