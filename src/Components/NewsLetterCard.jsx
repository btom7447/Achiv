import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NewsLetterCard = () => {
    return (
        <div className="newsletter-card">
            <h4>Subscribe to Newsletter</h4>
            <p>Receive news via email</p>

            <label htmlFor="newsletter">
                <input 
                    type="email" 
                    name="newsletter" 
                    id="newsletter" 
                    placeholder="Subscribe ..."
                />
                <FontAwesomeIcon icon={faPaperPlane} className="news-icon" />
            </label>
        </div>
    )
};

export default NewsLetterCard;