import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import bloggerData from "../Data/bloggerData.json";

const DetailLeft = () => {
    return (
        <div className="about-bio">
            {bloggerData.map((blogger, index) => (
                <div className="bio" key={index}>
                    <h1>Hi, I am {blogger.name}!</h1>
                    {blogger.bio && blogger.bio.length > 0 && (
                        <p>{blogger.bio[0]}</p>
                    )}
                    {blogger.quote && blogger.quote.length > 0 && (
                        <h5>{blogger.quote}</h5>
                    )}
                    {blogger.bio && blogger.bio.length > 0 && (
                        <p>{blogger.bio[1]}</p>
                    )}
                    {blogger.bio && blogger.bio.length > 0 && (
                        <p>{blogger.bio[2]}</p>
                    )}
                </div>
            ))}
            <div className="about-socials">
                <p>Follow me on Social Networks</p>
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
        </div>
    )
};

export default DetailLeft;